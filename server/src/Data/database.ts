import { getDatabase, ref } from "@firebase/database";
import { firebaseApp } from "./firebase-app";
import { get, set } from "@firebase/database";
import Result from "../Controllers/Result";
import { log } from "../logger";

class Database {
  private db;
  constructor() {
    this.db = getDatabase(firebaseApp);
  }
  public ref(path: string) {
    return ref(this.db, path);
  }
  public async get<T>(path: string): Promise<Result<T>> {
    try {
      const snapshot = await get(ref(this.db, path));
      if (!snapshot.exists()) {
        return Result.Success(null);
      }
      const value = snapshot.val() as T;
      return Result.Success(value);
    } catch (error) {
      log(`[db]: error occured`, error);
      return Result.Error("Something went wrong.", 500);
    }
  }

  public async exists(path: string): Promise<Result<boolean>> {
    try {
      const snapshot = await get(ref(this.db, path));
      if (!snapshot.exists()) {
        return Result.Success(false);
      }
      return Result.Success(true);
    } catch (error) {
      log(`[db]: error occured`, error);
      return Result.Error("Something went wrong.", 500);
    }
  }

  public async set<T>(item: T, path: string) {
    await set(ref(this.db, path), item);
  }
}

export { Database };
