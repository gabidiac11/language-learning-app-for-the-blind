import Result from "../../ApiSupport/Result";
import { Story } from "../../Data/ctx.story.types";
import { UserStory } from "../../Data/ctx.userStory.types";
import { Database } from "../../Data/database";
import { UserStoriesCreator } from "./UserStoriesCreator";

export default class UserStoryService {
  private _db: Database;
  public static inject = [Database.name];
  constructor(db: Database) {
    this._db = db;
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
      userStory.buildingBlocksProgressItems.forEach((bp) => {
        bp.block = lessonStory.buildingBlocks.find(
          (block) => block.id === bp.blockId
        );
        bp.wordProgressItems.forEach((wordProgress) => {
          wordProgress.word = bp.block.words.find((item) => item.id);
        });
      });
      userStory.epilogueProgress.epilogue = lessonStory.epilogue;
      userStory.epilogueProgress.questionProgressItems.forEach((item) => {
        item.question = lessonStory.epilogue.questions.find(
          (q) => q.id === item.questionId
        );
      });
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
      return lessonStoriesResult.As<boolean>();
    }
    if (!lessonStoriesResult.data) {
      throw "No lessons found. Seeding needs to be done.";
    }

    const convertor = new UserStoriesCreator();
    const userStoriesResult = await convertor.createUserStories(
      lessonStoriesResult.data
    );
    if (userStoriesResult.isError()) {
      return userStoriesResult.As<boolean>();
    }

    await this._db.setArray<UserStory>(
      userStoriesResult.data,
      `userStories/${userId}`
    );

    return Result.Success<boolean>(true);
  }
}
