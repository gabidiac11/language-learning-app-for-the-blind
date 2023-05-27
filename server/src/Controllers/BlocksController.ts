import BaseController from "./BaseController";
import { Authenticator } from "../ApiSupport/authentication";
import BlocksService from "../BusinessLogic/BlocksService";
import { BuildingBlockProgressOutput } from "../Models/output.userStory.types";
import { convertBlockResultToOutput } from "../Models/modelConvertors";
import { Get, Path, Post, Route, Security, Tags } from "tsoa";

// NOTE: use factory given that each controller has fields strictly required within the scope of a request
export default class BlocksControllerFactory {
  public static inject = [Authenticator.name, BlocksService.name];

  private _blocksService: BlocksService;
  private _authenticator: Authenticator;
  constructor(authenticator: Authenticator, blockService: BlocksService) {
    this._authenticator = authenticator;
    this._blocksService = blockService;
  }

  public create(): BlocksController {
    const controller = new BlocksController(
      this._authenticator,
      this._blocksService
    );
    return controller;
  }
}

@Tags('Building blocks')
@Security('BearerAuth')
@Route("api/blocks")
class BlocksController extends BaseController {
  private _blocksService: BlocksService;
  constructor(authenticator: Authenticator, blockService: BlocksService) {
    super(authenticator);
    this._blocksService = blockService;
  }

  @Get("/{blockProgressId}")
  public async getBlockProgress(
    @Path() blockProgressId: string
  ): Promise<BuildingBlockProgressOutput> {
    const userId = this.getUser().uid;

    const backendModelResult = await this._blocksService.getUserBlockProgress(
      userId,
      blockProgressId
    );

    const outputResult = convertBlockResultToOutput(backendModelResult);
    return this.processResult(outputResult);
  }

  @Post("/{blockProgressId}/complete-summary")
  public async completeSummary(@Path() blockProgressId: string): Promise<any> {
    const userId = this.getUser().uid;

    const outputResult = await this._blocksService.completeSummaryBlockProgress(
      userId,
      blockProgressId
    );
    return this.processResult(outputResult);
  }
}
