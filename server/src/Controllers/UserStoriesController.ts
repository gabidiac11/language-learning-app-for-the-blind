import UserStoryService from "../BusinessLogic/UserStoryService";
import { UserStory } from "../Data/ctx.userStory.types";
import { log } from "../logger";
import BaseController from "./BaseController";
import Result from "../ApiSupport/Result";
import { Request } from "express";
import { Authenticator } from "../ApiSupport/authentication";

export default class UserStoriesController extends BaseController {
  public static inject = [Authenticator.name, UserStoryService.name];

  private _userStoryService: UserStoryService;
  constructor(
    authenticator: Authenticator,
    userStoryService: UserStoryService
  ) {
    super(authenticator);
    this._userStoryService = userStoryService;
  }

  // TODO: add id generation with guid
  public async getStories(req: Request): Promise<Result<UserStory[]>> {
    await this.authenticateAsync<UserStory[]>(req);
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

    // TODO: I should think about how can we initialize user stories at an earlier time -> maybe event on user registration?
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
}
