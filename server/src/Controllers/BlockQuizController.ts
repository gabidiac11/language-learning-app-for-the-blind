import BaseController from "./BaseController";
import { Authenticator } from "../ApiSupport/authentication";
import BlocksService from "../BusinessLogic/BlocksService";
import { BuildingBlockProgress } from "../Data/ctx.userStory.types";
import Result from "../ApiSupport/Result";
import { Request } from "express";
import { BuildingBlockProgressOutput } from "../Models/output.userStory.types";
import { convertBlockResultToOutput } from "../Models/modelConvertors";
import { ApiError } from "../ApiSupport/apiErrorHelpers";

// TODO: make this transient dependency or something like that to work this out
export default class BlockQuizController extends BaseController {
  public static inject = [Authenticator.name, BlocksService.name];

  private shallowBlockProgress?: BuildingBlockProgress;

  private _blocksService: BlocksService;
  constructor(authenticator: Authenticator, userStoryService: BlocksService) {
    super(authenticator);
    this._blocksService = userStoryService;
  }

  private async guardQuizAndAssignBlock(req: Request) {
    const userId = this.getUser().uid;
    const blockProgressId = this.getParam<string>(req, "blockProgressId");

    const blockProgressResult =
      await this._blocksService.getShallowBlockProgress(
        userId,
        blockProgressId
      );
    if (blockProgressResult.isError()) {
      throw ApiError.ErrorResult(blockProgressResult);
    }

    if (!blockProgressResult.data.timeUnlocked) {
      throw ApiError.Error(
        "Building block is locked. Please complete the other blocks or stories required.",
        403
      );
    }

    if (!blockProgressResult.data.timeSummaryCompleted) {
      throw ApiError.Error(
        "Building block summary was not completed. Please complete it to practice the words from this block.",
        403
      );
    }

    this.shallowBlockProgress = blockProgressResult.data;
  }

  public async getQuizQuestionAndAnswerPrevious(
    req: Request
  ): Promise<Result<any>> {
    await this.authenticateAsync<any>(req);

    const userId = this.getUser().uid;
    const blockProgressId = this.getParam<string>(req, "blockProgressId");

    return BlockQuizController;
  }
}
