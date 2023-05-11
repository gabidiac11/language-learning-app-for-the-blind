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
  idWordProgress: string;
  wordProgress?: WordProgress;
  outcomes: RoundOutcome[];
};

export type IdLinkEntity<T> = {
  idEntity: string;
  entity: T;
};

export type QuizQuestion = {
  id: string;
  text: string;
  correctOptionId: string;
  options: QuizOption[];
};

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
  blockProgressId: string;
  wordOutcomes: WordOutcome[];
  timeCompleted?: number;
};

export type QuizOption = {
  // this id is mapped to a word id - to avoid exposing the correct option
  id: string;
  text: string;
};

export type BlockQuizStates = {
  // Obs: since a progress block to user is one-to-one relationship -> user is traceable
  progressBlockId: string;
  // if one of the quiz states is completed -> the block is completed
  // if the user wants to redu a building block he can do so, but won't modify the block progress, but actually continue the last uncompleted quiz state or start a new one
  quizStates: QuizBlockState[];
};

//< --START-- >< ---------------- TYPES EPILOGUE ---------------- >< --START-->
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
}

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
}
// < --END-- >< ---------------- TYPES EXPOSED TO THE FRONTEND ---------------- >< --END-->
