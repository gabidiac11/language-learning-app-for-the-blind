export type StateType = {
  language: string;
  userStories: UserStory[];
};

export enum StateActionType {
  Init,
  SetLanguage,
}

export type StateAction =
  | {
      type: StateActionType.Init;
    }
  | {
      type: StateActionType.SetLanguage;
      payload: string;
    };

export type UserStory = {
  id: string;

  // the name is a domain; it describes a big ontology which comprises smaller ontologies
  // each building block of a story is a smaller ontology which is related to the big ontology of the story
  // Obs: each building block (as you will see by reading further) has bunch of words in Russian related with the building-block's associated ontology
  name: string;

  description?: string;

  imageUrl: string;

  // a user can start a story if the stories dependent on are completed; otherwise it is locked
  dependentOnIds: string[];

  buildingBlocksProgressItems: BuildingBlockProgress[];
  epilogueProgress: EpilogueProgress;
  numOfBlocksCompleted: number;
  numOfTotalBlocks: number;

  timeUnlocked?: number;
  timeStarted?: number;
  timeCompleted?: number;
};

//building block:
export type BuildingBlockProgress = {
  id: string;

  isStarter?: boolean;

  // a building block is completed if a quiz state associated is completed
  timeUnlocked?: number;
  timeStarted?: number;
  timeCompleted?: number;

  timeSummaryCompleted?: number;

  wordProgressItems: WordProgress[];
  block: BuildingBlock;
};

export type WordProgress = {
  id: string;
  word: Word;
};

export type BuildingBlock = {
  id: string;
  name: string;
  imageUrl: string;

  // blockDependentOnIds have all ids of the blocks from current story that need to be completed for this block to be available for the user to start
  dependentOnIds?: string[];

  // the words needs to be part of the ontology associated with the building block
  // the words are in Russian
  words: Word[];
};

export type Word = {
  id: string;

  // the text is the actual word in Russian
  text: string;

  // short translation is in English and has at least 1, and at most 1 to 3 words between comma
  shortTranslation: string;

  // long translation is in English and has a detailed explanation with some examples of usage
  longTranslation: string;
};

// epilogue:
export type Epilogue = {
  id: string;

  // the name of the story tale; short and descriptive - needs to be a word from the building blocks completed from the current and the previous stories
  name: string;

  // a short story tale that have only words from the current blocks; each block has a set of words grouped by ontology
  // this short story must use only the words from the building blocks belonging to this story and the stories completed to far
  // so if a story is dependent on a list of stories which I'll name "L". This story tale should be formed with words from the words associated with all the stories previously completed
  // L - has all the stories that the current story is dependent on
  // Attention: it needs to make sure to include almost all the words from the current story, and prefere those words
  textStoryTale: string;

  // the questions asked are about what is happening in the story tale
  questions: EpilogueQuestion[];
};

export type EpilogueProgress = {
  id: string;
  epilogue: Epilogue;
  questionProgressItems: EpilogueQuestionProgress[];
  timeSummaryCompleted?: number;
  timeUnlocked?: number;
  timeStarted?: number;
  timeCompleted?: number;
};

export type EpilogueQuestionProgress = {
  id: string;
  question: EpilogueQuestion;
};

export type EpilogueQuestion = {
  id: string;

  // the questions are asked in English and the options are in English
  // the questions asked are about what is happening in the story tale
  text: string;
  options: EpilogueOption[];
};

export type EpilogueQuestionAnswer = {
  id: string;
  questionId: string;
  correctOptionId: string;
};

export type EpilogueOption = {
  id: string;
  text: string;
};