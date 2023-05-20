import {
  ApiError,
  getStringifiedError,
} from "../../ApiSupport/apiErrorHelpers";
import Result from "../../ApiSupport/Result";
import {
  RoundOutcome,
  QuizQuestion,
  QuizOutcome,
  QuizState,
} from "../../Data/ctxTypes/ctx.quiz.shared.types";
import { Database } from "../../Data/database";
import { log } from "../../logger";
import {
  QuizResponse,
  QuizRequestBodyAnswer,
  QuizCompletedStatsResponse,
} from "../../Models/quiz.models";
import ProgressService from "../Progress/ProgressService";
import { QuizStateCreator } from "./QuizStateCreator";
import { QuizStateRoundQuestionsGenerator } from "./QuizStateRoundQuestionsGenerator";
import { QuizableItem } from "./QuizableItem";
import QuizCompletionChecker from "./QuizCompletionChecker";

export default class QuizService {
  private _db: Database;
  private _progressService: ProgressService;

  private _quizableItem: QuizableItem;

  private _trace: string;

  // cached result for recent quiz
  private _mostRecentQuizCached: QuizState | undefined;

  public constructor(
    db: Database,
    progressService: ProgressService,
    quizableItem: QuizableItem
  ) {
    this._db = db;
    this._progressService = progressService;

    this._quizableItem = quizableItem;

    this._trace = `QUIZ-${quizableItem.entity}-${this._quizableItem.entityId}`;
  }

  public async getLeftOffQuestionFromQuiz(): Promise<Result<QuizResponse>> {
    // validate user progress permission to the block
    const validationResult = await this.getAccessValidatonResult();
    if (validationResult.isError()) {
      return validationResult.As<QuizResponse>();
    }

    log(
      `[${this._trace}]: Start or resume quiz for user(id:${this._quizableItem.userId})...`
    );

    // verify if there is any uncompleted quiz
    const anyUnCompletedQuiz = await this.hasAnyUncompletedQuizState();
    if (!anyUnCompletedQuiz) {
      log(
        `[${this._trace}]: User(id:${this._quizableItem.userId}) doesn't have any completed quiz. Will create...`
      );
      await this.createAndAddNewQuizState();
    }

    const result = await this.getNextQuestionResponseFromRecentQuiz();
    return result;
  }

  public async answerQuestionAndGetNextQuestion(
    request: QuizRequestBodyAnswer
  ): Promise<Result<QuizResponse>> {
    // validate user progress permission to the block
    const validationResult = this.getAccessValidatonResult();
    if (validationResult.isError()) {
      return validationResult.As<QuizResponse>();
    }

    log(
      `[${this._trace}]: Verifying answer question(id: ${request.questionId}, triedOption: ${request.optionId}) for user ${this._quizableItem.userId}...`
    );

    // verify if there is any uncompleted quiz
    const anyUnCompletedQuiz = await this.hasAnyUncompletedQuizState();
    if (!anyUnCompletedQuiz) {
      log(
        `[${this._trace}]: User ${this._quizableItem.userId} doesn't have any uncompleted quiz, so can't answer question.`
      );

      return Result.Error<QuizResponse>(
        "Can't answer question because the question is not part of any uncompleted quiz.",
        400
      );
    }

    const qs = await this.getMostRecentQuizAsync();

    log(
      `[${this._trace}]: Found the most recent quiz(id:${qs.id}, timestamp: ${qs.timestamp}).`
    );

    const quizOutcome = (qs.quizOutcomes ?? []).find(
      (o) =>
        o.quizQuestion?.id === request.questionId &&
        o.outcome !== RoundOutcome.Excluded
    );
    if (!quizOutcome || !quizOutcome.quizQuestion) {
      log(
        `[${this._trace}]: The question was not found within the current uncompleted quiz."`
      );
      return Result.Error<QuizResponse>(
        "The question was not found within the current uncompleted quiz.",
        400
      );
    }

    log(`[${this._trace}]: Question found within the current quiz."`);

    // update and save outcome of the word outcome based on response
    if (quizOutcome.quizQuestion.correctOptionId === request.optionId) {
      quizOutcome.outcome = RoundOutcome.Hit;
      log(`[${this._trace}]: User gave the correct answer.`);
    } else {
      quizOutcome.outcome = RoundOutcome.Miss;
      log(`[${this._trace}]: User gave the wrong answer.`);
    }
    await this.saveQuizAsync(qs);

    log(`[${this._trace}]: Quiz updated with this outcome.`);
    log(
      `[${this._trace}]: Searching for any possible remaining question from the current round of questions or find out if quiz can be marked as completed...`
    );

    // generate next question to be answered
    const nextQuestionResult =
      await this.getNextQuestionResponseFromRecentQuiz();
    if (nextQuestionResult.isError() || !nextQuestionResult.data) {
      return nextQuestionResult;
    }

    // pass the correct answer to the previous question
    const data: QuizResponse = {
      ...nextQuestionResult.data,
      previouslyQuestion_CorrectOptionId:
        quizOutcome.quizQuestion.correctOptionId,
    };
    return Result.Success(data);
  }

  public async getProgressAchievedOfCompletedQuiz(
    quizId: string
  ): Promise<Result<QuizCompletedStatsResponse>> {
    // check if quiz exists
    const quizResult = await this._db.get<QuizState>(
      `${this._quizableItem.dbLocationBasePath}/${quizId}`
    );
    if (quizResult.isError()) {
      return quizResult.As<QuizCompletedStatsResponse>();
    }

    if (!quizResult.data) {
      return Result.Error<QuizCompletedStatsResponse>(
        "Quiz with id requested doesn't exit.",
        404
      );
    }

    if (!quizResult.data.timeCompleted) {
      return Result.Error<QuizCompletedStatsResponse>(
        "Quiz with id was not yet completed.",
        400
      );
    }

    const result = await this._quizableItem.getAcheivements();
    return result;
  }

  private async getNextQuestionResponseFromRecentQuiz(): Promise<
    Result<QuizResponse>
  > {
    log(`[${this._trace}]: Searching unanswered question for the user...`);

    // retrieve the first question with outcome unset from the most recent quiz
    const nextQuestion = await this.getRemainingQuestionFromCurrentRound();
    if (nextQuestion?.quizQuestion) {
      log(
        `[${this._trace}]: Found question(id:${nextQuestion.quizQuestion.id}, text:${nextQuestion.quizQuestion.text}).`
      );

      const data = this.convertQuestionToQuizResponse(
        nextQuestion.quizQuestion
      );
      return Result.Success<QuizResponse>(data);
    }

    log(
      `[${this._trace}]: No remaining question exists within the current round of questions.`
    );
    log(
      `[${this._trace}]: Checking if the quiz can be completed or a new round of questions needs to be generated...`
    );

    // if there is no remaining questions at this point,
    // it means all the existing questions were already answered
    // and if so a new round of questions will be generated based on probability algorithm
    await this.addNextRoundOfQuestions_Or_CompleteQuiz();

    // quiz is finished after updates, if so no following question is sent,
    // instead a 'complete' response is sent
    const isQuizFinished = await this.recentQuizIsFinished();
    if (isQuizFinished) {
      log(`[${this._trace}]: Quiz was marked as completed.`);
      log(`[${this._trace}]: Returning response...`);

      const qs = await this.getMostRecentQuizAsync();
      return Result.Success<QuizResponse>({
        quizId: qs.id,
        quizCompleted: true,
      });
    }

    log(`[${this._trace}]: Quiz is NOT completed.`);
    log(`[${this._trace}]: New questions were generated.`);
    log(`[${this._trace}]: Getting one of the newly generated questions...`);

    // after update: get the first question with outcome unset from the last quiz from the list
    // if there is none, the algorithm is bad
    const nextRemainingQuestionFromNewRound =
      await this.getRemainingQuestionFromCurrentRound_NotNull();

    const data = this.convertQuestionToQuizResponse(
      nextRemainingQuestionFromNewRound.quizQuestion
    );
    return Result.Success(data);
  }

  private getAccessValidatonResult(): Result<any> {
    if (!this._quizableItem.enityTimeUnlocked) {
      return Result.Error(
        "Block or epilogue is locked. Please complete the other blocks or stories required.",
        403
      );
    }
    return Result.Success(true);
  }

  private async recentQuizIsFinished(): Promise<boolean> {
    const quiezzesResult = await this._db.get<{
      [quizId: string]: QuizState;
    }>(this._quizableItem.dbLocationBasePath);

    if (quiezzesResult.isError()) {
      throw quiezzesResult.errors;
    }

    if (!quiezzesResult.data || !Object.entries(quiezzesResult.data).length) {
      return false;
    }

    const recentestQuiz = Object.values(quiezzesResult.data).reduce(
      (recentItem, current) =>
        recentItem.timestamp < current.timestamp ? current : recentItem,
      Object.values(quiezzesResult.data)[0]
    );

    // update cached quiz
    this._mostRecentQuizCached = recentestQuiz;

    const lastIsFinished = !!recentestQuiz?.timeCompleted;
    return lastIsFinished;
  }

  private async hasAnyUncompletedQuizState(): Promise<boolean> {
    const quiezzesResult = await this._db.get<{
      [quizId: string]: QuizState;
    }>(this._quizableItem.dbLocationBasePath);

    if (quiezzesResult.isError()) {
      log(
        `[${this._trace}]: Error occured while quering quiz at path '${this._quizableItem.dbLocationBasePath}'`
      );
      throw getStringifiedError(quiezzesResult.errors);
    }

    if (!quiezzesResult.data || !Object.entries(quiezzesResult.data).length) {
      return false;
    }

    const mostRecentQuiz = Object.values(quiezzesResult.data).reduce(
      (mostRecentItem, current) =>
        mostRecentItem.timestamp < current.timestamp ? current : mostRecentItem,
      Object.values(quiezzesResult.data)[0]
    );
    if (!mostRecentQuiz.timeCompleted) {
      // update cached quiz
      this._mostRecentQuizCached = mostRecentQuiz;
      return true;
    }
    return false;
  }

  /**
   * NOTE!
   * !! this throws errors if any quiz is not found !!!
   *
   * Might be a good idea to make a separate service that does the prior validations
   * to avoid calling this method in an unsafe way.
   * @param forceRefresh
   * @returns
   */
  private async getMostRecentQuizAsync(
    forceRefresh = false
  ): Promise<QuizState> {
    if (!forceRefresh && this._mostRecentQuizCached)
      return this._mostRecentQuizCached;

    const quiezzesResult = await this._db.get<{
      [quizId: string]: QuizState;
    }>(this._quizableItem.dbLocationBasePath);

    if (quiezzesResult.isError()) {
      log(
        `[${this._trace}]: Error while searching the recent quiz even after prior passed validations.`
      );
      throw getStringifiedError(quiezzesResult.errors);
    }

    if (!quiezzesResult.data || !Object.entries(quiezzesResult.data).length) {
      log(
        `[${this._trace}]: Could not find the recent quiz even after prior passed validations.`
      );
      throw ApiError.Error("Something went wrong.", 500);
    }

    const recentestQuiz = Object.values(quiezzesResult.data).reduce(
      (recentItem, current) =>
        recentItem.timestamp < current.timestamp ? current : recentItem,
      Object.values(quiezzesResult.data)[0]
    );

    // update cached quiz
    this._mostRecentQuizCached = recentestQuiz;

    return recentestQuiz;
  }

  private async getRemainingQuestionFromCurrentRound(): Promise<
    QuizOutcome | undefined
  > {
    const qs = await this.getMostRecentQuizAsync();
    const quizOutcome = (qs.quizOutcomes ?? []).find(
      (o) => o.outcome === RoundOutcome.Unset
    );
    return quizOutcome;
  }

  private async getRemainingQuestionFromCurrentRound_NotNull(): Promise<QuizOutcome> {
    const quizOutcome = await this.getRemainingQuestionFromCurrentRound();
    if (!quizOutcome?.quizQuestion) {
      log(
        `[${this._trace}]: Something went wrong. No questions with unanswered status.`
      );
      throw ApiError.Error("Something went wrong", 500);
    }
    log(
      `[${this._trace}]: Found question id:${quizOutcome.quizQuestion.id}, text:${quizOutcome.quizQuestion.text}.`
    );
    return quizOutcome;
  }

  private async createAndAddNewQuizState() {
    const creator = new QuizStateCreator(this._quizableItem);
    const qs: QuizState = creator.createQuizState();

    log(`[${this._trace}]: Created quiz ${qs.id}.`);
    log(`[${this._trace}]: Saving quiz ${qs.id}...`);

    await this.saveQuizAsync(qs);
  }

  private async saveQuizAsync(qs: QuizState) {
    await this._db.set(qs, `${this._quizableItem.dbLocationBasePath}/${qs.id}`);
    log(`[${this._trace}]: Quiz ${qs.id} saved.`);

    // force re-caching of the quiz next time recent quiz is requested:
    this._mostRecentQuizCached = undefined;
  }

  private async addNextRoundOfQuestions_Or_CompleteQuiz() {
    log(
      `[${this._trace}]: <Updater>. Checking if quiz can be marked as completed.`
    );
    const qs = await this.getMostRecentQuizAsync();

    const quizCompletionChecker = new QuizCompletionChecker(
      qs,
      this._quizableItem
    );
    const quizCanBeCompleted = quizCompletionChecker.quizCanBeCompleted();
    if (quizCanBeCompleted) {
      qs.timeCompleted = Date.now();
      log(`[${this._trace}]: <Updater>. Quiz can be marked as completed.`);

      await this.saveQuizAsync(qs);
      log(`[${this._trace}]: <Updater>. Quiz was marked as completed.`);

      log(`[${this._trace}]: <Updater>. Emitting completion event...`);
      await this._progressService.handleQuizCompletionEvent(this._quizableItem);
      return;
    }

    const quizRoundQuestionsGenerator = new QuizStateRoundQuestionsGenerator(
      qs,
      this._quizableItem
    );
    quizRoundQuestionsGenerator.addNextRoundOfQuestionsToQuiz();
    await this.saveQuizAsync(qs);
  }

  private convertQuestionToQuizResponse(question: QuizQuestion): QuizResponse {
    const data: QuizResponse = {
      questionText: question.text,
      questionId: question.id,
      options: question.options,
      quizCompleted: false,
      previouslyQuestion_CorrectOptionId: undefined,
    };
    return data;
  }
}
