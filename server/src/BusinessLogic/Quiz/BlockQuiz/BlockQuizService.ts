// TODO: refine the algoritm...

import {
  ApiError,
  getStringifiedError,
} from "../../../ApiSupport/apiErrorHelpers";
import Result from "../../../ApiSupport/Result";
import {
  QuizQuestion,
  RoundOutcome,
} from "../../../Data/ctxTypes/ctx.quiz.shared.types";
import {
  QuizBlockState,
  WordOutcome,
} from "../../../Data/ctxTypes/ctx.quizl.block.types";
import { BuildingBlockProgress } from "../../../Data/ctxTypes/ctx.userStory.types";
import { Database } from "../../../Data/database";
import { log } from "../../../logger";
import {
  QuizResponse,
  QuizRequestBodyAnswer,
  QuizBlockCompletedStatsResponse as QuizBlockCompletedAchievementsResponse,
} from "../../../Models/quiz.models";
import BlocksService from "../../BlocksService";
import ProgressService from "../../Progress/ProgressService";
import { QuizBlockStateCreator } from "./QuizBlockStateCreator";
import { QuizBlockWorker } from "./QuizBlockWorker";

export default class BlockQuizProgressServiceFactory {
  public static inject = [
    Database.name,
    BlocksService.name,
    ProgressService.name,
  ];

  private _db: Database;
  private _blockService: BlocksService;
  private _progressService: ProgressService;
  public constructor(
    db: Database,
    blockService: BlocksService,
    progressService: ProgressService
  ) {
    this._db = db;
    this._blockService = blockService;
    this._progressService = progressService;
  }

  public create(
    userId: string,
    blockProgressId: string
  ): BlockQuizProgressService {
    const instance = new BlockQuizProgressService(
      this._db,
      this._blockService,
      this._progressService,
      userId,
      blockProgressId
    );
    return instance;
  }
}

class BlockQuizProgressService {
  private _db: Database;
  private _blockService: BlocksService;
  private _progressService: ProgressService;

  private _userId: string;
  private _blockProgressId: string;

  public constructor(
    db: Database,
    blockService: BlocksService,
    progressService: ProgressService,
    userId: string,
    blockProgressId: string
  ) {
    this._db = db;
    this._blockService = blockService;
    this._progressService = progressService;

    this._userId = userId;
    this._blockProgressId = blockProgressId;
  }

  private async getLeftOffQuestionFromQuiz_NoValidation():Promise<Result<QuizResponse>> { 
    log(`Seraching unanswered question for the user...`);
    // get the first question with outcome unset from the last quiz from the list
    const nextRemainingQuestion = await this.getNextUnanswerQuestion();
    if (nextRemainingQuestion?.question) {
      log(
        `Found question(id:${nextRemainingQuestion.question.id}, text:${nextRemainingQuestion.question.text}).`
      );

      const data = this.convertQuestionToQuizResponse(
        nextRemainingQuestion.question
      );
      return Result.Success<QuizResponse>(data);
    }

    // if there is no remaining questions at this point, it means all the existing questions were already answered
    // new round of questions are generated based on probability algorithm
    log(`No remaining question exists currently.`);
    log(
      `Checking if quiz can be completed or new round of questions will be generated.`
    );
    await this.updateToNextRoundOfQuestions_Or_CompleteQuiz();

    // quiz is finished after updates - no questions is sent, instead sent 'complete' response
    const quizFinishedAfterUpt = await this.lastQuizIsFinished();
    if (quizFinishedAfterUpt) {
      log(`Quiz was marked as completed. Returning completed response...`);

      const qs = await this.getMostRecentQuizAsync();
      return Result.Success<QuizResponse>({
        quizId: qs.id,
        quizCompleted: true,
      });
    }
    log(
      `Quiz is not completed. New questions were generated. Searching for one of the new unanswered questions...`
    );

    // after update: get the first question with outcome unset from the last quiz from the list
    // if there is none, the algorithm is bad
    const nextRemainingQuestion_AfterUpdate =
      await this.getNextUnanswerQuestion();
    if (!nextRemainingQuestion_AfterUpdate?.question) {
      log(`Something went wrong. No questions with unanswered status.`);
      throw ApiError.Error("Something went wrong", 500);
    }
    log(
      `Found question id:${nextRemainingQuestion_AfterUpdate.question.id}, text:${nextRemainingQuestion_AfterUpdate.question.text}.`
    );

    const data = this.convertQuestionToQuizResponse(
      nextRemainingQuestion_AfterUpdate.question
    );
    return Result.Success(data);
  }
  public async getLeftOffQuestionFromQuiz(): Promise<Result<QuizResponse>> {
    // validate user progress permission to the block
    const validationResult = await this.getAccessValidatonResult();
    if (validationResult.isError()) {
      return validationResult.As<QuizResponse>();
    }

    log(`Start or resume quiz for user(id:${this._userId})...`);

    // check if there is any quiz at all or any unfinished quiz
    // if not -> create a new one
    const hasAnyUnifinishedQuizState =
      await this.blockHasAnyUnfinishedQuizState();
    if (!hasAnyUnifinishedQuizState) {
      log(
        `User(id:${this._userId}) doesn't have any completed quiz. Will create...`
      );
      await this.createAndAddNewQuizState();
    }

    const result = await this.getLeftOffQuestionFromQuiz_NoValidation();
    return result;
  }
  public async answerQuestionAndGetNextQuestion(
    request: QuizRequestBodyAnswer
  ): Promise<Result<QuizResponse>> {
    // validate user progress permission to the block
    const validationResult = await this.getAccessValidatonResult();
    if (validationResult.isError()) {
      return validationResult.As<QuizResponse>();
    }

    log(
      `Answer quiz question(id: ${request.questionId}, triedOption: ${request.optionId}) for user ${this._userId}...`
    );

    // verify if there is any quiz that is unfinished
    const hasAnyUnifinishedQuizState =
      await this.blockHasAnyUnfinishedQuizState();
    if (!hasAnyUnifinishedQuizState) {
      log(
        `User ${this._userId} doesn't have any uncompleted quiz, so can't answer question.`
      );

      return Result.Error<QuizResponse>(
        "Can't answer question because the question is not part of any unfinished quiz.",
        400
      );
    }

    // find question the user wants to answer
    const qs = await this.getMostRecentQuizAsync();
    log(`Found the most recent quiz(id:${qs.id}, timestamp: ${qs.timestamp}).`);

    const targetOutcomeWithQuestion = qs.wordOutcomes.find(
      (o) =>
        o.question?.id === request.questionId &&
        o.outcome !== RoundOutcome.Excluded
    );
    if (!targetOutcomeWithQuestion || !targetOutcomeWithQuestion.question) {
      log(
        `Can't answer question because the question is not part of the last quiz."`
      );
      return Result.Error<QuizResponse>(
        "Can't answer question because the question is not part of the last quiz.",
        400
      );
    }
    log(`Matched the requested question within the quiz."`);

    // update and save outcome of the word outcome based on response
    if (
      targetOutcomeWithQuestion.question.correctOptionId === request.optionId
    ) {
      targetOutcomeWithQuestion.outcome = RoundOutcome.Hit;
      log(`User answered correctly.`);
    } else {
      targetOutcomeWithQuestion.outcome = RoundOutcome.Miss;
      log(`User answered wrong.`);
    }
    await this.saveQuizAsync(qs);

    log(`Quiz was saved with this question outcome.`);
    log(`Search the next question or checking if the quiz is completed.`);
    // generate next question to be answered
    const dataNextQuestion = await this.getLeftOffQuestionFromQuiz_NoValidation();
    if (dataNextQuestion.isError() || !dataNextQuestion.data) {
      return dataNextQuestion;
    }

    // pass the correct answer to the previous question
    const data: QuizResponse = {
      ...dataNextQuestion.data,
      previouslyQuestion_CorrectOptionId:
        targetOutcomeWithQuestion.question.correctOptionId,
    };
    return Result.Success(data);
  }

  public async getProgressAchievedOfCompletedQuiz(
    userId: string,
    blockProgressId: string,
    quizId: string
  ): Promise<Result<QuizBlockCompletedAchievementsResponse>> {
    // check if quiz exists
    const quizResult = await this._db.get<QuizBlockState>(
      `blockQuizzes/${this._userId}/blockProgress-${this._blockProgressId}/${quizId}`
    );
    if(quizResult.isError()) {
      return quizResult.As<QuizBlockCompletedAchievementsResponse>();
    } 

    if(!quizResult.data) {
      return Result.Error<QuizBlockCompletedAchievementsResponse>("Quiz with id requested doesn't exit.", 404);
    }

    if(!quizResult.data.timeCompleted) {
      return Result.Error<QuizBlockCompletedAchievementsResponse>("Quiz with id was not yet completed.", 400);
    }

    const dependentBlocksResult = await this._blockService.getDependentBuildingBlocksData(userId, blockProgressId);
    if(dependentBlocksResult.isError()) return dependentBlocksResult.As<QuizBlockCompletedAchievementsResponse>();

    const responseData: QuizBlockCompletedAchievementsResponse = {
      blockCompletedStoryRefId: dependentBlocksResult.data.userStoryId,
      blockCompleted: dependentBlocksResult.data.parentBlock,
      blockProgressUnlockedItems: dependentBlocksResult.data.childBlocks
    };
    return Result.Success(responseData);
  }

  private async getAccessValidatonResult(): Promise<Result<any>> {
    const shallowBlockProgressRes =
      await this._blockService.getShallowBlockProgress(
        this._userId,
        this._blockProgressId
      );

    if (shallowBlockProgressRes.isError()) {
      return shallowBlockProgressRes;
    }

    if (!shallowBlockProgressRes.data.timeUnlocked) {
      return Result.Error(
        "Building block is locked. Please complete the other blocks or stories required.",
        403
      );
    }
    return Result.Success(true);
  }
  private async blockHasAnyUnfinishedQuizState(): Promise<boolean> {
    const quiezzesResult = await this._db.get<{
      [quizId: string]: QuizBlockState;
    }>(`blockQuizzes/${this._userId}/blockProgress-${this._blockProgressId}`);

    if (quiezzesResult.isError()) {
      throw ApiError.ErrorResult(quiezzesResult);
    }

    if (!quiezzesResult.data || !Object.entries(quiezzesResult.data).length) {
      return false;
    }

    if (Object.values(quiezzesResult.data).some((x) => !x.timeCompleted)) {
      return true;
    }
    return false;
  }
  private async lastQuizIsFinished(): Promise<boolean> {
    const quiezzesResult = await this._db.get<{
      [quizId: string]: QuizBlockState;
    }>(`blockQuizzes/${this._userId}/blockProgress-${this._blockProgressId}`);

    if (quiezzesResult.isError()) {
      throw ApiError.ErrorResult(quiezzesResult);
    }

    if (!quiezzesResult.data || !Object.entries(quiezzesResult.data).length) {
      return false;
    }

    const recentestQuest = Object.values(quiezzesResult.data).reduce(
      (recentItem, current) =>
        recentItem.timestamp < current.timestamp ? current : recentItem,
      Object.values(quiezzesResult.data)[0]
    );
    const lastIsFinished = !!recentestQuest?.timeCompleted;
    return lastIsFinished;
  }

  private async getMostRecentQuizAsync(): Promise<QuizBlockState> {
    const quiezzesResult = await this._db.get<{
      [quizId: string]: QuizBlockState;
    }>(`blockQuizzes/${this._userId}/blockProgress-${this._blockProgressId}`);

    if (quiezzesResult.isError()) {
      log(
        `${this.mark()}: error while searching the recent quiz even after prior passed validations.${getStringifiedError(
          quiezzesResult.errors
        )}`
      );
      throw ApiError.Error("Something went wrong.", 500);
    }

    if (!quiezzesResult.data || !Object.entries(quiezzesResult.data).length) {
      log(
        `${this.mark()}: could not find the recent quiz even after prior passed validations.`
      );
      throw ApiError.Error("Something went wrong.", 500);
    }

    const recentestQuiz = Object.values(quiezzesResult.data).reduce(
      (recentItem, current) =>
        recentItem.timestamp < current.timestamp ? current : recentItem,
      Object.values(quiezzesResult.data)[0]
    );
    return recentestQuiz;
  }

  private mark() {
    return `[Block-Quiz-${this._blockProgressId}]`;
  }

  private async getBlockProgress(): Promise<BuildingBlockProgress> {
    const blockResult = await this._blockService.getUserBlockProgress(
      this._userId,
      this._blockProgressId
    );
    if (blockResult.isError()) {
      throw ApiError.ErrorResult(blockResult);
    }

    if (!blockResult.data) {
      log(
        `${this.mark()}: could not get block progress data even after prior validations.`
      );
      throw ApiError.Error("Something went wrong", 500);
    }
    return blockResult.data;
  }

  private async getNextUnanswerQuestion(): Promise<WordOutcome | undefined> {
    const qs = await this.getMostRecentQuizAsync();
    const question = qs.wordOutcomes.find(
      (o) => o.outcome === RoundOutcome.Unset
    );
    return question;
  }

  private async createAndAddNewQuizState() {
    const blockProgress = await this.getBlockProgress();

    const creator = new QuizBlockStateCreator(blockProgress);
    const qs: QuizBlockState = creator.createQuizState();
    log(`Quiz ${qs.id} created.`);

    await this.saveQuizAsync(qs);
    return qs;
  }

  private async saveQuizAsync(qs: QuizBlockState) {
    await this._db.set(
      qs,
      `blockQuizzes/${this._userId}/blockProgress-${this._blockProgressId}/${qs.id}`
    );
    log(`Quiz ${qs.id} saved.`);
  }

  private async updateToNextRoundOfQuestions_Or_CompleteQuiz() {
    const qs = await this.getMostRecentQuizAsync();
    const blockProgress = await this.getBlockProgress();
    const quizWorkerInstance = new QuizBlockWorker(qs, blockProgress);

    log(`[QUIZ-UPDATER]: checking if quiz can be marked as completed.`);
    const quizCanBeCompleted = quizWorkerInstance.quizCanBeCompleted();
    if (quizCanBeCompleted) {
      qs.timeCompleted = Date.now();
      log(`[QUIZ-UPDATER]: quiz can be marked as completed.`);

      await this.saveQuizAsync(qs);

      log(`[QUIZ-UPDATER]: quiz was marked as completed.`);
      log(`[QUIZ-UPDATER]: emitting event BUILDING-BLOCK-COMPLETED.`);
      await this._progressService.setBlockComplete(
        this._userId,
        this._blockProgressId
      );
      return;
    }

    quizWorkerInstance.addNextRoundOfQuestionsToQuiz();
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
