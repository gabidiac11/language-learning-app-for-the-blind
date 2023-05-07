import UserStoryService from "../BusinessLogic/UserStoryService";
import { UserStory } from "../Data/ctx.userStory.types";
import { log } from "../logger";
import BaseController from "./BaseController";
import Result from "./Result";

export default class StoriesController extends BaseController {
  public static inject = [UserStoryService.name];
  
  private _userStoryService: UserStoryService;
  constructor(userStoryService: UserStoryService) {
    super();
    this._userStoryService = userStoryService;
  }

  // TODO: add id generation with guid
  public async getStories(userId: string): Promise<Result<UserStory[]>> {
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
