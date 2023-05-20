import BaseController from "./BaseController";
import { Authenticator } from "../ApiSupport/authentication";
import EpilogueService from "../BusinessLogic/EpilogueService";
import { EpilogueProgress } from "../Data/ctxTypes/ctx.userStory.types";
import Result from "../ApiSupport/Result";
import { Request } from "express";
import { EpilogueProgressOutput } from "../Models/output.userStory.types";
import { convertEpilogueResultToOutput } from "../Models/modelConvertors";

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

class EpilogueController extends BaseController {
  private _epilogueService: EpilogueService;
  constructor(authenticator: Authenticator, userStoryService: EpilogueService) {
    super(authenticator);
    this._epilogueService = userStoryService;
  }

  public async getEpilogueProgress(
    req: Request
  ): Promise<Result<EpilogueProgressOutput>> {
    await this.authenticateAsync(req);

    const epilogueProgressId = req.params.epilogueProgressId;
    const userId = this.getUser()?.uid;

    const result = await this._epilogueService.getEpilogue(userId, epilogueProgressId);
    return convertEpilogueResultToOutput(result);
  }
}
