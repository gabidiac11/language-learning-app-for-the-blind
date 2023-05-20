import { getStringifiedError } from "../../../ApiSupport/apiErrorHelpers";
import Result from "../../../ApiSupport/Result";
import {
  QuizEntityName,
  QuizTemplateQuestionName,
} from "../../../Data/ctxTypes/ctx.quiz.shared.types";
import {
  EpilogueProgress,
  EpilogueQuestionProgress,
} from "../../../Data/ctxTypes/ctx.userStory.types";
import { Database } from "../../../Data/database";
import { log } from "../../../logger";
import { QuizCompletedStatsResponse } from "../../../Models/quiz.models";
import { getShuffledArray, valuesOrdered } from "../../../utils";
import { EpilogueQuestionAnswerObj } from "../../bussinessModels";
import EpilogueService from "../../EpilogueService";
import ProgressService from "../../Progress/ProgressService";
import {
  QuizableItem,
  QuizSettings,
  TemplateQuestionItemReference,
} from "../QuizableItem";
import QuizService from "../QuizService";

export class EpilogueQuizServiceFactory {
  public static inject = [
    Database.name,
    ProgressService.name,
    EpilogueService.name,
  ];

  private _db: Database;
  private _progressService: ProgressService;
  private _epilogueService: EpilogueService;
  public constructor(
    db: Database,
    progressService: ProgressService,
    epilogueService: EpilogueService
  ) {
    this._db = db;
    this._progressService = progressService;
    this._epilogueService = epilogueService;
  }

  public async create(
    userId: string,
    epilogueProgressId: string
  ): Promise<QuizService> {
    const epilogueProgress: EpilogueProgress = await this.getEpilogueProgress(
      userId,
      epilogueProgressId
    );
    const blockQuizableItem: QuizableItem = await this.createQuizableItem(
      userId,
      epilogueProgress
    );
    const quizService = new QuizService(
      this._db,
      this._progressService,
      blockQuizableItem
    );
    return quizService;
  }
  private async getEpilogueProgress(
    userId: string,
    epilogueProgressId: string
  ): Promise<EpilogueProgress> {
    const result = await this._epilogueService.getEpilogueWithGuard(
      userId,
      epilogueProgressId
    );
    if (result.isError())
      throw `Could not create quiz: cannot find epilogue at id ${epilogueProgressId} because of error: ${getStringifiedError(
        result.errors
      )}`;
    if (!result.data)
      throw `Could not create quiz: cannot find epilogue at id ${epilogueProgressId} because of epilogue data is undefined.`;

    return result.data;
  }

  private async createQuizableItem(
    userId: string,
    epilogueProgress: EpilogueProgress
  ): Promise<QuizableItem> {
    const quizableItem = new QuizableItem();
    quizableItem.entityId = epilogueProgress.id;
    quizableItem.entity = QuizEntityName.epilogueProgress;
    quizableItem.enityTimeUnlocked = epilogueProgress.timeUnlocked;

    quizableItem.userStoryId = epilogueProgress.userStoryId;

    quizableItem.templateQuestionEntityName =
      QuizTemplateQuestionName.epilogueQuestion;

    const epilogueQuestionAnswers =
      await this._epilogueService.getEpilogueAnswers(
        epilogueProgress.lessonStoryId
      );
    quizableItem.templateQuestionItems = valuesOrdered(
      epilogueProgress.questionProgressItems
    ).map((epilogueQp) =>
      this.createTemplateQuestionItem(epilogueQp, epilogueQuestionAnswers)
    );

    quizableItem.quizSettings = this.createQuizSettings(
      epilogueProgress.epilogue.questions.length
    );
    quizableItem.dbLocationBasePath = `quizzesEpilogues/${userId}/epilogueProgress-${epilogueProgress.id}`;
    quizableItem.userId = userId;
    quizableItem.getAcheivements = this.createCallbackForAchievements(
      userId,
      epilogueProgress
    ).bind(this);
    return quizableItem;
  }
  // TODO: search 'block' in vscode
  private createTemplateQuestionItem(
    epilogueQp: EpilogueQuestionProgress,
    epilogueQuestionAnswers: EpilogueQuestionAnswerObj
  ): TemplateQuestionItemReference {
    const templateQuestion: TemplateQuestionItemReference = {
      entityQuestionId: epilogueQp.id,
      parentEntity: QuizEntityName.epilogueProgress,
      entityText: epilogueQp.question.text,
      questionText: epilogueQp.question.text,

      createOptionTexts: () => {
        let correctOptionId =
          epilogueQuestionAnswers[epilogueQp.question.id]?.correctOptionId;
        if (!correctOptionId) {
          log(`While creating options for epiloque question(id:${epilogueQp.question.id}, text:${epilogueQp.question.text})
            Couldn't find the right option. This should not happen if data is not compromised.
          `);
          correctOptionId = epilogueQp.question.options[0].id;
        }

        let correctOption = epilogueQp.question.options.find(
          (i) => i.id === correctOptionId
        );
        if (!correctOption) {
          log(`While creating options for epiloque question(id:${epilogueQp.question.id}, text:${epilogueQp.question.text})
            Couldn't match answer option id to the options from the actual question. 
            This should not happen if data is not compromised.
          `);
          correctOption = epilogueQp.question.options[0];
        }

        const correctOptionText = correctOption.text;
        const valuesWords = epilogueQp.question.options
          .filter((i) => i.id !== correctOption.id)
          .map((wrontOption) => wrontOption.text);
        const wrongOptionTexts = getShuffledArray(valuesWords).slice(0, 3);
        return { correctOptionText, wrongOptionTexts };
      },
    };
    return templateQuestion;
  }

  createCallbackForAchievements = (
    userId: string,
    epilogueProgress: EpilogueProgress
  ) => {
    return async () => {
      const unlockedUserStoriesResult =
        await this._epilogueService.getDependentEpilogueData(
          userId,
          epilogueProgress
        );
      if (unlockedUserStoriesResult.isError())
        return unlockedUserStoriesResult.As<QuizCompletedStatsResponse>();

      const responseData: QuizCompletedStatsResponse = {
        blockCompletedStoryRefId: epilogueProgress.userStoryId,
        userStoriesUnlocked: unlockedUserStoriesResult.data,
      };
      return Result.Success(responseData);
    };
  };

  private createQuizSettings(questionCount: number): QuizSettings {
    const s = new QuizSettings();
    // TODO: test more and adjust to a final configuration that works best
    if (questionCount < 5) {
      s.MISS_PROB_INC = 30;
      s.EXCLUDED_PROB_INC = 10;
      s.HIT_PROB_DEC = 20;
    } else if (questionCount < 10) {
      s.MISS_PROB_INC = 50;
      s.EXCLUDED_PROB_INC = 5;
      s.HIT_PROB_DEC = 40;
    } else {
      s.MISS_PROB_INC = 80;
      s.EXCLUDED_PROB_INC = 2;
      s.HIT_PROB_DEC = 70;
    }

    s.NUM_OF_REQUIRED_CONSECUTIVE_HITS = 1;

    s.MAX_ALLOWED_LEN_OF_EXCLUSION_SEQUENCE_SEPARATOR = 10;

    s.PROBABILITY_INC_ON_EMPTY_ROUND = 10;

    return s;
  }
}
