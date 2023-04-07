import { EpilogueQuestionProgress } from "..";
import {
  BuildingBlockProgress,
  EpilogueProgress,
  UserStory,
  WordProgress,
} from "../ctxTypes";
import buildingBlocks from "./buidingBlocks";
import epilogue from "./epilogue";

let indexWordProgress = 1;
let indexBuildingBlockProgress = 1;
const generateBuildingProgress = () => {
  const progressBlocks = buildingBlocks.map((buildingBlock) => {
    const item: BuildingBlockProgress = {
      id: indexWordProgress++,
      locked: false,
      completed: false,
      block: buildingBlock,
      wordProgressItems: buildingBlock.words.map((wordItem) => {
        const wordProgress: WordProgress = {
          id: indexBuildingBlockProgress++,
          word: wordItem,
          score: 0,
        };
        return wordProgress;
      }),
    };
    return item;
  });

  return progressBlocks;
};

let questionProgressEpilogueIndex = 1;
const generateEpilogueProgress = () => {
  const epilogueProgress: EpilogueProgress = {
    id: 1,
    epilogue: epilogue,
    questionProgressItems: epilogue.questions.map((question) => {
      const questionProgress: EpilogueQuestionProgress = {
        id: questionProgressEpilogueIndex++,
        completed: false,
        question: question,
      };
      return questionProgress;
    }),
  };
  return epilogueProgress;
};

export const dummyStoryData: UserStory = {
  id: 1,
  name: "My family",
  storyDependentOnIds: [],
  buildingBlocksProgressItems: generateBuildingProgress(),
  epilogueProgress: generateEpilogueProgress(),
  numOfBlocksCompleted: 0,
  numOfTotalBlocks: buildingBlocks.length,
  numOfStoryQuestionsCompleted: 0,
  numOfTotalStoryQuestions: epilogue.questions.length,
};
