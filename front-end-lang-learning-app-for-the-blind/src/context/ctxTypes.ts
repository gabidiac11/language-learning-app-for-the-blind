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
      payload: StateType;
    }
  | {
      type: StateActionType.SetLanguage;
      payload: string;
    };

export type UserStory = {
  id: number;
  
  // the name is a domain; it describes a big ontology which comprises smaller ontologies
  // each building block of a story is a smaller ontology which is related to the big ontology of the story
  // Obs: each building block (as you will see by reading further) has bunch of words in Russian related with the building-block's associated ontology
  name: string;
  
  // a user can start a story if the stories dependent on are completed; otherwise it is locked
  locked: boolean;
  storyDependentOnIds: number[];

  buildingBlocksProgressItems: BuildingBlockProgress[];
  epilogueProgress: EpilogueProgress;
  numOfBlocksCompleted: number;
  numOfTotalBlocks: number;
  numOfStoryQuestionsCompleted: number;
  numOfTotalStoryQuestions: number;
};

//building block:
export type BuildingBlockProgress = {
  id: number;
  
  // a building block is locked if the blocks dependent on are not completed;
  locked: boolean;
  
  // a building block is completed if all wordProgressItems are have score equal to 100
  completed: boolean;
  block: BuilingBlock;
  wordProgressItems: WordProgress[];
};

export type WordProgress = {
  id: number;
  word: Word;
  
  //from 0 to 100:
  score: number;
};

export type BuilingBlock = {
  id: number;
  name: string;
  
  // blockDependentOnIds have all ids of the blocks from current story that need to be completed for this block to be available for the user to start
  blockDependentOnIds: number[];
  
  // the words needs to be part of the ontology associated with the building block
  // the words are in Russian
  words: Word[];
};

export type Word = {
  id: number;
  
  // the text is the actual word in Russian
  text: string;
  
  // short translation is in English and has at least 1, and at most 1 to 3 words between comma
  shortTranslation: string;
  
  // long translation is in English and has a detailed explanation with some examples of usage
  longTranslation: string;
};

// epilogue:
export type Epilogue = {
  id: number;

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

  completed: boolean;
};

export type EpilogueProgress = {
  epilogue: Epilogue;
  completed: boolean;
  questionProgressItems: EpilogueQuestionProgress[]
  locked: boolean;
};

export type EpilogueQuestionProgress = {
  id: number;
  question: EpilogueQuestion;
  completed: boolean;
}

export type EpilogueQuestion = {
  id: number;

  // the questions are asked in English and the options are in English
  // the questions asked are about what is happening in the story tale
  text: string;
  
  options: string[];
  correctOption: string;
};