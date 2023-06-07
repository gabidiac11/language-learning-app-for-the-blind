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
  BuildingBlockProgress,
  WordProgress,
} from "../../../Data/ctxTypes/ctx.userStory.types";
import { Database } from "../../../Data/database";
import { log } from "../../../logger";
import { QuizCompletedStatsResponse } from "../../../Models/quiz.models";
import { getShuffledArray, valuesOrdered } from "../../../utils";
import BlocksService from "../../BlocksService";
import ProgressService from "../../Progress/ProgressService";
import {
  QuizableItem,
  QuizSettings,
  TemplateQuestionItemReference,
} from "../QuizableItem";
import QuizService from "../QuizService";
import { addAudiosToCompletedMessage } from "./addAudiosToCompletedMessage";

export class BlockQuizServiceFactory {
  public static inject = [
    Database.name,
    ProgressService.name,
    BlocksService.name,
  ];

  private _db: Database;
  private _progressService: ProgressService;
  private _blockService: BlocksService;
  public constructor(
    db: Database,
    progressService: ProgressService,
    blockService: BlocksService
  ) {
    this._db = db;
    this._progressService = progressService;
    this._blockService = blockService;
  }

  public async create(
    userId: string,
    blockProgressId: string
  ): Promise<QuizService> {
    const blockProgress = await this.getBlockProgress(userId, blockProgressId);
    const blockQuizableItem: QuizableItem = this.createQuizableItem(
      userId,
      blockProgress
    );
    const quizService = new QuizService(
      this._db,
      this._progressService,
      blockQuizableItem
    );
    return quizService;
  }

  private async getBlockProgress(
    userId: string,
    blockProgressId: string
  ): Promise<BuildingBlockProgress> {
    const blockProgressResult = await this._blockService.getUserBlockProgress(
      userId,
      blockProgressId
    );
    if (blockProgressResult.isError())
      throw `Could not creat block quiz because error occured while retrieving block progress id ${blockProgressId}. Error: ${getStringifiedError(
        blockProgressResult.errors
      )}`;

    return blockProgressResult.data;
  }

  private createQuizableItem(
    userId: string,
    blockProgress: BuildingBlockProgress
  ): QuizableItem {
    const quizableItem = new QuizableItem();
    quizableItem.entityId = blockProgress.id;
    quizableItem.entity = QuizEntityName.blockProgress;
    quizableItem.enityTimeUnlocked = blockProgress.timeUnlocked;

    quizableItem.userStoryId = blockProgress.userStoryId;

    quizableItem.templateQuestionEntityName =
      QuizTemplateQuestionName.blockWord;

    quizableItem.templateQuestionItems = valuesOrdered(
      blockProgress.wordProgressItems
    ).map((wp) => this.createTemplateQuestionItem(wp, blockProgress));

    quizableItem.quizSettings = this.createQuizSettings(
      Object.values(blockProgress.wordProgressItems).length
    );
    quizableItem.dbLocationBasePath = `quizzesBlocks/${userId}/blockProgress-${blockProgress.id}`;
    quizableItem.userId = userId;
    quizableItem.lang = blockProgress.lang;
    quizableItem.getAcheivements = this.createCallbackForAchievements(
      userId,
      blockProgress
    ).bind(this);

    this.addPlaybleApiMessagesCallbacks(quizableItem, blockProgress);

    return quizableItem;
  }

  addPlaybleApiMessagesCallbacks(
    quizableItem: QuizableItem,
    blockProgress: BuildingBlockProgress
  ) {
    quizableItem.getPlayableApiMessagesForQuestion = (
      templateQuestionId: string,
      optionTemplateIds: string[]
    ) => {
      const wp = blockProgress.wordProgressItems[templateQuestionId];
      if (!wp) {
        log(
          `Didn't found any word with the id using the tempalte question id ${templateQuestionId} at blockProgress ${blockProgress.id}, ${blockProgress.block.name}`
        );
        return [];
      }

      const playableApiMessages =
        // add audio: What is the meaning of...
        // add audio: ... ${foreign word}
        [
          apiMessages.quizBlockWhatIstheMeaningOfWord,
          getApiMessageFrom(wp.word.audioFile, wp.word.text),
        ];

      // NOTE: someone can cheat when you look at the audio path, but what can you do?
      // add audio: each option word's translation
      const choiceAudios = [
        apiMessages.quizChoiceFour,
        apiMessages.quizChoiceThree,
        apiMessages.quizChoiceTwo,
        apiMessages.quizChoiceOne,
      ];
      optionTemplateIds.forEach((id) => {
        const wordItem = blockProgress.wordProgressItems[id];
        if (wordItem) {
          const choiceNumAudio = choiceAudios.pop();
          if (choiceNumAudio) {
            playableApiMessages.push(choiceNumAudio);
          }
          playableApiMessages.push(
            getApiMessageFrom(
              wordItem.word.audioFileTranslation,
              `${wordItem.word.shortTranslation} - ${wordItem.word.longTranslation}`
            )
          );
        }
      });

      return playableApiMessages;
    };
    quizableItem.getPlayableApiMessageForRightAnswer = (
      templateQuestionId: string
    ) => {
      const wp = blockProgress.wordProgressItems[templateQuestionId];
      if (!wp) {
        log(
          `Didn't found any word with the id using the tempalte question id ${templateQuestionId} at blockProgress ${blockProgress.id}, ${blockProgress.block.name}`
        );
        return [];
      }

      return [
        getApiMessageFrom(
          wp.word.audioFileTranslation,
          `${wp.word.shortTranslation} - ${wp.word.longTranslation}`
        ),
      ];
    };
  }

  createCallbackForAchievements = (
    userId: string,
    blockProgress: BuildingBlockProgress
  ) => {
    return async () => {
      const dependentBlocksResult =
        await this._blockService.getDependentBuildingBlocksData(
          userId,
          blockProgress.id
        );
      if (dependentBlocksResult.isError())
        return dependentBlocksResult.As<QuizCompletedStatsResponse>();

      const responseData: QuizCompletedStatsResponse = {
        blockCompletedStoryRefId: dependentBlocksResult.data.userStoryId,
        blockCompleted: dependentBlocksResult.data.parentBlock,
        blockProgressUnlockedItems: dependentBlocksResult.data.childBlocks,
        epilogueProgressUnlocked: dependentBlocksResult.data.epilogueUnlocked,
        playableApiMessages: [],
      };

      addAudiosToCompletedMessage(responseData);
      return Result.Success(responseData);
    };
  };

  private createTemplateQuestionItem(
    wp: WordProgress,
    blockProgress: BuildingBlockProgress
  ): TemplateQuestionItemReference {
    const templateQuestion: TemplateQuestionItemReference = {
      entityQuestionId: wp.id,
      parentEntity: QuizEntityName.blockProgress,
      entityText: wp.word.text,
      questionText: `What is the meaning of the word '${wp.word.text}'?`,
      playableQuestionMessages: [
        apiMessages.quizBlockWhatIstheMeaningOfWord,
        getApiMessageFrom(wp.word.audioFile, wp.word.text),
      ],

      createOptionTexts: () => {
        const wrongValuesWords = Object.values(blockProgress.wordProgressItems)
          .filter((wpItem) => wpItem.id !== wp.id)
          .map((wrongWp) => ({
            templateId: wrongWp.id,
            text: `${wrongWp.word.shortTranslation} - ${wrongWp.word.longTranslation}`,
          }));
        const wrongItems = getShuffledArray(wrongValuesWords).slice(0, 3);

        return {
          correctItem: {
            text: `${wp.word.shortTranslation} - ${wp.word.longTranslation}`,
            templateId: wp.id,
          },
          wrongItems,
        };
      },
    };
    return templateQuestion;
  }

  private createQuizSettings(numOfWords: number): QuizSettings {
    const s = new QuizSettings();

    // TODO: test more and adjust to a final configuration that works best
    if (numOfWords < 5) {
      s.MISS_PROB_INC = 30;
      s.EXCLUDED_PROB_INC = 10;
      s.HIT_PROB_DEC = 20;
    } else if (numOfWords < 10) {
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
