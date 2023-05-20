import { Authenticator } from "../ApiSupport/authentication";
import Result from "../ApiSupport/Result";
import EpilogueService from "../BusinessLogic/EpilogueService";
import {
  QuizBlockCompletedStatsResponse,
  QuizRequestBody,
  QuizRequestBodyAnswer,
  QuizRequestBodyIntialQuestion,
  QuizResponse,
} from "../Models/quiz.models";
import BaseController from "./BaseController";
import { Request } from "express";
import { ApiError } from "../ApiSupport/apiErrorHelpers";
import { EpilogueQuizServiceFactory } from "../BusinessLogic/Quiz/QuizServiceFactories/EpilogueQuizServiceFactory";

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

  public async getQuizQuestionAndAnswerPrevious(
    req: Request
  ): Promise<Result<QuizResponse>> {
    await this.authenticateAsync<QuizResponse>(req);
    await this.guardQuizRequest(req);

    const requestBodyResult = this.getQuizRequestBody(req);
    if (requestBodyResult.isError())
      return requestBodyResult.As<QuizResponse>();

    const userId = this.getUser().uid;
    const epilogueProgressId = this.getParam<string>(req, "epilogueProgressId");
    const quizService = await this._epilogueQuizServiceFactory.create(
      userId,
      epilogueProgressId
    );
    if (
      (requestBodyResult.data as QuizRequestBodyIntialQuestion)
        ?.questionRequested
    ) {
      const result = await quizService.getLeftOffQuestionFromQuiz();
      return result;
    }

    const result = await quizService.answerQuestionAndGetNextQuestion(
      requestBodyResult.data as QuizRequestBodyAnswer
    );
    return result;
  }

  private async guardQuizRequest(req: Request) {
    const userId = this.getUser().uid;
    const epilogueProgressId = this.getParam<string>(req, "epilogueProgressId");

    const epilogueProgressResult =
      await this._epilogueService.getShallowEpilogueWithValidation(
        userId,
        epilogueProgressId
      );
    if (epilogueProgressResult.isError()) {
      throw ApiError.ErrorResult(epilogueProgressResult);
    }
  }

  private getQuizRequestBody(req: Request): Result<QuizRequestBody> {
    if (req.body.questionRequested === true) {
      const requestBody: QuizRequestBodyIntialQuestion = {
        questionRequested: true,
      };
      return Result.Success(requestBody);
    }

    const requestBody: QuizRequestBodyAnswer = {
      optionId: req.body.optionId,
      questionId: req.body.questionId,
    };
    if (!requestBody.optionId) {
      return Result.Error("Option should not be empty.", 400);
    }
    if (!requestBody.questionId) {
      return Result.Error("Question should not be empty.", 400);
    }
    return Result.Success(requestBody);
  }

  public async getProgressAchievedOfCompletedQuiz(
    req: Request
  ): Promise<Result<QuizBlockCompletedStatsResponse>> {
    await this.authenticateAsync<QuizResponse>(req);
    await this.guardQuizRequest(req);

    const userId = this.getUser().uid;
    const epilogueProgressId = this.getParam<string>(req, "epilogueProgressId");
    const quizId = this.getParam<string>(req, "quizId");

    const quizService = await this._epilogueQuizServiceFactory.create(
      userId,
      epilogueProgressId
    );
    const result = await quizService.getProgressAchievedOfCompletedQuiz(
      quizId
    );
    return result;
  }
}
