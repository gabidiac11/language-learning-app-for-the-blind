import BaseController from "./BaseController";
import { Authenticator } from "../ApiSupport/authentication";
import BlocksService from "../BusinessLogic/BlocksService";
import { BuildingBlockProgressOutput } from "../Models/output.userStory.types";
import { convertBlockResultToOutput } from "../Models/modelConvertors";
import { Example, Get, Path, Post, Route, Security, Tags } from "tsoa";
import * as apiExamples from "./../ApiSupport/responseExamples";

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


  /**
   * Gets the building block lesson data and the user information about the progress on this lesson block.
   * 
   * @param blockProgressId 
   * @returns 
   */
  @Get("/{blockProgressId}")
  @Example<BuildingBlockProgressOutput>(apiExamples.blockProgress)
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

   /**
   * Marks that the user has went through all the words associated with this building block.
   * 
   * NOTE: it's only accesible if the user has completed all the building blocks and stories necessary to unlock this building block
   * @param epilogueProgressId 
   * @returns 
   */
  @Post("/{blockProgressId}/complete-summary")
  @Example<boolean>(true)
  public async completeSummary(@Path() blockProgressId: string): Promise<boolean> {
    const userId = this.getUser().uid;

    const outputResult = await this._blocksService.completeSummaryBlockProgress(
      userId,
      blockProgressId
    );
    return this.processResult(outputResult);
  }
}
