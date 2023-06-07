import { ApiMessage } from "../ApiSupport/appErrorMessage";
import { QuizOption, QuizOptionFrontend } from "../Data/ctxTypes/ctx.quiz.shared.types";
import { Language } from "../Data/ctxTypes/ctx.story.types";
import {
  EpilogueProgress,
  BuildingBlockProgress,
} from "../Data/ctxTypes/ctx.userStory.types";
import { UserStoryOutput } from "./output.userStory.types";

// quiz question REQUEST
export type QuizRequestBody = {
  questionId: string;
  optionId: string;
};

// quiz question RESPONSE:
export type QuizResponse = {
  questionText: string;
  questionId: string;
  options: QuizOptionFrontend[];

  playableApiMessages: ApiMessage[];

  // id to the correct answer from previous question
  previouslyQuestion_CorrectOptionId?: string;

  previousQuestionOutcomePlaybaleMessages: ApiMessage[];
  
  quizCompleted?: boolean;
  quizId?: string;

  lang: Language;
};

// quiz completion -> state response
export type QuizBlockCompletedStatsResponse = {
  epilogueProgressUnlocked?: EpilogueProgress;
  blockProgressUnlockedItems?: BuildingBlockProgress[];
  blockCompleted?: BuildingBlockProgress;
  blockCompletedStoryRefId: string;
  playableApiMessages: ApiMessage[];
};

export type QuizCompletedStatsResponse = {
  epilogueProgressUnlocked?: EpilogueProgress;
  blockProgressUnlockedItems?: BuildingBlockProgress[];
  blockCompleted?: BuildingBlockProgress;
  blockCompletedStoryRefId: string;
  userStoriesUnlocked?: UserStoryOutput[];
  playableApiMessages: ApiMessage[];
};
