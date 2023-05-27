import UserStoryService from "../BusinessLogic/UserStory/UserStoryService";
import { UserStory } from "../Data/ctxTypes/ctx.userStory.types";
import { log } from "../logger";
import BaseController from "./BaseController";
import Result from "../ApiSupport/Result";
import { Authenticator } from "../ApiSupport/authentication";
import { UserStoryOutput } from "../Models/output.userStory.types";
import {
  convertUserStoriesResultToOutput,
  convertUserStoryResultToOutput,
} from "../Models/modelConvertors";
import { Get, Route, Example, Security, Tags } from "tsoa";
import * as apiExamples from "./../ApiSupport/responseExamples";

// NOTE: use factory given that each controller has fields strictly required within the scope of a request
export default class UserStoriesControllerFactory {
  public static inject = [Authenticator.name, UserStoryService.name];

  private _userStoryService: UserStoryService;
  private _authenticator: Authenticator;
  constructor(
    authenticator: Authenticator,
    userStoryService: UserStoryService
  ) {
    this._authenticator = authenticator;
    this._userStoryService = userStoryService;
  }
  public create(): UserStoriesController {
    const controller = new UserStoriesController(
      this._authenticator,
      this._userStoryService
    );
    return controller;
  }
}

@Tags('User Stories')
@Route("api/userStories")
@Security('BearerAuth')
class UserStoriesController extends BaseController {
  private _userStoryService: UserStoryService;
  constructor(
    authenticator: Authenticator,
    userStoryService: UserStoryService
  ) {
    super(authenticator);
    this._userStoryService = userStoryService;
  }

  /**
   * Get user stories for the current user. Each user story contains information from the lesson story associated and the progress of the user.
   */
  @Get("/")
  @Example<UserStoryOutput[]>(apiExamples.userStories)
  public async getStories(): Promise<UserStoryOutput[]> {
    const result = await this.internalGetStories();
    const outputResult = convertUserStoriesResultToOutput(result);
    return this.processResult(outputResult);
  }

  /**
   * Get the specified user story for the current user.
   * Each user story contains information from the lesson story associated and the progress of the user.
   * @param id Id of the user story
   * @returns
   * 
   * @example id "e77ef155-bd12-46f0-8559-bf55f6dd4c63"
   */
  @Get("/{id}")
  @Example<UserStoryOutput>(apiExamples.userStory)
  public async getStory(id: string): Promise<UserStoryOutput> {
    const result = await this.internalGetStory(id);
    const outputResult = convertUserStoryResultToOutput(result);
    return this.processResult(outputResult);
  }

  private async internalGetStories(): Promise<Result<UserStory[]>> {
    const userId = this.getUser().uid;

    const hasUserStoriesResult: Result<boolean> =
      await this._userStoryService.hasUserStoriesAssign(userId);
    if (hasUserStoriesResult.isError()) {
      return hasUserStoriesResult.As<UserStory[]>();
    }

    const hasUserStoryAssign = hasUserStoriesResult.data;
    if (hasUserStoryAssign) {
      log(`User ${userId} does have user stories. Will query user stories...`);
      const storiesResult = await this._userStoryService.queryUserStories(
        userId
      );
      return storiesResult;
    }

    log(`User ${userId} doesn't have user stories. Will create...`);
    const initResult = await this._userStoryService.initializeUserStories(
      userId
    );
    if (initResult.isError()) {
      return initResult.As<UserStory[]>();
    }

    log(
      `User ${userId} has been assign user stories. Will query user stories...`
    );
    const result = await this._userStoryService.queryUserStories(userId);
    if (result.isError()) {
      return result;
    }
    return Result.Success(result.data, 200);
  }

  private async internalGetStory(
    userStoryId: string
  ): Promise<Result<UserStory>> {
    const userId = this.getUser().uid;

    const result = await this._userStoryService.queryUserStory(
      userId,
      userStoryId
    );
    return result;
  }
}
