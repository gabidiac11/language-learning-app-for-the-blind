import { Authenticator } from "../ApiSupport/authentication";
import EpilogueService from "../BusinessLogic/EpilogueService";
import {
  QuizBlockCompletedStatsResponse,
  QuizRequestBody,
  QuizResponse,
} from "../Models/quiz.models";
import BaseController from "./BaseController";
import { ApiErrorResponse } from "../ApiSupport/apiErrorHelpers";
import { EpilogueQuizServiceFactory } from "../BusinessLogic/Quiz/QuizServiceFactories/EpilogueQuizServiceFactory";
import { Body, Get, Path, Post, Route, Security, Tags } from "tsoa";

// NOTE: use factory given that each controller has fields strictly required within the scope of a request
export default class EpilogueQuizControllerFactory {
  public static inject = [
    Authenticator.name,
    EpilogueService.name,
    EpilogueQuizServiceFactory.name,
  ];

  private _authenticator: Authenticator;
  private _epilogueService: EpilogueService;
  private _epilogueQuizServiceFactory: EpilogueQuizServiceFactory;
  constructor(
    authenticator: Authenticator,
    epilogueService: EpilogueService,
    epilogueQuizServiceFactory: EpilogueQuizServiceFactory
  ) {
    this._authenticator = authenticator;
    this._epilogueService = epilogueService;
    this._epilogueQuizServiceFactory = epilogueQuizServiceFactory;
  }
  public create(): EpilogueQuizController {
    const controller = new EpilogueQuizController(
      this._authenticator,
      this._epilogueService,
      this._epilogueQuizServiceFactory
    );
    return controller;
  }
}

@Tags('Quiz - Epilogue blocks')
@Security("BearerAuth")
@Route("api/epilogues/:epilogueProgressId/quiz")
class EpilogueQuizController extends BaseController {
  private _epilogueService: EpilogueService;
  private _epilogueQuizServiceFactory: EpilogueQuizServiceFactory;
  constructor(
    authenticator: Authenticator,
    epilogueService: EpilogueService,
    epilogueQuizServiceFactory: EpilogueQuizServiceFactory
  ) {
    super(authenticator);
    this._epilogueService = epilogueService;
    this._epilogueQuizServiceFactory = epilogueQuizServiceFactory;
  }

  @Post("/request-question")
  public async requestQuizQuestion(
    @Path() epilogueProgressId: string
  ): Promise<QuizResponse> {
    await this.guardQuizRequestAuthorization(epilogueProgressId);

    const userId = this.getUser().uid;
    const quizService = await this._epilogueQuizServiceFactory.create(
      userId,
      epilogueProgressId
    );
    const result = await quizService.getLeftOffQuestionFromQuiz();
    return this.processResult(result);
  }

  @Post("/")
  public async answerQuizQuestion(
    @Body() quizRequest: QuizRequestBody,
    @Path() epilogueProgressId: string
  ): Promise<QuizResponse> {
    this.guardQuizRequestBody(quizRequest);
    await this.guardQuizRequestAuthorization(epilogueProgressId);

    const userId = this.getUser().uid;
    const quizService = await this._epilogueQuizServiceFactory.create(
      userId,
      epilogueProgressId
    );

    const outputResult = await quizService.answerQuestionAndGetNextQuestion(
      quizRequest
    );
    return this.processResult(outputResult);
  }

  @Get("/{quizId}/completed")
  public async getProgressAchievedOfCompletedQuiz(
    @Path() epilogueProgressId: string,
    @Path() quizId: string
  ): Promise<QuizBlockCompletedStatsResponse> {
    await this.guardQuizRequestAuthorization(epilogueProgressId);

    const userId = this.getUser().uid;

    const quizService = await this._epilogueQuizServiceFactory.create(
      userId,
      epilogueProgressId
    );
    const outputResult = await quizService.getProgressAchievedOfCompletedQuiz(
      quizId
    );
    return this.processResult(outputResult);
  }

  private async guardQuizRequestAuthorization(epilogueProgressId: string) {
    const userId = this.getUser().uid;

    const epilogueProgressResult =
      await this._epilogueService.getShallowEpilogueWithValidation(
        userId,
        epilogueProgressId
      );
    if (epilogueProgressResult.isError()) {
      throw ApiErrorResponse.ErrorResult(epilogueProgressResult);
    }
  }

  private guardQuizRequestBody(requestBody: QuizRequestBody) {
    if (!requestBody) {
      throw ApiErrorResponse.BadRequest("Request body should not be empty.");
    }

    if (!requestBody.optionId) {
      throw ApiErrorResponse.BadRequest("Option should not be empty.");
    }
    if (!requestBody.questionId) {
      throw ApiErrorResponse.BadRequest("Question should not be empty.");
    }
  }
}
