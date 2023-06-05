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
import {
  Body,
  Example,
  Get,
  Header,
  Path,
  Post,
  Route,
  Security,
  Tags,
} from "tsoa";
import * as apiExamples from "./../ApiSupport/responseExamples";
import { lessonLanguageHeader } from "../constants";
import { apiMessages } from "../ApiSupport/apiMessages";

// NOTE: use factory given that each controller has fields strictly required within the scope of a request
export class BlockQuizControllerFactory {
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

@Tags("Quiz - Builiding blocks")
@Security("BearerAuth")
@Security("LessonLanguage")
@Route("api/blocks/:blockProgressId/quiz")
export class BlockQuizController extends BaseController {
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

  /**
   * Returns a new question from the quiz. If the quiz doesn't exist it will be created with the first round of questions consisting of all the words associated with this building block.
   * If the quiz already exists the first unanswered question is returned.
   *
   * To prevent cheating, option-ids and question-ids are generated each time questions are being generated from the words.
   *
   * NOTE: this endpoint is accesible only if the user has this lesson block unlocked
   * @param blockProgressId
   * @returns
   */
  @Post("/request-question")
  @Example<QuizResponse>(
    apiExamples.blockQuizRequestQuestionExample,
    "Next question."
  )
  @Example<QuizResponse>(
    apiExamples.blockQuizRequestQuestionExampleCompleted,
    "Quiz completed."
  )
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

  /**
   * Receives a question and option id. Matches these values to the current existing unfinished quiz.
   *
   * Updates the quiz state with the outcome (correct/wrong). It returns:
   * - the correct option id + next question - if the quiz is not completed
   * - ... or the quiz completion response - if the quiz is completed
   *
   * Based on the outcome, new rounds of questions are generated as follows:
   * - the probability of a question to appear is increasing as to how many times that question was wrongly answered in a row, OR it increases as to how many times it was prevented from appearing
   * - the probability of a question to appear is decreasing as to how many times that question was correctly answered in a row
   *
   * To prevent cheating, option-ids and question-ids are generated each time questions are being generated from the words.
   *
   * NOTE: this endpoint is accesible only if the user has this lesson block unlocked
   * @param quizRequestBody
   * @param blockProgressId
   * @returns
   */
  @Post("/answer-question")
  @Example<QuizResponse>(
    apiExamples.blockQuizRequestQuestionExample,
    "Next question."
  )
  @Example<QuizResponse>(
    apiExamples.blockQuizRequestQuestionExampleCompleted,
    "Quiz completed."
  )
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

  /**
   * Gets the achievements gained by completing this quiz: other building blocks might be unlocked or the epilogue of the lesson story is unlocked if all building blocks are unlocked.
   * @param blockProgressId
   * @param quizId
   * @returns
   */
  @Get("/{quizId}/completed")
  @Example<QuizBlockCompletedStatsResponse>(apiExamples.blockCompletedResponse)
  public async getProgressAchievedOfCompletedQuiz(
    @Path() blockProgressId: string,
    @Path() quizId: string
  ): Promise<QuizBlockCompletedStatsResponse> {
    await this.guardQuizRequestAuthorization(blockProgressId);

    const userId = this.getUser().uid;

    const quizService = await this._blockQuizServiceFactory.create(
      userId,
      blockProgressId
    );
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
      throw ApiErrorResponse.Forbidden(apiMessages.quizCantAccessBlockIsLocked);
    }

    if (!blockProgressResult.data.timeSummaryCompleted) {
      throw ApiErrorResponse.Forbidden(apiMessages.blockSummaryNotFinished);
    }
  }

  private guardQuizRequestBody(requestBody: QuizRequestBody) {
    if (!requestBody) {
      throw ApiErrorResponse.BadRequest(apiMessages.quizRequestBodyEmpty);
    }

    if (!requestBody.optionId) {
      throw ApiErrorResponse.BadRequest(apiMessages.quizRequestOptionEmpty);
    }
    if (!requestBody.questionId) {
      throw ApiErrorResponse.BadRequest(apiMessages.quizRequestQuestionEmpty);
    }
  }
}
