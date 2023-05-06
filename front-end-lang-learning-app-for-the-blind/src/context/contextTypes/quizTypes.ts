import { UseFetchDataOptions } from "../../api/useFetchData";
import { BuildingBlockProgress, EpilogueProgress, UserStory, WordProgress } from "./ctxTypes";

// TODO: delete what is not used by the frontend

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

export type QuizBlockState = {
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
  quizStates: QuizBlockState[];
};

//< --START-- >< ---------------- TYPES EPILOGUE ---------------- >< --START-->
export type EpilogueQuestionOutcome = {
  id: number;
  outcome: RoundOutcome;
  idQuestionProgress: number;
  question?: QuizQuestion;
  // intended for tracing - not usage
  wordTxt: string;
  prababilityInclusion: number;
};

export type QuizEpilogueState = {
  id: number;
  epilogueProgressId: number;
  outcomes: EpilogueQuestionOutcome[];
  timeCompleted?: number;
};

export type EpilogueQuizStates = {
    progressBlockId: number;
    // if one of the quiz states is completed -> the epilogue is completed
    // if the user wants to redu a EPILOGUE he can do so, but won't modify the progress, but actually continue the last uncompleted quiz state or start a new one
    quizStates: QuizEpilogueState[];
}

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
  quizId: number;
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

export type QuizBlockCompletedResponse = {
  epilogueProgressUnlocked?: EpilogueProgress;
  blockProgressUnlockedItems?: BuildingBlockProgress[];
  blockCompleted?: BuildingBlockProgress;
  blockCompletedStoryRefId: number;
  userStoriesUnlocked?: UserStory[];
}
// < --END-- >< ---------------- TYPES EXPOSED TO THE FRONTEND ---------------- >< --END-->
