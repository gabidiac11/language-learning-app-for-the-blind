import { StorySubItemLink } from "../../Data/ctxTypes/ctx.relations.types";
import { UserStory } from "../../Data/ctxTypes/ctx.userStory.types";
import { Database } from "../../Data/database";
import { log } from "../../logger";
import { valuesOrdered } from "../../utils";

export class UserStoriesRelationshipInitializer {
  private _userStories: UserStory[];
  private _userId: string;
  private _db: Database;

  constructor(userStories: UserStory[], userId: string, db: Database) {
    this._userStories = userStories;
    this._userId = userId;
    this._db = db;
  }

  public async addRelationshipsAsync() {
    log(`Started adding block-userStory relationships.`);

    const blockProgressRel = this.createBlockProgressRelations();
    await this._db.set<{[blockProgressId: string]: StorySubItemLink}>(
      blockProgressRel,
      `userStoriesTableRelations/${this._userId}/blockProgress`
    );

    log(`Started adding epilogue-userStory relationships.`);
    const epilogueProgressRel = this.createEpilogueEpilogueRelations();
    await this._db.set<{[blockProgressId: string]: StorySubItemLink}>(
      epilogueProgressRel,
      `userStoriesTableRelations/${this._userId}/epilogueProgress`
    );

    log(`Finished adding all user story relationships.`);
  }

  private createBlockProgressRelations(): { [id: string]: StorySubItemLink } {
    const blockProgressItemsRel: { [id: string]: StorySubItemLink } = {};

    this._userStories.forEach((userStory) => {
      valuesOrdered(userStory.buildingBlocksProgressItems).forEach((bp) => {
        blockProgressItemsRel[bp.id] = {
          userStoryId: userStory.id,
        };
      });
    });
    return blockProgressItemsRel;
  }

  private createEpilogueEpilogueRelations(): {
    [id: string]: StorySubItemLink;
  } {
    const epilogueProgressRel: { [id: string]: StorySubItemLink } = {};

    this._userStories.forEach((userStory) => {
      epilogueProgressRel[userStory.epilogueProgress.id] = {
        userStoryId: userStory.id,
      };
    });

    return epilogueProgressRel;
  }
}
