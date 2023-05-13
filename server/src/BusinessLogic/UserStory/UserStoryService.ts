import Result from "../../ApiSupport/Result";
import { Story } from "../../Data/ctxTypes/ctx.story.types";
import { UserStory } from "../../Data/ctxTypes/ctx.userStory.types";
import { Database } from "../../Data/database";
import { UserStoriesCreator } from "./UserStoriesCreator";
import { UserStoriesRelationsManager } from "../UserStoryRelations/UserStoriesRelationsManager";
import { getStringifiedError } from "../../ApiSupport/apiErrorHelpers";
import { log } from "../../logger";

export default class UserStoryService {
  private _db: Database;
  private _userStoryRelationsManager: UserStoriesRelationsManager;
  public static inject = [Database.name, UserStoriesRelationsManager.name];
  constructor(
    db: Database,
    userStoryRelationsManager: UserStoriesRelationsManager
  ) {
    this._db = db;
    this._userStoryRelationsManager = userStoryRelationsManager;
  }

  public async hasUserStoriesAssign(userId: string): Promise<Result<boolean>> {
    const existsResult = await this._db.exists(`userStories/${userId}`);
    return existsResult;
  }

  /**
   * returns user stories with queried information from the lesson stories associated
   * @param userId
   * @returns
   */
  public async queryUserStories(userId: string): Promise<Result<UserStory[]>> {
    const storiesResult = await this._db.getArray<UserStory>(
      `userStories/${userId}`
    );
    if (storiesResult.isError()) {
      return storiesResult;
    }

    const lessonStoriesResult = await this._db.getArray<Story>(
      "lessonStories/"
    );
    if (lessonStoriesResult.isError()) {
      return lessonStoriesResult.As<UserStory[]>();
    }

    this.fillInLessonStoryDataToUserStories(
      storiesResult.data,
      lessonStoriesResult.data
    );

    return storiesResult;
  }

  /**
   * returns a single user story with queried information from the lesson stories associated
   * @param userId
   * @returns
   */
  public async queryUserStory(
    userId: string,
    userStoryId: string
  ): Promise<Result<UserStory>> {
    const userStoryResult = await this._db.get<UserStory>(
      `userStories/${userId}/${userStoryId}`
    );
    if (userStoryResult.isError()) {
      return userStoryResult;
    }
    if (!userStoryResult.data) {
      return Result.Error<UserStory>("Not found.", 404);
    }

    const lessonResult = await this._db.get<Story>(
      `lessonStories/${userStoryResult.data.storyId}`
    );
    if (lessonResult.isError()) {
      return lessonResult.As<UserStory>();
    }

    this.fillInLessonStoryDataToUserStories(
      [userStoryResult.data],
      [lessonResult.data]
    );

    return userStoryResult;
  }

  /**
   * a user story is a decorator for a lesson story, with information about the particular user progress.
   * to avoid duplicating data from lesson story into the user story in the storage, only the id (foreign key) is stored
   * and the story information should be queries to the frontend client and fill in to the user story model
   * @param userStories
   * @param lessonStories
   */
  private fillInLessonStoryDataToUserStories(
    userStories: UserStory[],
    lessonStories: Story[]
  ) {
    for (const userStory of userStories) {
      const lessonStory = lessonStories.find((s) => s.id === userStory.storyId);
      Object.values(userStory.buildingBlocksProgressItems).forEach(
        (bProgress) => {
          bProgress.block = lessonStory.buildingBlocks.find(
            (block) => block.id === bProgress.blockId
          );
          Object.values(bProgress.wordProgressItems).forEach((wordProgress) => {
            wordProgress.word = bProgress.block.words.find(
              (word) => word.id == wordProgress.wordId
            );
          });
        }
      );
      userStory.epilogueProgress.epilogue = lessonStory.epilogue;
      Object.values(userStory.epilogueProgress.questionProgressItems).forEach(
        (epilogueProgress) => {
          epilogueProgress.question = lessonStory.epilogue.questions.find(
            (q) => q.id === epilogueProgress.questionId
          );
        }
      );
    }
  }

  /**
   * creates a user stories from lesson stories
   * @param userId
   * @returns
   */
  public async initializeUserStories(userId: string): Promise<Result<boolean>> {
    const lessonStoriesResult = await this._db.getArray<Story>(
      "lessonStories/"
    );
    if (lessonStoriesResult.isError()) {
      log(
        `[INIT-UserStrories]: error while querying lessons:` +
          getStringifiedError(lessonStoriesResult.errors)
      );
      return lessonStoriesResult.As<boolean>();
    }
    if (!lessonStoriesResult.data) {
      log(
        `[INIT-UserStrories]: No lessons found at "lessonStories/". Seeding needs to be done.`
      );
      throw "No lessons found. Seeding needs to be done.";
    }

    log(
      `[INIT-UserStrories]: starting generating user stories from lesson stories...`
    );
    const convertor = new UserStoriesCreator();
    const userStoriesResult = convertor.createUserStories(
      lessonStoriesResult.data
    );
    if (userStoriesResult.isError()) {
      log(
        `[INIT-UserStrories]: errors found when generating user stories from lesson stories...` +
          getStringifiedError(userStoriesResult.errors)
      );
      return userStoriesResult.As<boolean>();
    }

    await this._userStoryRelationsManager.addUserStoriesRelationsAsync(
      userId,
      userStoriesResult.data
    );

    await this._db.setArray<UserStory>(
      userStoriesResult.data,
      `userStories/${userId}`
    );

    return Result.Success<boolean>(true);
  }
}
