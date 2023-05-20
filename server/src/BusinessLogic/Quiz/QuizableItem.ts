import Result from "../../ApiSupport/Result";
import {
  QuizEntityName,
  QuizTemplateQuestionName,
} from "../../Data/ctxTypes/ctx.quiz.shared.types";
import { QuizCompletedStatsResponse } from "../../Models/quiz.models";

export class QuizSettings {
  MISS_PROB_INC: number;
  EXCLUDED_PROB_INC: number;
  HIT_PROB_DEC: number;

  NUM_OF_REQUIRED_CONSECUTIVE_HITS: number;

  // It means:
  //if I have [hit, skip, skip, hit] - how many skips between
  // hits to consider these hits pseudo-consecutive and conclude that the word was leant
  MAX_ALLOWED_LEN_OF_EXCLUSION_SEQUENCE_SEPARATOR: number;

  PROBABILITY_INC_ON_EMPTY_ROUND: number;

  static DefaultSettings(): QuizSettings {
    const s = new QuizSettings();
    s.MISS_PROB_INC = 30;
    s.EXCLUDED_PROB_INC = 10;
    s.HIT_PROB_DEC = 20;

    s.NUM_OF_REQUIRED_CONSECUTIVE_HITS = 1;

    s.MAX_ALLOWED_LEN_OF_EXCLUSION_SEQUENCE_SEPARATOR = 10;

    s.PROBABILITY_INC_ON_EMPTY_ROUND = 10;

    return s;
  }
}

/**
 * an adaptor class that takes things from BlockProgress/EpilogueProgress and helps creating generic quizzes
 */
export class QuizableItem {
  public entityId: string;
  public entity: QuizEntityName;
  public enityTimeUnlocked: number;

  public userStoryId: string;

  public templateQuestionEntityName: QuizTemplateQuestionName;
  public templateQuestionItems: TemplateQuestionItemReference[]; // a quiz can take words from a building block (for block-quiz) or actual questions from an epilogue (for )

  public quizSettings: QuizSettings;

  public dbLocationBasePath: string;

  public userId: string;

  public getAcheivements: () => Promise<Result<QuizCompletedStatsResponse>>;
}

export class TemplateQuestionItemReference {
  entityQuestionId: string;
  parentEntity: QuizEntityName;
  entityText: string;
  
  questionText: string;
  createOptionTexts: () => {
    correctOptionText: string;
    wrongOptionTexts: string[];
  };
}

export class QuizableItemFactory {
  public createFromBlockProgress() {}

  public createFromEpilogueProgress() {}
}
