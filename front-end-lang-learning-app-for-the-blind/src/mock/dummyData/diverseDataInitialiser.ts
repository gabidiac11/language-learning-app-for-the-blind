import { UserStory } from "../../context";
import { dummyInitialUserStoryData } from "./storyData";

function completeAllBlocks(userStory: UserStory) {
  userStory.timeUnlocked = new Date().getTime();
  userStory.timeStarted = new Date().getTime();
  // all blocks - completed:
  userStory.buildingBlocksProgressItems.forEach((bp) => {
    bp.timeUnlocked = new Date().getTime();
    bp.timeStarted = new Date().getTime();
    bp.timeCompleted = new Date().getTime();
    bp.wordProgressItems.forEach((wordProgress) => {
      wordProgress.score = 100;
    });
  });
  userStory.numOfBlocksCompleted = userStory.buildingBlocksProgressItems.length;
}

function updateNumOfStuffForStory(userStory: UserStory) {
  userStory.numOfBlocksCompleted = userStory.buildingBlocksProgressItems.filter(
    (bp) => bp.wordProgressItems.every((wp) => wp.score == 100)
  ).length;

  userStory.numOfStoryQuestionsCompleted =
    userStory.epilogueProgress.questionProgressItems.filter(
      (qp) => qp.completed
    ).length;
}

export function generateDiverseStories() {
  // story - locked:
  // ############################################################################################################################################################################################################################################################
  const lockedStory = dummyInitialUserStoryData();
  lockedStory.name += " - LOCKED";

  // story - unlocked with 1 block unlocked:
  // ############################################################################################################################################################################################################################################################
  const unlockStory = dummyInitialUserStoryData();
  unlockStory.timeUnlocked = new Date().getTime();
  unlockStory.buildingBlocksProgressItems[0].timeUnlocked =
    new Date().getTime();
  unlockStory.name += " - UNLOCKED - 1 block unlocked";

  // story - started with 1 block unlocked, 1 started, 1 completed:
  // ############################################################################################################################################################################################################################################################
  const startedStory = dummyInitialUserStoryData();
  startedStory.timeUnlocked = new Date().getTime();
  startedStory.timeStarted = new Date().getTime();
  // block - unlocked:
  startedStory.buildingBlocksProgressItems[0].timeUnlocked =
    new Date().getTime();
  // block - started:
  startedStory.buildingBlocksProgressItems[1].timeUnlocked =
    new Date().getTime();
  startedStory.buildingBlocksProgressItems[1].timeStarted =
    new Date().getTime();
  startedStory.buildingBlocksProgressItems[1].wordProgressItems[0].score = 50;
  // block - completed:
  startedStory.buildingBlocksProgressItems[2].timeUnlocked =
    new Date().getTime();
  startedStory.buildingBlocksProgressItems[2].timeStarted =
    new Date().getTime();
  startedStory.buildingBlocksProgressItems[2].timeCompleted =
    new Date().getTime();
  startedStory.buildingBlocksProgressItems[2].wordProgressItems.forEach(
    (wordProgress) => {
      wordProgress.score = 100;
    }
  );
  startedStory.name +=
    " - STARTED #1 - 1 block unlocked, 1 started, 1 completed";
  updateNumOfStuffForStory(startedStory);

  // story - started with all blocks completed, epilogue unlocked
  // ############################################################################################################################################################################################################################################################
  const startedStoryWithEpilogueUnlocked = dummyInitialUserStoryData();
  completeAllBlocks(startedStoryWithEpilogueUnlocked);

  // epilogue - unlocked:
  startedStoryWithEpilogueUnlocked.epilogueProgress.timeUnlocked =
    new Date().getTime();
  startedStoryWithEpilogueUnlocked.name +=
    " - STARTED #2 - all blocks completed, epilogue unlocked";
  updateNumOfStuffForStory(startedStoryWithEpilogueUnlocked);

  // story - started with all blocks completed, 1 epilogue question completed:
  // ############################################################################################################################################################################################################################################################
  const startedStoryWithEpilogueStarted = dummyInitialUserStoryData();
  completeAllBlocks(startedStoryWithEpilogueStarted);

  // epilogue - started:
  startedStoryWithEpilogueStarted.epilogueProgress.timeUnlocked =
    new Date().getTime();
  startedStoryWithEpilogueStarted.epilogueProgress.timeStarted =
    new Date().getTime();
  startedStoryWithEpilogueStarted.epilogueProgress.questionProgressItems[0].completed =
    true;

  startedStoryWithEpilogueStarted.numOfStoryQuestionsCompleted = 1;
  startedStoryWithEpilogueStarted.name +=
    " - STARTED #2 - all blocks completed, 1 epilogue question completed";
  updateNumOfStuffForStory(startedStoryWithEpilogueStarted);

  // story - completed:
  // ############################################################################################################################################################################################################################################################
  const finishedStory = dummyInitialUserStoryData();
  completeAllBlocks(finishedStory);
  finishedStory.timeCompleted = new Date().getTime();

  finishedStory.numOfBlocksCompleted =
    finishedStory.buildingBlocksProgressItems.length;
  finishedStory.numOfStoryQuestionsCompleted =
    finishedStory.epilogueProgress.questionProgressItems.length;

  finishedStory.epilogueProgress.timeUnlocked = new Date().getTime();
  finishedStory.epilogueProgress.timeStarted = new Date().getTime();
  finishedStory.epilogueProgress.timeCompleted = new Date().getTime();
  finishedStory.epilogueProgress.questionProgressItems.forEach((q) => {
    q.completed = true;
  });
  updateNumOfStuffForStory(finishedStory);

  return [
    lockedStory,
    unlockStory,
    startedStory,
    startedStoryWithEpilogueUnlocked,
    startedStoryWithEpilogueStarted,
    finishedStory,
  ];
}
