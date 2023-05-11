//< --START-- >< ---------------- TYPES EXPOSED TO THE FRONTEND ---------------- >< --START-->

import { QuizOption } from "../Data/ctx.quiz.types";
import { EpilogueProgress, BuildingBlockProgress, UserStory } from "../Data/ctx.userStory.types";

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

export type QuizBlockCompletedResponse = {
  epilogueProgressUnlocked?: EpilogueProgress;
  blockProgressUnlockedItems?: BuildingBlockProgress[];
  blockCompleted?: BuildingBlockProgress;
  blockCompletedStoryRefId: string;
  userStoriesUnlocked?: UserStory[];
};
// < --END-- >< ---------------- TYPES EXPOSED TO THE FRONTEND ---------------- >< --END-->
