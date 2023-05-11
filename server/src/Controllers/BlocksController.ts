import BaseController from "./BaseController";
import { Authenticator } from "../ApiSupport/authentication";
import BlocksService from "../BusinessLogic/BlocksService";
import { BuildingBlockProgress } from "../Data/ctx.userStory.types";
import Result from "../ApiSupport/Result";
import { Request } from "express";
import { BuildingBlockProgressOutput } from "../Models/output.userStory.types";
import { convertBlockResultToOutput } from "../Models/modelConvertors";

export default class BlocksControllerFactory {
  public static inject = [Authenticator.name, BlocksService.name];

  private _blocksService: BlocksService;
  private _authenticator: Authenticator;
  constructor(authenticator: Authenticator, userStoryService: BlocksService) {
    this._authenticator = authenticator;
    this._blocksService = userStoryService;
  }

  public create():BlocksController {
    const controller = new BlocksController(this._authenticator, this._blocksService);
    return controller;
  }
}

class BlocksController extends BaseController {
  private _blocksService: BlocksService;
  constructor(authenticator: Authenticator, userStoryService: BlocksService) {
    super(authenticator);
    this._blocksService = userStoryService;
  }

  public async getBlockProgress(
    req: Request
  ): Promise<Result<BuildingBlockProgressOutput>> {
    const backendModelResult = await this._internal_getBlockProgress(req);
    const result = convertBlockResultToOutput(backendModelResult);
    return result;
  }

  public async completeSummary(req: Request): Promise<Result<any>> {
    await this.authenticateAsync<any>(req);

    const userId = this.getUser().uid;
    const blockProgressId = this.getParam<string>(req, "blockProgressId");

    const result = await this._blocksService.completeSummaryBlockProgress(
      userId,
      blockProgressId
    );
    return result;
  }

  private async _internal_getBlockProgress(
    req: Request
  ): Promise<Result<BuildingBlockProgress>> {
    await this.authenticateAsync<BuildingBlockProgress>(req);

    const userId = this.getUser().uid;
    const blockProgressId = this.getParam<string>(req, "blockProgressId");

    const result = await this._blocksService.getUserBlockProgress(
      userId,
      blockProgressId
    );
    return result;
  }
}
