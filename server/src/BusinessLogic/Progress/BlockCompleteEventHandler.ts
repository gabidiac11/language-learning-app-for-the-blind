import {
  ApiError,
  getStringifiedError,
} from "../../ApiSupport/apiErrorHelpers";
import {
  BuildingBlockProgress,
  UserStory,
} from "../../Data/ctxTypes/ctx.userStory.types";
import { Database } from "../../Data/database";
import { log } from "../../logger";
import BlocksService from "../BlocksService";
import UserStoryService from "../UserStory/UserStoryService";

export class BlockCompleteEventHandler {
  private _db: Database;
  private _blocksService: BlocksService;
  private _userStoryService: UserStoryService;
  public constructor(
    db: Database,
    blocksService: BlocksService,
    userStoryService: UserStoryService
  ) {
    this._db = db;
    this._blocksService = blocksService;
    this._userStoryService = userStoryService;
  }

  public async setBlockComplete(userId: string, blockProgressId: string) {
    const blockProgress = await this.getBlockProgress(userId, blockProgressId);
    await this.markBlockAsComplete(userId, blockProgress);
    await this.unlockDependentBlocks(userId, blockProgress);
    await this.unlockEpilogueIfPermitted(userId, blockProgress.userStoryId);
    await this.updateStoryStats(userId, blockProgress.userStoryId);
  }

  private async markBlockAsComplete(
    userId: string,
    blockProgress: BuildingBlockProgress
  ) {
    // will emit the event completion even if the block was already completed
    if (!blockProgress.timeCompleted) {
      return;
    }
    const path = `userStories/${userId}/${blockProgress.userStoryId}/buildingBlocksProgressItems/${blockProgress.id}/timeCompleted`;
    
    log(`[BlockCompleteEventHandler] Starting updating block completion at '${path}'`);

    await this._db.set(Date.now(), path);

    log(
      `[BlockCompleteEventHandler] Block marked as complete for blockProgress(id: ${blockProgress.id}, name: ${blockProgress.block.name})`
    );
  }

  private async unlockDependentBlocks(
    userId: string,
    completedBlockProgress: BuildingBlockProgress
  ) {
    log(
      `[BlockCompleteEventHandler] Starting block completion propagation blockProgress(id: ${completedBlockProgress.id}, name: ${completedBlockProgress.block.name})`
    );

    const userStory = await this.getUserStory(
      userId,
      completedBlockProgress.userStoryId
    );

    // check if any dependent (locked!!!) blocks -> unblock them
    for (const idBlockLesson of completedBlockProgress.block.dependentOnIds ?? []) {
      const dependentBp = Object.values(
        userStory.buildingBlocksProgressItems
      ).find((i) => i.block.id === idBlockLesson);

      if (dependentBp && !dependentBp.timeUnlocked) {
        const path = `userStories/${userId}/${userStory.id}/buildingBlocksProgressItems/${dependentBp.id}/timeUnlocked`;

        log(`[BlockCompleteEventHandler] Starting updating block UNLOCK at '${path}'`);

        await this._db.set(Date.now(), path);

        log(
          `[BlockCompleteEventHandler] UNBLOCKED: block unlocked blockProgress(id:${dependentBp.id}, name: ${dependentBp.block.name})`
        );
      }
    }
  }

  private async unlockEpilogueIfPermitted(userId: string, userStoryId: string) {
    // check if all blocks are done -> unblock epilogue
    const userStory = await this.getUserStory(userId, userStoryId);

    const allComplete = Object.values(
      userStory.buildingBlocksProgressItems
    ).every((bp) => !!bp.timeCompleted);

    if (allComplete) {
      const path = `userStories/${userId}/${userStoryId}/epilogueProgress/timeUnlocked`;

      log(`[BlockCompleteEventHandler] Starting updating story-epilogue UNLOCK at '${path}'`);

      await this._db.set(Date.now(), path);

      log(
        `[BlockCompleteEventHandler] All blocks completed at useStory(id: ${userStory.id}, name: ${userStory.name})`
      );
      log(
        `[BlockCompleteEventHandler] Epilogue unlocked at useStory(id: ${userStory.id}, name: ${userStory.name})`
      );
    }
  }

  private async updateStoryStats(userId: string, userStoryId: string) {
    const userStory = await this.getUserStory(userId, userStoryId);

    userStory.numOfBlocksCompleted = Object.values(
      userStory.buildingBlocksProgressItems
    ).filter((bp) => !!bp.timeCompleted).length;

    const path = `userStories/${userId}/${userStory.id}/numOfBlocksCompleted`;
    log(`[BlockCompleteEventHandler] Starting updating story stats at '${path}'`);

    await this._db.set(userStory.numOfBlocksCompleted, path);

    log(
      `[BlockCompleteEventHandler] Stats updated at useStory(id: ${userStory.id}, name: ${userStory.name})`
    );
  }

  private async getBlockProgress(
    userId: string,
    blockProgressId: string
  ): Promise<BuildingBlockProgress> {
    const blockProgressResult = await this._blocksService.getUserBlockProgress(
      userId,
      blockProgressId
    );
    if (blockProgressResult.isError() || !blockProgressResult.data) {
      log(
        `[BlockCompleteEventHandler] Error: could not find block progress.` +
          getStringifiedError(blockProgressResult)
      );
      throw ApiError.Error("Something went wrong", 500);
    }

    return blockProgressResult.data;
  }

  private async getUserStory(
    userId: string,
    userStoryId: string
  ): Promise<UserStory> {
    const userStoryResult = await this._userStoryService.queryUserStory(
      userId,
      userStoryId
    );
    if (userStoryResult.isError() || !userStoryResult.data) {
      log(
        `[BlockCompleteEventHandler] Progress update block completed: could not find story.` +
          getStringifiedError(userStoryResult)
      );
      throw ApiError.Error("Something went wrong", 500);
    }
    return userStoryResult.data;
  }
}
