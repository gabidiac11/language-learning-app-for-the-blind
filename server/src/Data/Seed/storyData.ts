// import {
//   BuildingBlockProgress,
//   EpilogueProgress,
//   EpilogueQuestionAnswer,
//   EpilogueQuestionProgress,
//   UserStory,
//   WordProgress,
// } from "../ctx.story.types";
// import { genId } from "../ContextFileBased/FileStorageContext";
// import generateBuildingBlocks from "./dummy-lesson-story/buidingBlocks";
// import genEpilogue from "./epilogue";

// const generateBuildingProgress = async (): Promise<BuildingBlockProgress[]> => {
//   const [blocks, starterIds] = await generateBuildingBlocks();

//   const progressBlocks: BuildingBlockProgress[] = [];
//   for (let buildingBlock of blocks) {
//     // generate word progress:
//     const wordProgressItems: WordProgress[] = [];
//     for (let wordItem of buildingBlock.words) {
//       const wordProgress: WordProgress = {
//         id: await genId(),
//         word: wordItem,
//       };
//       wordProgressItems.push(wordProgress);
//     }
//     // generate building block progress:
//     const item: BuildingBlockProgress = {
//       id: await genId(),
//       block: buildingBlock,
//       isStarter: starterIds.some((id) => id === buildingBlock.id),
//       wordProgressItems,
//     };
//     progressBlocks.push(item);
//   }

//   return progressBlocks;
// };

// const generateEpilogueProgress = async (): Promise<
//   [EpilogueProgress, EpilogueQuestionAnswer[]]
// > => {
//   const [epilogue, epilogueQuestionAnswers] = await genEpilogue();

//   const questionProgressItems: EpilogueQuestionProgress[] = [];
//   for (let question of epilogue.questions) {
//     const questionProgress: EpilogueQuestionProgress = {
//       id: await genId(),
//       question: question,
//     };
//     questionProgressItems.push(questionProgress);
//   }

//   const epilogueProgress: EpilogueProgress = {
//     id: await genId(),
//     epilogue: epilogue,
//     questionProgressItems,
//   };
//   return [epilogueProgress, epilogueQuestionAnswers];
// };

// export const dummyInitialUserStoryData = async (): Promise<
//   [UserStory, EpilogueQuestionAnswer[]]
// > => {
//   const buildingBlocksProgressItems = await generateBuildingProgress();
//   const [epilogueProgress, epilogueQuestionAnswers] =
//     await generateEpilogueProgress();

//   const story: UserStory = {
//     id: await genId(),
//     name: "My family",
//     //TODO: add license info for all the free images - maybe use storage somewhere or see if is cool to reference them like this
//     imageUrl:
//       "https://images.pexels.com/photos/3807395/pexels-photo-3807395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     dependentOnIds: [],
//     buildingBlocksProgressItems,
//     epilogueProgress,
//     numOfBlocksCompleted: 0,
//     numOfTotalBlocks: buildingBlocksProgressItems.length,
//   };
//   return [story, epilogueQuestionAnswers];
// };
