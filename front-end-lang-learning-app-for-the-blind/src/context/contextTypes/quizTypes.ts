import { UseFetchDataOptions } from "../../api/useFetchData";
import { BuildingBlockProgress, Word, WordProgress } from "./ctxTypes";

// QUIZ
export enum RoundOutcome {
  Hit,
  Miss,
  Unset,
  Excluded,
}

export type RoundWord = {
  idWordProgress: number;
  wordProgress?: WordProgress;
  outcomes: RoundOutcome[];
};

export type IdLinkEntity<T> = {
  idEntity: number;
  entity: T;
};

export type QuizQuestion = {
  id: number;
  text: string;
  correctOptionId: number;
  options: QuizOption[];
};

export type WordOutcome = {
  id: number;
  outcome: RoundOutcome;
  idWordProgress: number;
  question?: QuizQuestion;
  // intended for tracing - not usage
  wordTxt: string;
  prababilityInclusion: number;
};

export type QuizState = {
  id: number;
  blockProgressId: number;
  wordOutcomes: WordOutcome[];
  timeCompleted?: number;
};

export type QuizOption = {
  // this id is mapped to a word id - to avoid exposing the correct option
  id: number;
  text: string;
};

export type BlockQuizStates = {
  // Obs: since a progress block to user is one-to-one relationship -> user is traceable
  progressBlockId: number;
  // if one of the quiz states is completed -> the block is completed
  // if the user wants to redu a building block he can do so, but won't modify the block progress, but actually continue the last uncompleted quiz state or start a new one
  quizStates: QuizState[];
};

//< --START-- >< ---------------- TYPES EXPOSED TO THE FRONTEND ---------------- >< --START-->

export type QuizResponseNextQuestion = {
  questionText: string;
  questionId: number;
  options: QuizOption[];

  // id to the correct answer from previous question
  previouslyQuestion_CorrectOptionId?: number;
};
export type QuizResponseComplete = {
  quizCompleted: boolean;
  previouslyQuestion_CorrectOptionId?: number;
};
export type QuizResponse = QuizResponseNextQuestion | QuizResponseComplete;

// quiz REQUEST
export type QuizRequestBodyAnswer = {
  questionId: number;
  optionId: number;
};

export type QuizRequestBodyIntialQuestion = {
  questionRequested: true;
};

export type QuizRequestBody =
  | QuizRequestBodyAnswer
  | QuizRequestBodyIntialQuestion;

export interface UseFetchDataOptionsQuizRequest extends UseFetchDataOptions {
  method: "POST";
  body: QuizRequestBody;
}
// < --END-- >< ---------------- TYPES EXPOSED TO THE FRONTEND ---------------- >< --END-->
