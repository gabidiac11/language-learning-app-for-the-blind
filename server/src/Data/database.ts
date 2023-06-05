import {
  getDatabase,
  orderByChild,
  equalTo,
  query,
  ref,
} from "@firebase/database";
import { firebaseApp } from "./firebase-app";
import { get, set } from "@firebase/database";
import Result from "../ApiSupport/Result";
import { log } from "../logger";
import {
  ApiErrorResponse,
  getStringifiedError,
} from "../ApiSupport/apiErrorHelpers";
import { valuesOrdered } from "../utils";
import { dbRootPathKey } from "../constants";
import cache from "./CachedDb";
import { LanguageProvider } from "../BusinessLogic/LanguageProvider";
import { apiMessages } from "../ApiSupport/apiMessages";

class Database {
  public static inject = [LanguageProvider.name];

  private db;
  private _languageProvider: LanguageProvider;
  constructor(languageProvider: LanguageProvider) {
    this.db = getDatabase(firebaseApp);
    this._languageProvider = languageProvider;
  }

  /**
   * secure
   * @param requestedPath
   * @returns
   */
  private decoratedPath(requestedPath: string) {
    if (this._languageProvider.language) {
      return `${dbRootPathKey}/${this._languageProvider.language}/${requestedPath}`.replace(
        "//",
        "/"
      );
    }
    return `${dbRootPathKey}/${requestedPath}`.replace("//", "/");
  }

  public async exists(path: string): Promise<Result<boolean>> {
    try {
      log(`[db-exists]: at path ${this.decoratedPath(path)}`);

      const snapshot = await get(ref(this.db, this.decoratedPath(path)));
      if (!snapshot.exists()) {
        return Result.Success(false);
      }
      return Result.Success(true);
    } catch (error) {
      log(`[db-exists]: error occured`, error);
      return Result.Error(apiMessages.somethingWentWrong, 500);
    }
  }

  public async getArray<T>(path: string): Promise<Result<T[]>> {
    const resultObj = await this.get<{ [id: string]: T }>(path);
    if (resultObj.isError()) return resultObj.As<T[]>();
    if (!resultObj.data) return Result.Success<T[]>([]);

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

  public async get<T>(path: string, ignoreCache = false): Promise<Result<T>> {
    const time = Date.now();
    log(`\nDB_GET: '${this.decoratedPath(path)}': [STARTED]`);
    try {
      if (!ignoreCache) {
        const cached = cache.getData<T>(this.decoratedPath(path));
        if (cached) return Result.Success(cached);
      }

      const snapshot = await get(ref(this.db, this.decoratedPath(path)));
      if (!snapshot.exists()) {
        return Result.Success(null);
      }
      const value = snapshot.val() as T;

      cache.setAllowedData(value, this.decoratedPath(path));

      return Result.Success(value);
    } catch (error) {
      log(
        `[db]: error occured at path '${this.decoratedPath(path)}'`,
        getStringifiedError(error)
      );
      return Result.Error(apiMessages.somethingWentWrong, 500);
    } finally {
      log(
        `DB_GET: '${this.decoratedPath(path)}': [FINISHED] at ${
          (Date.now() - time) / 1000
        }s\n`
      );
    }
  }

  public async get_NotNull<T>(path: string): Promise<Result<T>> {
    const result = await this.get<T>(path);
    if (!result.isError() && !result.data) {
      log(
        `Record espected not null is actually not there at path ${this.decoratedPath(
          path
        )}.`
      );
      return Result.Error<T>(apiMessages.notFound, 404);
    }
    return result;
  }

  public async getOrderedBy<T>(
    path: string,
    byProperty: string,
    byValue: string
  ): Promise<Result<T>> {
    const time = Date.now();
    log(
      `\nDB_GET: '${this.decoratedPath(
        path
      )}', byProperty '${byProperty}', byValue '${byValue}': [STARTED]`
    );

    try {
      const r = ref(this.db, this.decoratedPath(path));
      const queryValue = query(r, orderByChild(byProperty), equalTo(byValue));
      const snapshot = await get(queryValue);
      const value = snapshot.val() as T;
      return Result.Success(value);
    } catch (error) {
      log(
        `[db]: error occured at path '${this.decoratedPath(
          path
        )}', byProperty '${byProperty}', byValue '${byValue}'`,
        getStringifiedError(error)
      );
      return Result.Error(apiMessages.somethingWentWrong, 500);
    } finally {
      log(
        `DB_GET: '${this.decoratedPath(
          path
        )}', byProperty '${byProperty}', byValue '${byValue}': [FINISHED] at ${
          (Date.now() - time) / 1000
        }s\n`
      );
    }
  }

  public async set<T>(item: T, path: string) {
    removeUndefined(item);

    const time = Date.now();
    log(`\nDB_SET: '${this.decoratedPath(path)}': [STARTED]`);
    try {
      await set(ref(this.db, this.decoratedPath(path)), item);
    } catch (error) {
      log(
        `[db]: error occured at path '${this.decoratedPath(path)}'`,
        getStringifiedError(error)
      );
      throw ApiErrorResponse.InternalError();
    } finally {
      log(
        `DB_SET: '${this.decoratedPath(path)}': [FINISHED] at ${
          (Date.now() - time) / 1000
        }s\n`
      );
    }
  }

  public resetCache() {
    cache.reset();
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
