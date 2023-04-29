import { EpilogueQuestionProgress } from "../../context";
import {
  BuildingBlockProgress,
  EpilogueProgress,
  UserStory,
  WordProgress,
} from "../../context/contextTypes/ctxTypes";
import { genId } from "../mockContext";
import buildingBlocks from "./buidingBlocks";
import epilogue from "./epilogue";

const generateBuildingProgress = () => {
  const progressBlocks = buildingBlocks().map((buildingBlock) => {
    const item: BuildingBlockProgress = {
      id: genId(),
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
    id: genId(),
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

export const dummyInitialUserStoryData = (): UserStory => {
  const buildingBlocksProgressItems = generateBuildingProgress();
  const epilogueProgress = generateEpilogueProgress();

  const story:UserStory = {
    id: genId(),
    name: "My family",
    //TODO: add license info for all the free images - maybe use storage somewhere or see if is cool to reference them like this
    imageUrl:
      "https://images.pexels.com/photos/3807395/pexels-photo-3807395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    dependentOnIds: [],
    buildingBlocksProgressItems,
    epilogueProgress,
    numOfBlocksCompleted: 0,
    numOfTotalBlocks: buildingBlocksProgressItems.length,
    numOfStoryQuestionsCompleted: 0,
    numOfTotalStoryQuestions: epilogueProgress.questionProgressItems.length,
  }
  return story;
};
