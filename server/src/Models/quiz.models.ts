import { QuizOption } from "../Data/ctxTypes/ctx.quiz.shared.types";
import {
  EpilogueProgress,
  BuildingBlockProgress,
  UserStory,
} from "../Data/ctxTypes/ctx.userStory.types";

// quiz question REQUEST
export type QuizRequestBody =
  | QuizRequestBodyAnswer
  | QuizRequestBodyIntialQuestion;
export type QuizRequestBodyIntialQuestion = {
  questionRequested: true;
};
export type QuizRequestBodyAnswer = {
  questionId: string;
  optionId: string;
};

// quiz question RESPONSE:
export type QuizResponse = QuizResponseNextQuestion | QuizResponseComplete;
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

// quiz completion -> state response
export type QuizBlockCompletedResponse = {
  epilogueProgressUnlocked?: EpilogueProgress;
  blockProgressUnlockedItems?: BuildingBlockProgress[];
  blockCompleted?: BuildingBlockProgress;
  blockCompletedStoryRefId: string;
  userStoriesUnlocked?: UserStory[];
};
