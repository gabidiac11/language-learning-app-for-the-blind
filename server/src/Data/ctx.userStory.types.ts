import {
  BuildingBlock,
  Epilogue,
  EpilogueQuestionProgress,
  Word,
} from "./ctx.story.types";
/**
 * these are types related the progress of the a lesson-story
 */

export type UserStory = {
  id: number;

  // the name is a domain; it describes a big ontology which comprises smaller ontologies
  // each building block of a story is a smaller ontology which is related to the big ontology of the story
  // Obs: each building block (as you will see by reading further) has bunch of words in Russian related with the building-block's associated ontology
  name: string;

  imageUrl: string;
  storyId: number;

  // a user can start a story if the stories dependent on are completed; otherwise it is locked
  dependentOnIds: number[];

  buildingBlocksProgressItems: BuildingBlockProgress[];
  epilogueProgress: EpilogueProgress;

  numOfBlocksCompleted: number;
  numOfTotalBlocks: number;

  timeUnlocked?: number;
  timeStarted?: number;
  timeCompleted?: number;
};

// building block progress ------------------------------------------------------------------------------------------------------------------------------------
export type BuildingBlockProgress = {
  id: number;

  blockId: number;
  block?: BuildingBlock;

  wordProgressItems: WordProgress[];

  // means it will be unlock first when a story is unlocked
  isStarter: boolean;

  // a building block is completed if a quiz state associated is completed
  timeUnlocked?: number;
  timeStarted?: number;
  timeCompleted?: number;
  timeSummaryCompleted?: number;
};

export type WordProgress = {
  id: number;

  wordId: number;
  word?: Word;
};

// epilogue pogress ------------------------------------------------------------------------------------------------------------------------------------
export type EpilogueProgress = {
  id: number;

  epilogueId: number;
  epilogue?: Epilogue;

  questionProgressItems: EpilogueQuestionProgress[];

  timeSummaryCompleted?: number;
  timeUnlocked?: number;
  timeStarted?: number;
  timeCompleted?: number;
};