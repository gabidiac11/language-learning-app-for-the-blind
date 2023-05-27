import BaseController from "./BaseController";
import { Authenticator } from "../ApiSupport/authentication";
import EpilogueService from "../BusinessLogic/EpilogueService";
import { EpilogueProgressOutput } from "../Models/output.userStory.types";
import { convertEpilogueResultToOutput } from "../Models/modelConvertors";
import { Get, Path, Post, Route, Security, Tags } from "tsoa";

// NOTE: use factory given that each controller has fields strictly required within the scope of a request
export default class EpilogueControllerFactory {
  public static inject = [Authenticator.name, EpilogueService.name];

  private _epilogueService: EpilogueService;
  private _authenticator: Authenticator;
  constructor(authenticator: Authenticator, userStoryService: EpilogueService) {
    this._authenticator = authenticator;
    this._epilogueService = userStoryService;
  }

  public create(): EpilogueController {
    const controller = new EpilogueController(
      this._authenticator,
      this._epilogueService
    );
    return controller;
  }
}

@Tags('Epilogue blocks')
@Security('BearerAuth')
@Route("api/epilogues")
class EpilogueController extends BaseController {
  private _epilogueService: EpilogueService;
  constructor(authenticator: Authenticator, userStoryService: EpilogueService) {
    super(authenticator);
    this._epilogueService = userStoryService;
  }

  @Get("/{epilogueProgressId}")
  public async getEpilogueProgress(
    @Path() epilogueProgressId: string
  ): Promise<EpilogueProgressOutput> {
    const userId = this.getUser()?.uid;

    const epilogueResult = await this._epilogueService.getEpilogueWithGuard(userId, epilogueProgressId);
    const outputResult = convertEpilogueResultToOutput(epilogueResult);
    return this.processResult(outputResult);
  }

  @Post("/{epilogueProgressId}/complete-summary")
  public async completeSummary(
    @Path() epilogueProgressId: string
  ): Promise<boolean> {
    const userId = this.getUser()?.uid;

    await this._epilogueService.completeSummary(userId, epilogueProgressId);
    return true;
  }
}
