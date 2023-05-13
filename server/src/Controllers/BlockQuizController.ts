import BaseController from "./BaseController";
import { Authenticator } from "../ApiSupport/authentication";
import BlocksService from "../BusinessLogic/BlocksService";
import Result from "../ApiSupport/Result";
import { Request } from "express";
import { ApiError } from "../ApiSupport/apiErrorHelpers";
import {
  QuizBlockCompletedStatsResponse,
  QuizRequestBody,
  QuizRequestBodyAnswer,
  QuizRequestBodyIntialQuestion,
  QuizResponse,
} from "../Models/quiz.models";
import BlockQuizProgressServiceFactory from "../BusinessLogic/Quiz/BlockQuiz/BlockQuizService";

// NOTE: use factory given that each controller has fields strictly required within the scope of a request
export default class BlockQuizControllerFactory {
  public static inject = [
    Authenticator.name,
    BlocksService.name,
    BlockQuizProgressServiceFactory.name,
  ];

  private _authenticator: Authenticator;
  private _blocksService: BlocksService;
  private _blockQuizServiceFactory: BlockQuizProgressServiceFactory;
  constructor(
    authenticator: Authenticator,
    userStoryService: BlocksService,
    blockQuizServiceFactory: BlockQuizProgressServiceFactory
  ) {
    this._authenticator = authenticator;
    this._blocksService = userStoryService;
    this._blockQuizServiceFactory = blockQuizServiceFactory;
  }
  public create(): BlockQuizController {
    const controller = new BlockQuizController(
      this._authenticator,
      this._blocksService,
      this._blockQuizServiceFactory
    );
    return controller;
  }
}

class BlockQuizController extends BaseController {
  private _blocksService: BlocksService;
  private _blockQuizServiceFactory: BlockQuizProgressServiceFactory;
  constructor(
    authenticator: Authenticator,
    userStoryService: BlocksService,
    blockQuizServiceFactory: BlockQuizProgressServiceFactory
  ) {
    super(authenticator);
    this._blocksService = userStoryService;
    this._blockQuizServiceFactory = blockQuizServiceFactory;
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
    const blockProgressId = this.getParam<string>(req, "blockProgressId");
    const quizService = this._blockQuizServiceFactory.create(
      userId,
      blockProgressId
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
        "Building block summary was not completed. Please complete it to practice the words from this block before.",
        403
      );
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
    const blockProgressId = this.getParam<string>(req, "blockProgressId");
    const quizId = this.getParam<string>(req, "quizId");
    
    const quizService = this._blockQuizServiceFactory.create(userId, blockProgressId); 
    const result = await quizService.getProgressAchievedOfCompletedQuiz(userId, blockProgressId, quizId);
    return result;
  }
}
