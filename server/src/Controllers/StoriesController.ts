import { Story } from "../Data/ctx.story.types";
import { UserStory } from "../Data/ctx.userStory.types";
import { Database } from "../Data/database";
import { LessonStoryToUserStoryConvertor } from "../Data/Seed/diverseDataInitialiser";
import { log } from "../logger";
import BaseController from "./BaseController";
import Result from "./Result";

export default class StoriesController extends BaseController {
  private _db: Database;
  public static inject = [Database.name];
  constructor(db: Database) {
    super();
    this._db = db;
  }
  // TODO: add id generation with guid
  public async getStories(userId: string): Promise<Result<UserStory[]>> {
    if (this._db.exists(`userStories/${userId}`)) {
      const storiesResult = await this.queryUserStories(userId);
      return storiesResult;
    }
    log(`User ${userId} doesn't have user stories. Will create...`);

    const initResult = await this.initializeUserStories(userId);
    if (initResult.isError()) {
      return initResult.As<UserStory[]>();
    }

    const result = await this._db.get<UserStory[]>(`userStories/${userId}`);
    // TODO: decorate these stories with the content references like epilogue, block, epilogue question
    if (result.isError()) {
      return result;
    }
    return Result.Success(result.data, 200);
  }
  async initializeUserStories(userId: string): Promise<Result<boolean>> {
    const lessonStoriesResult = await this._db.get<Story[]>("lessonStories/");
    if (lessonStoriesResult.isError()) {
      return lessonStoriesResult.As<boolean>();
    }

    const convertor = new LessonStoryToUserStoryConvertor();
    const userStoriesResult = await convertor.createUserStories(
      lessonStoriesResult.data
    );
    if (userStoriesResult.isError()) {
      return userStoriesResult.As<boolean>();
    }

    await this._db.set<UserStory[]>(
      userStoriesResult.data,
      `userStories/${userId}`
    );

    return Result.Success<boolean>(true);
  }

  async queryUserStories(userId: string): Promise<Result<UserStory[]>> {
    const storiesResult = await this._db.get<UserStory[]>(
      `userStories/${userId}`
    );
    if (storiesResult.isError()) {
      return storiesResult;
    }

    const lessonStoriesResult = await this._db.get<Story[]>("lessonStory");
    if (lessonStoriesResult.isError()) {
      return lessonStoriesResult.As<UserStory[]>();
    }

    // fill in associated data
    const lessons = lessonStoriesResult.data;
    for (let userStory of storiesResult.data) {
      const lessonStory = lessons.find((s) => s.id === userStory.storyId);
      userStory.buildingBlocksProgressItems.forEach((bp) => {
        bp.block = lessonStory.buildingBlocks.find(
          (block) => block.id === bp.blockId
        );
      });
      userStory.epilogueProgress.epilogue = lessonStory.epilogue;
      userStory.epilogueProgress.questionProgressItems.forEach((item) => {
        item.question = lessonStory.epilogue.questions.find(
          (q) => q.id === item.questionId
        );
      });
    }

    return storiesResult;
  }
}
