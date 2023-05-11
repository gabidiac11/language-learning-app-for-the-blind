import BaseController from "./BaseController";
import { Authenticator } from "../ApiSupport/authentication";
import BlocksService from "../BusinessLogic/BlocksService";
import { BuildingBlockProgress } from "../Data/ctx.userStory.types";
import Result from "../ApiSupport/Result";
import { Request } from "express";

export default class BlocksController extends BaseController {
  public static inject = [Authenticator.name, BlocksService.name];

  private _blocksService: BlocksService;
  constructor(authenticator: Authenticator, userStoryService: BlocksService) {
    super(authenticator);
    this._blocksService = userStoryService;
  }

  public async getBlockProgress(
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
