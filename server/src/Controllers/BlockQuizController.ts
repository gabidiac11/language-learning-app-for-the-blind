import BaseController from "./BaseController";
import { Authenticator } from "../ApiSupport/authentication";
import BlocksService from "../BusinessLogic/BlocksService";
import { BuildingBlockProgress } from "../Data/ctx.userStory.types";
import Result from "../ApiSupport/Result";
import { Request } from "express";
import { BuildingBlockProgressOutput } from "../Models/output.userStory.types";
import { convertBlockResultToOutput } from "../Models/modelConvertors";
import { ApiError } from "../ApiSupport/apiErrorHelpers";

// NOTE: use factory given that each controller has fields strictly required within the scope of a request
export default class BlockQuizControllerFactory {
  public static inject = [Authenticator.name, BlocksService.name];

  private _authenticator: Authenticator;
  private _blocksService: BlocksService;
  constructor(authenticator: Authenticator, userStoryService: BlocksService) {
    this._authenticator = authenticator;
    this._blocksService = userStoryService;
  }
  public Create(): BlockQuizController {
    const controller = new BlockQuizController(
      this._authenticator,
      this._blocksService
    );
    return controller;
  }
}

class BlockQuizController extends BaseController {
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

  // public async getQuizQuestionAndAnswerPrevious(
  //   req: Request
  // ): Promise<Result<any>> {
  //   await this.authenticateAsync<any>(req);

  //   const userId = this.getUser().uid;
  //   const blockProgressId = this.getParam<string>(req, "blockProgressId");

  //   return BlockQuizControllerFactory;
  // }
}
