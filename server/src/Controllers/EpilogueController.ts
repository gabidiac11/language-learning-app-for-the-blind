import BaseController from "./BaseController";
import { Authenticator } from "../ApiSupport/authentication";
import EpilogueService from "../BusinessLogic/EpilogueService";
import { EpilogueProgressOutput } from "../Models/output.userStory.types";
import { convertEpilogueResultToOutput } from "../Models/modelConvertors";
import { Example, Get, Path, Post, Route, Security, Tags } from "tsoa";
import * as apiExamples from "./../ApiSupport/responseExamples";

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

  /**
   * Gets the epilogue block lesson data and the user information about the progress on this lesson block.
   * 
   * @param epilogueProgressId 
   * @returns 
   */
  @Get("/{epilogueProgressId}")
  @Example<EpilogueProgressOutput>(apiExamples.epilogueProgress)
  public async getEpilogueProgress(
    @Path() epilogueProgressId: string
  ): Promise<EpilogueProgressOutput> {
    const userId = this.getUser()?.uid;

    const epilogueResult = await this._epilogueService.getEpilogueWithGuard(userId, epilogueProgressId);
    const outputResult = convertEpilogueResultToOutput(epilogueResult);
    return this.processResult(outputResult);
  }

   /**
   * Marks that the user has listened to the short story of an epilogue.  
   * 
   * NOTE: it's only accesible if the user has completed all the building blocks of the lesson story associated with the epilogue.
   * @param epilogueProgressId 
   * @returns 
   */
  @Post("/{epilogueProgressId}/complete-summary")
  @Example<boolean>(true, "Ok")
  public async completeSummary(
    @Path() epilogueProgressId: string
  ): Promise<boolean> {
    const userId = this.getUser()?.uid;

    await this._epilogueService.completeSummary(userId, epilogueProgressId);
    return true;
  }
}
