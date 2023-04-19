import { EpilogueQuestionProgress } from "../../context";
import {
  BuildingBlockProgress,
  EpilogueProgress,
  UserStory,
  WordProgress,
} from "../../context/ctxTypes";
import { genId } from "../mockUtils";
import buildingBlocks from "./buidingBlocks";
import epilogue from "./epilogue";

const generateBuildingProgress = () => {
  const progressBlocks = buildingBlocks().map((buildingBlock) => {
    const item: BuildingBlockProgress = {
      id: genId(),
      locked: false,
      timeUnlocked: new Date().getTime(),

      block: buildingBlock,
      wordProgressItems: buildingBlock.words.map((wordItem) => {
        const wordProgress: WordProgress = {
          id: genId(),
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

const generateEpilogueProgress = () => {
  const epilogueProgress: EpilogueProgress = {
    id: 1,
    epilogue: epilogue(),
    questionProgressItems: epilogue().questions.map((question) => {
      const questionProgress: EpilogueQuestionProgress = {
        id: genId(),
        completed: false,
        question: question,
      };
      return questionProgress;
    }),
  };
  return epilogueProgress;
};

export const dummyStoryData = (): UserStory => ({
  id: 1,
  name: "My family",
  imageUrl:
    "https://images.pexels.com/photos/3807395/pexels-photo-3807395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  storyDependentOnIds: [],
  buildingBlocksProgressItems: generateBuildingProgress(),
  epilogueProgress: generateEpilogueProgress(),
  numOfBlocksCompleted: 0,
  numOfTotalBlocks: buildingBlocks().length,
  numOfStoryQuestionsCompleted: 0,
  numOfTotalStoryQuestions: epilogue().questions.length,
});
