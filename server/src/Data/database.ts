import { getDatabase, ref } from "@firebase/database";
import { firebaseApp } from "./firebase-app";
import { get, set } from "@firebase/database";
import Result from "../ApiSupport/Result";
import { log } from "../logger";
import { ApiError, getStringifiedError } from "../ApiSupport/apiErrorHelpers";
import { valuesOrdered } from "../utils";
import { dbRootPathKey } from "../constants";
import { Story } from "./ctxTypes/ctx.story.types";
import objectPath from "object-path";
import {
  BlockQuizQuestionLink,
  StorySubItemLink,
} from "./ctxTypes/ctx.relations.types";

class Database {
  private cache: CachedDb = new CachedDb();

  private db;
  constructor() {
    this.db = getDatabase(firebaseApp);
  }

  /**
   * secure
   * @param requestedPath
   * @returns
   */
  private decoratedPath(requestedPath: string) {
    return `${dbRootPathKey}/${requestedPath}`;
  }

  public async exists(path: string): Promise<Result<boolean>> {
    try {
      const snapshot = await get(ref(this.db, this.decoratedPath(path)));
      if (!snapshot.exists()) {
        return Result.Success(false);
      }
      return Result.Success(true);
    } catch (error) {
      log(`[db]: error occured`, error);
      return Result.Error("Something went wrong.", 500);
    }
  }

  public async getArray<T>(path: string): Promise<Result<T[]>> {
    const resultObj = await this.get<{ [id: string]: T }>(path);
    if (resultObj.isError()) return resultObj.As<T[]>();

    const values = valuesOrdered(resultObj.data);
    return Result.Success(values);
  }

  public async setArray<T>(items: T[], path: string) {
    const badItems = items.filter(
      (item) => !(item as unknown as { id: string | number }).id
    );
    if (badItems.length) {
      throw (
        "setArray items should have 'id' property set:" +
        getStringifiedError(badItems)
      );
    }

    const obj = items.reduce(
      (valueObj, currentItem) => ({
        ...valueObj,
        [(currentItem as unknown as { id: string | number }).id]: currentItem,
      }),
      {}
    );
    await this.set<{ [id: string | number]: T }>(obj, path);
  }

  public async get<T>(path: string): Promise<Result<T>> {
    const time = Date.now();
    log(`\nDB_GET: '${path}': [STARTED]`);
    try {

      const cached = this.cache.getData<T>(this.decoratedPath(path));
      if (cached) return Result.Success(cached);

      const snapshot = await get(ref(this.db, this.decoratedPath(path)));
      if (!snapshot.exists()) {
        return Result.Success(null);
      }
      const value = snapshot.val() as T;

      this.cache.setAllowedData(value, this.decoratedPath(path));

      return Result.Success(value);
    } catch (error) {
      log(`[db]: error occured at path '${path}'`, getStringifiedError(error));
      return Result.Error("Something went wrong.", 500);
    } finally {
      log(`DB_GET: '${path}': [FINISHED] at ${(Date.now() - time) / 1000}s\n`);
    }
  }

  public async get_NotNull<T>(path: string): Promise<Result<T>> {
    const result = await this.get<T>(path);
    if (!result.isError() && !result.data) {
      log(`Record espected not null is actually not there at path ${path}.`);
      return Result.Error<T>("Resource not found.", 404);
    }
    return result;
  }

  public async set<T>(item: T, path: string) {
    removeUndefined(item);

    const time = Date.now();
    log(`\nDB_SET: '${path}': [STARTED]`);
    try {
      await set(ref(this.db, this.decoratedPath(path)), item);
    } catch (error) {
      log(`[db]: error occured at path '${path}'`, getStringifiedError(error));
      throw ApiError.Error("Something went wrong.", 500);
    } finally {
      log(`DB_SET: '${path}': [FINISHED] at ${(Date.now() - time) / 1000}s\n`);
    }
  }
}

type CachedDbData = {
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

  public setAllowedData(item: any, path: string) {
    if(!item) return;

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
    console.log({path})
    if (path.indexOf("/lessonStories") > -1) {
      return true;
    }
    if (path.indexOf("/userStoriesTableRelations") > -1) {
      return true;
    }
    return false;
  }

  private getCleanedPath(path: string) {
    const pathTrimmed = path.trim();

    if (pathTrimmed.length === 0) return pathTrimmed;
    if(pathTrimmed === "/") return pathTrimmed;

    if (pathTrimmed[pathTrimmed.length - 1] === "/") {
      return pathTrimmed.slice(0, pathTrimmed.length - 1);
    }
    return pathTrimmed;
  }
}

/**
 * recursively remove undefined value from JSON because google firestore accept only null's over undefined's
 * there is a good case for using null as it's more evident what all json structures should look like, but for now we'll use this solution
 * @param value
 */
function removeUndefined(value: unknown) {
  if (!!value && typeof value === "object") {
    for (const prop in value) {
      if (value[prop] === undefined) {
        delete value[prop];
      } else {
        removeUndefined(value[prop]);
      }
    }
  }
}

export { Database };
