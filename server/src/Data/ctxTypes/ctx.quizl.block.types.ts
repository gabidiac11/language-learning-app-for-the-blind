import { RoundOutcome, QuizQuestion } from "./ctx.quiz.shared.types";
import { WordProgress } from "./ctx.userStory.types";

// QUIZ
export type WordOutcome = {
  id: string;
  outcome: RoundOutcome;
  idWordProgress: string;
  question?: QuizQuestion;
  // intended for tracing - not usage
  wordTxt: string;
  prababilityInclusion: number;
};

export type QuizBlockState = {
  id: string;
  timestamp: number;
  blockProgressId: string;
  userStoryId: string;
  wordOutcomes: WordOutcome[];
  timeCompleted?: number;
};

// TODO: might need to delete this, but keep the comments somewhere
export type BlockQuizStates = {
  // Obs: since a progress block to user is one-to-one relationship -> user is traceable
  progressBlockId: string;
  // if one of the quiz states is completed -> the block is completed
  // if the user wants to redu a building block he can do so, but won't modify the block progress, but actually continue the last uncompleted quiz state or start a new one
  quizStates: {[id: string]: QuizBlockState}[];
};
