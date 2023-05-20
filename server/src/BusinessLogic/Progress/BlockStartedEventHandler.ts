import {
  BuildingBlockProgress,
} from "../../Data/ctxTypes/ctx.userStory.types";
import { Database } from "../../Data/database";
import { log } from "../../logger";

export class BlockStartedEventHandler {
  private _db: Database;

  public constructor(db: Database) {
    this._db = db;
  }

  public async handle(userId: string, blockProgress: BuildingBlockProgress) {
    const wasSet = await this.markBlockAsStartedIfNeeded(userId, blockProgress);
    if(wasSet) {
        await this.markStoryAsStartedIfNeeded(userId, blockProgress);
    }
  }
  private async markBlockAsStartedIfNeeded(
    userId: string,
    blockProgress: BuildingBlockProgress
  ):Promise<boolean> {
    const blockStartedDatePath = `userStories/${userId}/${blockProgress.userStoryId}/buildingBlocksProgressItems/${blockProgress.id}/timeStarted`;
    const blockProgressStartedDate = await this._db.get<number | undefined>(
      blockStartedDatePath
    );
    if (blockProgressStartedDate.isError()) {
      log(
        `Couldn't get information about date started at ${blockStartedDatePath}`
      );
      return false;
    }

    if (!!blockProgressStartedDate.data) {
      log(
        `Block is already marked as started at date ${new Date(
          blockProgressStartedDate.data
        )}`
      );
      return false;
    }
    
    await this._db.set<number>(Date.now(), blockStartedDatePath);
    log(`Block ${blockProgress.id} marked as started.`);

    return true;
  }

  private async markStoryAsStartedIfNeeded(
    userId: string,
    blockProgress: BuildingBlockProgress
  ):Promise<boolean> {
    const usStartedDatePath = `userStories/${userId}/${blockProgress.userStoryId}/timeStarted`;
    const usStartedDate = await this._db.get<number | undefined>(
      usStartedDatePath
    );
    if (usStartedDate.isError()) {
      log(
        `Couldn't get information about date started at ${usStartedDatePath}`
      );
      return false;
    }

    if (!!usStartedDate.data) {
      log(
        `Story is already marked as started at date ${new Date(
          usStartedDate.data ?? Date.now()
        )}`
      );
      return false;
    }
    
    await this._db.set<number>(Date.now(), usStartedDatePath);
    log(`User story ${blockProgress.userStoryId} marked as started.`);

    return true;
  }
}
