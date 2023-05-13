import { ApiError, getStringifiedError } from "../ApiSupport/apiErrorHelpers";
import Result from "../ApiSupport/Result";
import { BuildingBlock, Story } from "../Data/ctxTypes/ctx.story.types";
import {
  BuildingBlockProgress,
  UserStory,
} from "../Data/ctxTypes/ctx.userStory.types";
import { Database } from "../Data/database";
import { log } from "../logger";
import { valuesOrdered } from "../utils";
import { UserStoriesRelationsManager } from "./UserStoryRelations/UserStoriesRelationsManager";

export default class BlocksService {
  private _db: Database;
  private _userStoryRelationsManager: UserStoriesRelationsManager;

  public static inject = [Database.name, UserStoriesRelationsManager.name];

  constructor(db: Database, userStoryRelationsManager) {
    this._db = db;
    this._userStoryRelationsManager = userStoryRelationsManager;
  }

  private async getUserBlockProgressItems(
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
      Object.values(userStoryResult.data.buildingBlocksProgressItems),
      lessonResult.data.buildingBlocks
    );

    return Result.Success(
      valuesOrdered(userStoryResult.data.buildingBlocksProgressItems)
    );
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

  public async getUserStoryIdFromBlock(
    userId: string,
    blockProgressId: string
  ): Promise<string> {
    // retrieve user story id from dedicated table for relations
    const userStoryIdResult =
      await this._userStoryRelationsManager.getUserStoryIdFromBlockProgress(
        userId,
        blockProgressId
      );
    if (userStoryIdResult.isError()) {
      throw ApiError.ErrorResult(userStoryIdResult);
    }

    if (!userStoryIdResult.data) {
      const result = Result.Error("Not found.", 404);
      throw ApiError.ErrorResult(result);
    }
    const userStoryId = userStoryIdResult.data;
    return userStoryId;
  }

  /**
   * shallow -> associated fields from the base lesson (like block, epilogue etc.) is not filled in
   * @param userId
   * @param blockProgressId
   * @returns
   */
  public async getShallowBlockProgress(
    userId: string,
    blockProgressId: string
  ): Promise<Result<BuildingBlockProgress>> {
    const userStoryId = await this.getUserStoryIdFromBlock(
      userId,
      blockProgressId
    );
    const blockResult = await this._db.get<BuildingBlockProgress>(
      `userStories/${userId}/${userStoryId}/buildingBlocksProgressItems/${blockProgressId}`
    );
    if (blockResult.isError()) {
      return blockResult;
    }
    if (!blockResult.data) {
      return Result.Error("Not found.", 404);
    }
    return blockResult;
  }

  public async completeSummaryBlockProgress(
    userId: string,
    blockProgressId: string
  ): Promise<Result<boolean>> {
    const blockResult = await this.getUserBlockProgress(
      userId,
      blockProgressId
    );
    if (blockResult.isError()) return blockResult.As<boolean>();

    if (!blockResult.data.timeUnlocked) {
      return Result.Error(
        "This block summary was not completed because this block is locked.",
        403
      );
    }

    // retrieve user story id from dedicated table for relations
    const userStoryIdResult =
      await this._userStoryRelationsManager.getUserStoryIdFromBlockProgress(
        userId,
        blockProgressId
      );
    if (userStoryIdResult.isError()) return userStoryIdResult.As<boolean>();
    if (!userStoryIdResult.data) {
      return Result.Error("Not found.", 404);
    }

    await this._db.set(
      Date.now(),
      `userStories/${userId}/${userStoryIdResult.data}/buildingBlocksProgressItems/${blockProgressId}/timeSummaryCompleted`
    );
    return Result.Success(true);
  }

  async getDependentBuildingBlocksData(
    userId: string,
    blockProgressId: string
  ): Promise<Result<DepenedentBlocksData>> {
    const userStoryId = await this.getUserStoryIdFromBlock(
      userId,
      blockProgressId
    );
    log(
      `[DependentBuildingBlocksData]: User story ID found ${userStoryId}) from blockProgress ID:${blockProgressId}`
    );

    // get lesson stories to fill up data
    const lessonStoryIdPath = `userStories/${userId}/${userStoryId}/storyId`;
    const lessonStoryIdResult = await this._db.get_NotNull<string>(
      lessonStoryIdPath
    );
    if (lessonStoryIdResult.isError()) {
      log(
        `[DependentBuildingBlocksData]: Error while querying lessonStory-ID from userStory-ID at path '${lessonStoryIdPath}` +
          getStringifiedError(lessonStoryIdResult.errors)
      );
      return lessonStoryIdResult.As<DepenedentBlocksData>();
    }
    log(`[DependentBuildingBlocksData]: Lesson story ID found.`);

    // get lesson story
    const lessonPath = `lessonStories/${lessonStoryIdResult.data}`;
    const lessonResult = await this._db.get_NotNull<Story>(lessonPath);
    if (lessonResult.isError()) {
      log(
        `[DependentBuildingBlocksData]: Error while querying lessonStory at path '${lessonPath}'.`
      );
      return lessonResult.As<DepenedentBlocksData>();
    }
    log(`[DependentBuildingBlocksData]: lessonStory found.`);

    // retrive all block progress items
    const blocksPath = `userStories/${userId}/${userStoryId}/buildingBlocksProgressItems`;
    const buildingBlocksProgressItemsResult = await this._db.get_NotNull<{
      [blockProgressId: string]: BuildingBlockProgress;
    }>(blocksPath);

    if (buildingBlocksProgressItemsResult.isError()) {
      log(
        `[DependentBuildingBlocksData]: Error while querying buildingBlockItems at path '${blocksPath}'.` +
          getStringifiedError(buildingBlocksProgressItemsResult.errors)
      );
      return buildingBlocksProgressItemsResult.As<DepenedentBlocksData>();
    }
    log(`[DependentBuildingBlocksData]: buildingBlockItems found.`);

    const blockProgressArrayItems = Object.values(
      buildingBlocksProgressItemsResult.data
    );
    this.fillInLessonStoryDataToBlockProgress(
      blockProgressArrayItems,
      lessonResult.data.buildingBlocks
    );
    log(
      `[DependentBuildingBlocksData] Fillied in lesson data to the block progress items.`
    );

    const targetBlockProgress = blockProgressArrayItems.find(
      (item) => item.id === blockProgressId
    );
    if (!targetBlockProgress)
      throw "Building block is null somehow, although this should not happen at this point.";

    let dependentBlockProgressItems: BuildingBlockProgress[] = [];
    const targetBlockDepIds = targetBlockProgress.block?.dependentOnIds;
    if (targetBlockDepIds?.length) {
      dependentBlockProgressItems = blockProgressArrayItems.filter((item) =>
        targetBlockDepIds.some((depId) => depId === item.block?.id)
      );
    }

    const data: DepenedentBlocksData = {
      childBlocks: dependentBlockProgressItems,
      parentBlock: targetBlockProgress,
      userStoryId: userStoryId,
    };
    return Result.Success(data);
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
      Object.values(bp.wordProgressItems).forEach((wordProgress) => {
        wordProgress.word = bp.block.words.find(
          (item) => item.id === wordProgress.wordId
        );
      });
    });
  }
}

type DepenedentBlocksData = {
  childBlocks: BuildingBlockProgress[];
  parentBlock: BuildingBlockProgress;
  userStoryId: string;
};
