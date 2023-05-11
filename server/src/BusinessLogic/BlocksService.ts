import { ApiError } from "../ApiSupport/apiErrorHelpers";
import Result from "../ApiSupport/Result";
import { BuildingBlock, Story } from "../Data/ctx.story.types";
import { BuildingBlockProgress, UserStory } from "../Data/ctx.userStory.types";
import { Database } from "../Data/database";
import { log } from "../logger";
import { UserStoriesRelationsManager } from "./UserStoryRelations/UserStoriesRelationsManager";

export default class BlocksService {
  private _db: Database;
  private _userStoryRelationsManager: UserStoriesRelationsManager;

  public static inject = [Database.name, UserStoriesRelationsManager.name];

  constructor(db: Database, userStoryRelationsManager) {
    this._db = db;
    this._userStoryRelationsManager = userStoryRelationsManager;
  }

  public async getUserBlockProgressItems(
    userId: string,
    blockProgressId: string
  ): Promise<Result<BuildingBlockProgress[]>> {
    // retrieve user story id from dedicated table for relations
    const userStoryIdResult =
      await this._userStoryRelationsManager.getUserStoryIdFromBlockProgress(
        userId,
        blockProgressId
      );
    if (userStoryIdResult.isError())
      return userStoryIdResult.As<BuildingBlockProgress[]>();
    if (!userStoryIdResult.data) {
      return Result.Error("Not found.", 404);
    }

    // retrieve user story
    const userStoryId = userStoryIdResult.data;
    const userStoryResult = await this._db.get<UserStory>(
      `userStories/${userId}/${userStoryId}`
    );
    if (userStoryResult.isError()) {
      return userStoryResult.As<BuildingBlockProgress[]>();
    }
    if (!userStoryResult.data) {
      return Result.Error<BuildingBlockProgress[]>("Not found.", 404);
    }

    // fill in lesson block, lesson epilogue to the user story
    const lessonResult = await this._db.get<Story>(
      `lessonStories/${userStoryResult.data.storyId}`
    );
    if (lessonResult.isError()) {
      return lessonResult.As<BuildingBlockProgress[]>();
    }
    this.fillInLessonStoryDataToBlockProgress(
      userStoryResult.data.buildingBlocksProgressItems,
      lessonResult.data.buildingBlocks
    );

    return Result.Success(userStoryResult.data.buildingBlocksProgressItems);
  }

  public async getUserBlockProgress(
    userId: string,
    blockProgressId: string
  ): Promise<Result<BuildingBlockProgress>> {
    const blocksResult = await this.getUserBlockProgressItems(
      userId,
      blockProgressId
    );
    if (blocksResult.isError()) {
      return blocksResult.As<BuildingBlockProgress>();
    }

    const targetedBlockProgress = blocksResult.data.find(
      (bp) => bp.id === blockProgressId
    );
    if (!targetedBlockProgress) {
      log(
        `block/${blockProgressId} retrived the user story with block progress items:[${blocksResult.data
          .map((i) => i.id)
          .join(
            ","
          )}], but the block was not really found. Something went bad while seeding or data was compromised.`
      );
      throw ApiError.Error("Something went wrong.", 500);
    }

    return Result.Success(targetedBlockProgress);
  }

  /**
   * a user story is a decorator for a lesson story, with information about the particular user progress.
   * to avoid duplicating data from lesson story into the user story in the storage, only the id (foreign key) is stored
   * and the story information should be queries to the frontend client and fill in to the user story model
   * @param userStoriesBlockProgressItems
   * @param lessonStoriesBlocks
   */
  private fillInLessonStoryDataToBlockProgress(
    userStoriesBlockProgressItems: BuildingBlockProgress[],
    lessonStoriesBlocks: BuildingBlock[]
  ) {
    userStoriesBlockProgressItems.forEach((bp) => {
      bp.block = lessonStoriesBlocks.find((block) => block.id === bp.blockId);
      bp.wordProgressItems.forEach((wordProgress) => {
        wordProgress.word = bp.block.words.find((item) => item.id);
      });
    });
  }
}
