import { UseFetchDataOptions } from "../../api/useFetchData";
import {
  BuildingBlockProgress,
  EpilogueProgress,
  UserStory,
} from "./ctxTypes";

// QUIZ
export enum RoundOutcome {
  Hit,
  Miss,
  Unset,
  Excluded,
}

export type QuizOption = {
  // this id is mapped to a word id - to avoid exposing the correct option
  id: string;
  text: string;
};

//< --START-- >< ---------------- TYPES EXPOSED TO THE FRONTEND ---------------- >< --START-->

export type QuizResponseNextQuestion = {
  questionText: string;
  questionId: string;
  options: QuizOption[];

  // id to the correct answer from previous question
  previouslyQuestion_CorrectOptionId?: string;
};
export type QuizResponseComplete = {
  quizCompleted: boolean;
  quizId: string;
  previouslyQuestion_CorrectOptionId?: string;
};
export type QuizResponse = QuizResponseNextQuestion | QuizResponseComplete;

// quiz REQUEST
export type QuizRequestBodyAnswer = {
  questionId: string;
  optionId: string;
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

export type QuizBlockCompletedResponse = {
  epilogueProgressUnlocked?: EpilogueProgress;
  blockProgressUnlockedItems?: BuildingBlockProgress[];
  blockCompleted?: BuildingBlockProgress;
  blockCompletedStoryRefId: string;
  userStoriesUnlocked?: UserStory[];
};
