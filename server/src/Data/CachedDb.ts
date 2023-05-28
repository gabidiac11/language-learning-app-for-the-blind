import { Story } from "./ctxTypes/ctx.story.types";
import objectPath from "object-path";
import {
  BlockQuizQuestionLink,
  StorySubItemLink,
} from "./ctxTypes/ctx.relations.types";
import { log } from "../logger";

export type CachedDbData = {
  lessonStories?: { [lessonStoryId: string]: Story };
  userStoriesTableRelations?: {
    [userId: string]: {
      blockProgress?: {
        [blockProgressId: string]: BlockQuizQuestionLink;
      };
      epilogueProgress?: {
        [epilogueProgressId: string]: StorySubItemLink;
      };
    };
  };
};
class CachedDb {
  private cachedData: CachedDbData;

  constructor() {
    this.cachedData = {};
  }

  public reset() {
    Object.keys(this.cachedData).forEach((key) => {
      delete this.cachedData[key];
    });
    log(`Cache was reset.`);
  }

  public setAllowedData(item: any, path: string) {
    if (!item) return;

    const cleanPath = this.getCleanedPath(path);
    if (!this.canBeCached(cleanPath)) {
      return;
    }
    objectPath.set(this.cachedData, cleanPath, item);
    log(`Cached data at path ${cleanPath}.`);
  }

  public getData<T>(path) {
    const cleanPath = this.getCleanedPath(path);
    const data = objectPath.get(this.cachedData, cleanPath) as T;
    if (data) {
      log(`Got cached data at path ${cleanPath}.`);
    }
    return data;
  }

  private canBeCached(path: string) {
    console.log({ path });
    if (path.indexOf("/lessonStories") > -1) {
      return true;
    }
    if (path.indexOf("/userStoriesTableRelations") > -1) {
      return true;
    }
    if (path.indexOf("/languages") > -1) {
      return true;
    }
    return false;
  }

  private getCleanedPath(path: string) {
    const pathTrimmed = path.trim();

    if (pathTrimmed.length === 0) return pathTrimmed;
    if (pathTrimmed === "/") return pathTrimmed;

    if (pathTrimmed[pathTrimmed.length - 1] === "/") {
      return pathTrimmed.slice(0, pathTrimmed.length - 1);
    }
    return pathTrimmed;
  }
}

const cache: CachedDb = new CachedDb();
export default cache;
