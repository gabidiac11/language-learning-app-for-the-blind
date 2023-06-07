import { Language } from "./ctx.story.types";

export enum RoundOutcome {
  Unset,
  Hit,
  Miss,
  Excluded,
}
export type QuizQuestion = {
  id: string;
  text: string;
  correctOptionId: string;
  options?: QuizOption[];
  lang: Language;
  templateQuestionId: string;
};

export type QuizOption = {
  // this id is mapped to a word id - to avoid exposing the correct option
  id: string;
  text: string;
  quizOptionTemplateId: string;
};

export type QuizOptionFrontend = {
  id: string;
  text: string;
};

export type QuizOutcome = {
  id: string;
  outcome: RoundOutcome;
  parentEntity: "blockProgress" | "epilogueProgress";
  entityQuestionId: string;
  quizQuestion?: QuizQuestion;
  // intended for tracing - not usage
  wordTxt: string;
  prababilityInclusion: number;
};

export type QuizState = {
  id: string;
  timestamp: number;
  entity: "blockProgress" | "epilogueProgress";
  entityId: string;
  userStoryId: string;

  quizOutcomes?: QuizOutcome[];
  timeCompleted?: number;
  lang: Language,
};

export enum QuizEntityName {
  blockProgress = "blockProgress",
  epilogueProgress = "epilogueProgress",
}
export enum QuizTemplateQuestionName {
  blockWord = "blockWord",
  epilogueQuestion = "epilogueQuestion",
}
