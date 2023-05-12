import { RoundOutcome, QuizQuestion } from "./ctx.quiz.shared.types";

export type EpilogueQuestionOutcome = {
  id: string;
  outcome: RoundOutcome;
  idQuestionProgress: string;
  question?: QuizQuestion;
  // intended for tracing - not usage
  wordTxt: string;
  prababilityInclusion: number;
};

export type QuizEpilogueState = {
  id: string;
  epilogueProgressId: string;
  outcomes: EpilogueQuestionOutcome[];
  timeCompleted?: number;
};

export type EpilogueQuizStates = {
  progressBlockId: string;
  // if one of the quiz states is completed -> the epilogue is completed
  // if the user wants to redu a EPILOGUE he can do so, but won't modify the progress, but actually continue the last uncompleted quiz state or start a new one
  quizStates: QuizEpilogueState[];
};
