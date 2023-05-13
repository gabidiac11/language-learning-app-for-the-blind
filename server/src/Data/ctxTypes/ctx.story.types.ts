export type Story = {
  id: string;

  order: number;

  // the name is a domain; it describes a big ontology which comprises smaller ontologies
  // each building block of a story is a smaller ontology which is related to the big ontology of the story
  // Obs: each building block (as you will see by reading further) has bunch of words in Russian related with the building-block's associated ontology
  name: string;

  imageUrl: string;

  // ids of the stories which will be unlocked when current story is completed
  dependentOnIds: string[]; 
  isStarter?: boolean;

  buildingBlocks: BuildingBlock[];
  epilogue: Epilogue;
  epilogueQuestionAnswers: EpilogueQuestionAnswer[];
};

//building block:
export type BuildingBlock = {
  id: string;

  name: string;
  imageUrl: string;

  // ids of the BLOCKS which will be unlocked when current BLOCK is completed
  dependentOnIds?: string[];

  // means it will be unlock first when a story is unlocked
  isStarter?: boolean;

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
