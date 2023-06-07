import { AppMessage } from "../../accessibility/accesibilityTypes";
import { UseFetchDataOptions } from "../../api/useFetchData";
import {
  BuildingBlockProgress,
  EpilogueProgress,
  Language,
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

export type QuizResponse = {
  questionText: string;
  questionId: string;
  options: QuizOption[];

  lang: Language;

  // id to the correct answer from previous question
  previouslyQuestion_CorrectOptionId?: string;
  
  quizCompleted?: boolean;
  quizId?: string;
  
  playableApiMessages: AppMessage[]
  previousQuestionOutcomePlaybaleMessages: AppMessage[];
};

// quiz REQUEST
export type QuizRequestBody = {
  questionId: string;
  optionId: string;
};

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
  playableApiMessages: AppMessage[];
};
