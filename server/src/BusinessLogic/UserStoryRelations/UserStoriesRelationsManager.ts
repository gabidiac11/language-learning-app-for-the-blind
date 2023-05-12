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
   * Makes sure to:
   * block/:id -> needs a link between block progress id and user story id
   * epilogue/:id -> needs a link too
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

