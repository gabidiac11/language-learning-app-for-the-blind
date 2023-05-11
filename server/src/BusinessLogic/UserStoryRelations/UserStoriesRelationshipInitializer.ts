import { StorySubItemLink } from "../../Data/ctx.relations.types";
import { UserStory } from "../../Data/ctx.userStory.types";
import { Database } from "../../Data/database";
import { log } from "../../logger";

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
    for (const [key, value] of Object.entries(blockProgressRel)) {
      await this._db.set<StorySubItemLink>(
        value,
        `userStoriesTableRelations/${this._userId}/blockProgress/${key}`
      );
    }

    log(`Started adding epilogue-userStory relationships.`);
    const epilogueProgressRel = this.createEpilogueEpilogueRelations();
    for (const [key, value] of Object.entries(epilogueProgressRel)) {
      await this._db.set<StorySubItemLink>(
        value,
        `userStoriesTableRelations/${this._userId}/epilogueProgress/${key}`
      );
    }

    log(`Finished adding all user story relationships.`);
  }

  private createBlockProgressRelations(): { [id: string]: StorySubItemLink } {
    const blockProgressItemsRel: { [id: string]: StorySubItemLink } = {};

    this._userStories.forEach((userStory) => {
      userStory.buildingBlocksProgressItems.forEach((bp) => {
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
      epilogueProgressRel[userStory.epilogueProgress.epilogueId] = {
        userStoryId: userStory.id,
      };
    });

    return epilogueProgressRel;
  }
}
