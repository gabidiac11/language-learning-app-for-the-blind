import { readFileSync } from "fs";
import path from "path";
import { environment } from "../../constants";
import { log } from "../../logger";
import { Story } from "../ctxTypes/ctx.story.types";
import { Database } from "../database";
import guardStories from "./storiesValidationGuard";
import { getStringifiedError } from "../../ApiSupport/apiErrorHelpers";

export default class Seeder {
  static get inject() {
    return [Database.name];
  }
  private _db: Database;
  constructor(db: Database) {
    this._db = db;
  }

  public async seedIfNeeded() {
    log("[Seeder]: quering the lesson to see if seed needed.");
    const needed = await this.isSeedNeeded();
    if (!needed) {
      log("[Seeder]: seed not needed.");
      return;
    }

    const stories = await this.readSeedData();
    guardStories(stories);

    log("[Seeder]: starting adding items to firebase.");
    await this.addStories(stories);
    log("[Seeder]: added items to firebase.");
  }

  private async addStories(stories: Story[]) {
    await this._db.setArray<Story>(stories, "lessonStories/");
    this._db.resetCache();
  }

  private async isSeedNeeded(): Promise<boolean> {
    const existsResult = await this._db.exists("lessonStories/");
    if (existsResult.isError()) {
      log(
        `[Seeder] Error accessing seeding data.` +
          getStringifiedError(existsResult)
      );
    }
    return !existsResult.data;
  }

  private async readSeedData(): Promise<Story[]> {
    const jsonPath = path.join(__dirname, `lesson-stories.${environment}.json`);
    log(`[Seeder]: starting reading lessons from '${jsonPath}'`);

    const storiesString = await readFileSync(jsonPath, "utf-8");
    const stories: Story[] = JSON.parse(storiesString);

    log(`[Seeder]: read lessons`);
    return stories;
  }
}
