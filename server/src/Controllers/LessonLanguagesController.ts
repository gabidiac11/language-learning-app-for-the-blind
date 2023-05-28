import BaseController from "./BaseController";
import { Authenticator } from "../ApiSupport/authentication";
import { Example, Get, Res, Route, Security, Tags } from "tsoa";
import * as apiExamples from "./../ApiSupport/responseExamples";
import { Database } from "../Data/database";
import {
  LanguageData,
  LanguageDataItem,
} from "../Data/ctxTypes/ctx.story.types";
import { ApiErrorResponse } from "../ApiSupport/apiErrorHelpers";
import Result from "../ApiSupport/Result";
import { valuesOrdered } from "../utils";

// NOTE: use factory given that each controller has fields strictly required within the scope of a request
export class LessonLanguagesControllerFactory {
  public static inject = [Authenticator.name, Database.name];

  private _authenticator: Authenticator;
  private _db: Database;
  constructor(authenticator: Authenticator, db: Database) {
    this._authenticator = authenticator;
    this._db = db;
  }

  public create(): LessonLanguagesController {
    const controller = new LessonLanguagesController(
      this._authenticator,
      this._db
    );
    return controller;
  }
}

@Tags("Lesson languages")
@Security("BearerAuth")
@Security("LessonLanguage")
@Route("api/lesson-languages")
export class LessonLanguagesController extends BaseController {
  private _db: Database;
  constructor(authenticator: Authenticator, db: Database) {
    super(authenticator);
    this._db = db;
  }

  /**
   * Gets the languages available for the lesson to learn
   *
   * @returns
   */
  @Get("/")
  @Example<LanguageDataItem[]>(apiExamples.languages)
  public async getLessonLanguages(): Promise<LanguageDataItem[]> {
    const languagesResult = await this._db.get<LanguageData>("/languages");
    if (languagesResult.isError()) {
      throw languagesResult.errors;
    }
    if (!languagesResult.data) {
      throw ApiErrorResponse.NotFound();
    }
    const values = valuesOrdered(languagesResult.data);
    return this.processResult(Result.Success<LanguageDataItem[]>(values));
  }
}
