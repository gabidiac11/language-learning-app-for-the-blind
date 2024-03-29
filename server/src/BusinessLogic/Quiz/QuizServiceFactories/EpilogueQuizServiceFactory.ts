import { getStringifiedError } from "../../../ApiSupport/apiErrorHelpers";
import {
  apiMessages,
  getApiMessageFrom,
} from "../../../ApiSupport/apiMessages";
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
import { addAudiosToCompletedMessage as addAudiosToCompletedResponse } from "./addAudiosToCompletedMessage";

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
    const epilogueQuizableItem: QuizableItem = await this.createQuizableItem(
      userId,
      epilogueProgress
    );
    const quizService = new QuizService(
      this._db,
      this._progressService,
      epilogueQuizableItem
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
    quizableItem.lang = epilogueProgress.lang;
    quizableItem.getAcheivements = this.createCallbackForAchievements(
      userId,
      epilogueProgress
    ).bind(this);

    this.addPlaybleApiMessagesCallbacks(quizableItem, epilogueProgress);
    return quizableItem;
  }

  private addPlaybleApiMessagesCallbacks(
    quizableItem: QuizableItem,
    epilogueProgress: EpilogueProgress
  ) {
    quizableItem.getPlayableApiMessagesForQuestion = (
      templateQuestionId: string,
      optionTemplateIds: string[]
    ) => {
      const questionP =
        epilogueProgress.questionProgressItems[templateQuestionId];
      if (!questionP) {
        log(
          `Didn't found any word with the id using the tempalte question id ${templateQuestionId} at epilogue progress ${epilogueProgress.id}`
        );
        return [];
      }

      const playableApiMessages =
        // add audio: question
        [
          getApiMessageFrom(
            questionP.question.audioFile,
            questionP.question.text
          ),
        ];

      const choiceAudios = [
        apiMessages.quizChoiceFour,
        apiMessages.quizChoiceThree,
        apiMessages.quizChoiceTwo,
        apiMessages.quizChoiceOne,
      ];
      optionTemplateIds.forEach((id) => {
        const optionItem = questionP.question.options.find(
          (option) => option.id === id
        );

        if (optionItem) {
          const choiceNumAudio = choiceAudios.pop();
          if (choiceNumAudio) {
            playableApiMessages.push(choiceNumAudio);
          }
          playableApiMessages.push(
            getApiMessageFrom(optionItem.audioFile, optionItem.text)
          );
        }
      });

      return playableApiMessages;
    };

    quizableItem.getPlayableApiMessageForRightAnswer = (
      templateQuestionId: string,
      correctTemplateOptionId: string
    ) => {
      const questionP =
        epilogueProgress.questionProgressItems[templateQuestionId];
      if (!questionP) {
        log(
          `Didn't found any word with the id using the tempalte question id ${templateQuestionId} at epilogue progress ${epilogueProgress.id}`
        );
        return [];
      }

      const correctOption = questionP.question.options.find(
        (i) => i.id === correctTemplateOptionId
      );
      if (!correctOption) return [];

      const playableApiMessages = [
        // add audio: all options read
        getApiMessageFrom(correctOption.audioFile, correctOption.text),
      ];

      return playableApiMessages;
    };
  }

  private createTemplateQuestionItem(
    epilogueQp: EpilogueQuestionProgress,
    epilogueQuestionAnswers: EpilogueQuestionAnswerObj
  ): TemplateQuestionItemReference {
    const templateQuestion: TemplateQuestionItemReference = {
      entityQuestionId: epilogueQp.id,
      parentEntity: QuizEntityName.epilogueProgress,
      entityText: epilogueQp.question.text,
      questionText: epilogueQp.question.text,

      playableQuestionMessages: [
        getApiMessageFrom(
          epilogueQp.question.audioFile,
          epilogueQp.question.text
        ),
      ],

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
        const allWrongOptions = epilogueQp.question.options
          .filter((i) => i.id !== correctOption.id);

        const wrongOptions = getShuffledArray(allWrongOptions).slice(0, 3);
        return {
          correctItem: {
            templateId: correctOption.id,
            text: correctOptionText,
          },
          wrongItems: wrongOptions.map((option) => ({
            templateId: option.id,
            text: option.text,
          })),
        };
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
        playableApiMessages: [],
      };
      addAudiosToCompletedResponse(responseData);
      return Result.Success(responseData);
    };
  };

  private createQuizSettings(questionCount: number): QuizSettings {
    const s = new QuizSettings();
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
