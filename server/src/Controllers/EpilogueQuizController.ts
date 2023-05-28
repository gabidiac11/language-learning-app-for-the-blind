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
import { Body, Example, Get, Path, Post, Route, Security, Tags } from "tsoa";
import * as apiExamples from "./../ApiSupport/responseExamples";

// NOTE: use factory given that each controller has fields strictly required within the scope of a request
export class EpilogueQuizControllerFactory {
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

@Tags("Quiz - Epilogue blocks")
@Security("BearerAuth")
@Security("LessonLanguage")
@Route("api/epilogues/:epilogueProgressId/quiz")
export class EpilogueQuizController extends BaseController {
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

  /**
   * Returns a new question from the quiz. If the quiz doesn't exist it will be created with the first round of questions consisting of all the template questions available.
   * If the quiz already exists the first unanswered question is returned.
   * 
   * To prevent cheating, option-ids and question-ids are generated each time questions are being generated from the template questions.
   * 
   * NOTE: this endpoint is accesible only if the user has the epilogue unlocked 
   * @param epilogueProgressId 
   * @returns 
   */
  @Post("/request-question")
  @Example<QuizResponse>(apiExamples.epilogueQuizRequestQuestionExample, "Next question.")
  @Example<QuizResponse>(apiExamples.epilogueQuizRequestQuestionExampleCompleted, "Quiz completed.")
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
   * To prevent cheating, option-ids and question-ids are generated each time questions are being generated from the template questions.
   * 
   * NOTE: this endpoint is accesible only if the user has the epilogue unlocked
   * @param quizRequest 
   * @param epilogueProgressId 
   * @returns 
   */
  @Post("/")
  @Example<QuizResponse>(apiExamples.epilogueQuizRequestQuestionExample, "Next question.")
  @Example<QuizResponse>(apiExamples.epilogueQuizRequestQuestionExampleCompleted, "Quiz completed.")
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

  /**
   * Gets the achievements gained by completing an epilogue quiz: the stories unlocked.
   * @param epilogueProgressId 
   * @param quizId 
   * @returns 
   */
  @Get("/{quizId}/completed")
  @Example<QuizBlockCompletedStatsResponse>(apiExamples.epilogueCompletedResponse)
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
