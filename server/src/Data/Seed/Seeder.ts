import { readFileSync } from "fs";
import path from "path";
import { environment, seedFileCloudBasePath } from "../../constants";
import { log } from "../../logger";
import {
  Language,
  LanguageData,
  LessonJsonData,
  LessonStoryData,
  Story,
} from "../ctxTypes/ctx.story.types";
import { Database } from "../database";
import guardStories from "./storiesValidationGuard";
import { getStringifiedError } from "../../ApiSupport/apiErrorHelpers";
import { arrayToObj } from "../../utils";
import axios from "axios";

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

    const { lessonData, languages } = await this.readJsonCloudStorage();
    for (const data of Object.values(lessonData)) {
      guardStories(data);
    }

    log("[Seeder]: starting adding items to firebase.");
    await this.addLessonsAndLanguages(lessonData, languages);
    log("[Seeder]: added items to firebase.");
  }

  private async addLessonsAndLanguages(
    lessonData: LessonStoryData,
    languages: LanguageData
  ) {
    const object: {
      [lang in Language]: {
        lessonStories: {
          [id: string]: Story;
        };
      };
    } & {
      languages: LanguageData;
    } = {
      ru: {
        lessonStories: arrayToObj(lessonData.ru),
      },
      fr: {
        lessonStories: arrayToObj(lessonData.fr),
      },
      de: {
        lessonStories: arrayToObj(lessonData.de),
      },
      languages: languages,
    };

    await this._db.set(object, "");
    this._db.resetCache();
  }

  private async isSeedNeeded(): Promise<boolean> {
    const existsResult = await this._db.exists("");
    if (existsResult.isError()) {
      log(
        `[Seeder] Error accessing seeding data.` +
          getStringifiedError(existsResult)
      );
    }
    return !existsResult.data;
  }

  // not applicable for the time being
  private async readSeedData(): Promise<LessonJsonData> {
    const jsonPath = path.join(__dirname, `lesson-stories.${environment}.json`);
    log(`[Seeder]: starting reading lessons from '${jsonPath}'`);

    const storiesString = await readFileSync(jsonPath, "utf-8");
    const lessonJsonData: LessonJsonData = JSON.parse(storiesString);

    log(`[Seeder]: read lessons`);
    return lessonJsonData;
  }

  private async readJsonCloudStorage(): Promise<LessonJsonData> {
    const jsonUrl = `${seedFileCloudBasePath}/lesson-stories.${environment}.json`;

    log(`[Seeder]: starting reading lessons from '${jsonUrl}'`);

    const response = await axios.get(jsonUrl);
    if (!response.data) {
      throw `No data found at ${jsonUrl}`;
    }
    const lessonJsonData: LessonJsonData = response.data;

    log(`[Seeder]: read lessons`);
    return lessonJsonData;
  }
}
