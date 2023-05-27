import BaseController from "./BaseController";
import { Authenticator } from "../ApiSupport/authentication";
import BlocksService from "../BusinessLogic/BlocksService";
import { ApiErrorResponse } from "../ApiSupport/apiErrorHelpers";
import {
  QuizBlockCompletedStatsResponse,
  QuizRequestBody,
  QuizResponse,
} from "../Models/quiz.models";
import { BlockQuizServiceFactory } from "../BusinessLogic/Quiz/QuizServiceFactories/BlockQuizServiceFactory";
import { Body, Get, Path, Post, Route, Security, Tags } from "tsoa";

// NOTE: use factory given that each controller has fields strictly required within the scope of a request
export default class BlockQuizControllerFactory {
  public static inject = [
    Authenticator.name,
    BlocksService.name,
    BlockQuizServiceFactory.name,
  ];

  private _authenticator: Authenticator;
  private _blocksService: BlocksService;
  private _blockQuizServiceFactory: BlockQuizServiceFactory;
  constructor(
    authenticator: Authenticator,
    userStoryService: BlocksService,
    blockQuizServiceFactory: BlockQuizServiceFactory
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

@Tags('Quiz - Builiding blocks')
@Security('BearerAuth')
@Route("api/blocks/:blockProgressId/quiz")
class BlockQuizController extends BaseController {
  private _blocksService: BlocksService;
  private _blockQuizServiceFactory: BlockQuizServiceFactory;
  constructor(
    authenticator: Authenticator,
    userStoryService: BlocksService,
    blockQuizServiceFactory: BlockQuizServiceFactory
  ) {
    super(authenticator);
    this._blocksService = userStoryService;
    this._blockQuizServiceFactory = blockQuizServiceFactory;
  }

  @Post("/request-question")
  public async requestQuizQuestion(
    @Path() blockProgressId: string
  ): Promise<QuizResponse> {
    await this.guardQuizRequestAuthorization(blockProgressId);

    const userId = this.getUser().uid;
    const quizService = await this._blockQuizServiceFactory.create(
      userId,
      blockProgressId
    );
    const result = await quizService.getLeftOffQuestionFromQuiz();
    return this.processResult(result);
  }

  @Post("/answer-question")
  public async answerQuizQuestion(
    @Body() quizRequestBody: QuizRequestBody,
    @Path() blockProgressId: string
  ): Promise<QuizResponse> {
    this.guardQuizRequestBody(quizRequestBody);
    await this.guardQuizRequestAuthorization(blockProgressId);

    const userId = this.getUser().uid;
    const quizService = await this._blockQuizServiceFactory.create(
      userId,
      blockProgressId
    );

    const result = await quizService.answerQuestionAndGetNextQuestion(
      quizRequestBody
    );
    return this.processResult(result);
  }

  @Get("/{quizId}/completed")
  public async getProgressAchievedOfCompletedQuiz(
    @Path() blockProgressId: string,
    @Path() quizId: string,
  ): Promise<QuizBlockCompletedStatsResponse> {
    await this.guardQuizRequestAuthorization(blockProgressId);

    const userId = this.getUser().uid;
    
    const quizService = await this._blockQuizServiceFactory.create(userId, blockProgressId); 
    const result = await quizService.getProgressAchievedOfCompletedQuiz(quizId);
    return this.processResult(result);
  }

  private async guardQuizRequestAuthorization(blockProgressId: string) {
    const userId = this.getUser().uid;

    const blockProgressResult =
      await this._blocksService.getShallowBlockProgress(
        userId,
        blockProgressId
      );
    if (blockProgressResult.isError()) {
      throw ApiErrorResponse.ErrorResult(blockProgressResult);
    }

    if (!blockProgressResult.data.timeUnlocked) {
      throw ApiErrorResponse.Forbidden(
        "Building block is locked. Please complete the other blocks or stories required."
      );
    }

    if (!blockProgressResult.data.timeSummaryCompleted) {
      throw ApiErrorResponse.Forbidden(
        "Building block summary was not completed. Please complete it to practice the words from this block before."
      );
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
