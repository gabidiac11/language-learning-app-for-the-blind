import Result from "../../ApiSupport/Result";
import {
  UserStory,
} from "../../Data/ctxTypes/ctx.userStory.types";
import { Database } from "../../Data/database";
import { UserStoriesRelationshipInitializer } from "./UserStoriesRelationshipInitializer";

export class UserStoriesRelationsManager {
  private _db: Database;

  public static inject = [Database.name];
  constructor(db: Database) {
    this._db = db;
  }

  /**
   * This make sure to have a easy time querying the path from children to parent by having a pair (blockId, parentStoryId) or (epilogueId, parentStoryId):
   * block(id) -> needs a link between block progress id and user story id
   * epilogues(id) -> needs a link too
   * @param userId
   * @param userStories
   */
  public async addUserStoriesRelationsAsync(
    userId: string,
    userStories: UserStory[]
  ) {
    const usRelationInitializer = new UserStoriesRelationshipInitializer(
      userStories,
      userId,
      this._db
    );
    await usRelationInitializer.addRelationshipsAsync();
  }

  public async getUserStoryIdFromBlockProgress(
    userId: string,
    blockProgressId: string
  ): Promise<Result<string>> {
    const result = await this._db.get<string>(
      `userStoriesTableRelations/${userId}/blockProgress/${blockProgressId}/userStoryId`
    );
    if(result.isError()) throw result.errors;
    
    return result;
  }

  public async getUserStoryIdFromEpilogueProgress(
    userId: string,
    epilogueProgressId: string
  ): Promise<Result<string>> {
    const result = await this._db.get<string>(
      `userStoriesTableRelations/${userId}/epilogueProgress/${epilogueProgressId}/userStoryId`
    );
    return result;
  }
}

