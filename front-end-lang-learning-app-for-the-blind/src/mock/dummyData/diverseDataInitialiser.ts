import {
  BuildingBlockProgress,
  EpilogueQuestionAnswer,
  UserStory,
} from "../../context";
import { dummyInitialUserStoryData } from "./storyData";

function completeAllBlocks(userStory: UserStory) {
  userStory.timeUnlocked = new Date().getTime();
  userStory.timeStarted = new Date().getTime();
  // all blocks - completed:
  userStory.buildingBlocksProgressItems.forEach((bp) => {
    bp.timeUnlocked = new Date().getTime();
    bp.timeStarted = new Date().getTime();
    bp.timeSummaryCompleted = new Date().getTime();
    bp.timeCompleted = new Date().getTime();
  });
  userStory.numOfBlocksCompleted = userStory.buildingBlocksProgressItems.length;
}

function updateNumOfStuffForStory(userStory: UserStory) {
  userStory.numOfBlocksCompleted = userStory.buildingBlocksProgressItems.filter(
    (bp) => !!bp.timeCompleted
  ).length;
}

export function generateDiverseStories(): [
  UserStory[],
  EpilogueQuestionAnswer[]
] {
  // story - locked:
  // ############################################################################################################################################################################################################################################################
  const [lockedStory, lockedStoryEpilogueAnswers] = dummyInitialUserStoryData();
  lockedStory.name += " - LOCKED";

  // story - unlocked with 1 block unlocked:
  // ############################################################################################################################################################################################################################################################
  const [unlockStory, unlockStoryEpilogueAnswers] = dummyInitialUserStoryData();
  unlockStory.timeUnlocked = new Date().getTime();
  unlockStory.buildingBlocksProgressItems[0].timeUnlocked =
    new Date().getTime();
  unlockStory.name += " - UNLOCKED - 1 block unlocked";

  // story - started with 1 block unlocked, 1 started, 1 completed:
  // ############################################################################################################################################################################################################################################################
  const [startedStory, startedStoryEpilogueAnswers] =
    dummyInitialUserStoryData();
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
  startedStory.buildingBlocksProgressItems[1].timeSummaryCompleted =
    new Date().getTime();
  // block - completed:
  startedStory.buildingBlocksProgressItems[2].timeUnlocked =
    new Date().getTime();
  startedStory.buildingBlocksProgressItems[2].timeStarted =
    new Date().getTime();
  startedStory.buildingBlocksProgressItems[2].timeSummaryCompleted =
    new Date().getTime();
  startedStory.buildingBlocksProgressItems[2].timeCompleted =
    new Date().getTime();
  startedStory.name +=
    " - STARTED #1 - 1 block unlocked, 1 started, 1 completed";
  updateNumOfStuffForStory(startedStory);

  // story - started with all blocks completed, epilogue unlocked
  // ############################################################################################################################################################################################################################################################
  const [
    startedStoryWithEpilogueUnlocked,
    startedStoryWithEpilogueUnlockedEpilogueAnswers,
  ] = dummyInitialUserStoryData();
  completeAllBlocks(startedStoryWithEpilogueUnlocked);

  //TODO: add summary states for epilogue

  // epilogue - unlocked:
  startedStoryWithEpilogueUnlocked.epilogueProgress.timeUnlocked =
    new Date().getTime();
  startedStoryWithEpilogueUnlocked.name +=
    " - STARTED #2 - all blocks completed, epilogue unlocked";
  updateNumOfStuffForStory(startedStoryWithEpilogueUnlocked);

  // story - started with all blocks completed:
  // ############################################################################################################################################################################################################################################################
  const [
    startedStoryWithEpilogueStarted,
    startedStoryWithEpilogueStartedEpilogueAnswers,
  ] = dummyInitialUserStoryData();
  completeAllBlocks(startedStoryWithEpilogueStarted);

  // epilogue - started:
  startedStoryWithEpilogueStarted.epilogueProgress.timeUnlocked =
    new Date().getTime();
  startedStoryWithEpilogueStarted.epilogueProgress.timeSummaryCompleted =
    new Date().getTime();
  startedStoryWithEpilogueStarted.epilogueProgress.timeStarted =
    new Date().getTime();

  startedStoryWithEpilogueStarted.name +=
    " - STARTED #2 - all blocks completed";
  updateNumOfStuffForStory(startedStoryWithEpilogueStarted);

  // story - completed:
  // ############################################################################################################################################################################################################################################################
  const [finishedStory, finishedStoryEpilogueAnswers] =
    dummyInitialUserStoryData();
  completeAllBlocks(finishedStory);
  finishedStory.timeCompleted = new Date().getTime();

  finishedStory.numOfBlocksCompleted =
    finishedStory.buildingBlocksProgressItems.length;

  finishedStory.epilogueProgress.timeSummaryCompleted = new Date().getTime();
  finishedStory.epilogueProgress.timeUnlocked = new Date().getTime();
  finishedStory.epilogueProgress.timeStarted = new Date().getTime();
  finishedStory.epilogueProgress.timeCompleted = new Date().getTime();
  updateNumOfStuffForStory(finishedStory);

  const stories = [
    finishedStory,
    startedStoryWithEpilogueStarted,
    startedStoryWithEpilogueUnlocked,
    startedStory,
    unlockStory,
    lockedStory,
  ];

  // ADD dependencies between stories
  finishedStory.dependentOnIds = [
    startedStoryWithEpilogueStarted.id,
    startedStoryWithEpilogueUnlocked.id,
    startedStory.id,
    unlockStory.id,
  ];
  startedStoryWithEpilogueStarted.dependentOnIds = [lockedStory.id];

  // GUARD IF ALL BLOCKS and stories ARE ACCESIBLE
  quardStoriesDependencyTree(stories);
  quardStoryBuildingBlocksDependencyTree(stories);

  // put together all epilogue answers
  const epilogueAnswers = [
    ...lockedStoryEpilogueAnswers,
    ...unlockStoryEpilogueAnswers,
    ...startedStoryEpilogueAnswers,
    ...startedStoryWithEpilogueUnlockedEpilogueAnswers,
    ...startedStoryWithEpilogueStartedEpilogueAnswers,
    ...finishedStoryEpilogueAnswers,
  ];

  return [stories, epilogueAnswers];
}

type ItemDependence = {
  id: number;
  dependentOnIds?: number[];
  timeUnlocked?: number;
  entity: UserStory | BuildingBlockProgress;
};

/**
 * make sure the dependencies between stories are forming a conex graph where every node is accessible
 * @param stories
 */
function quardStoriesDependencyTree(stories: UserStory[]) {
  console.log(`Checking if all stories are accessible.`);
  const storiesAdapted = stories.map(
    (story) =>
      ({
        id: story.id,
        dependentOnIds: story.dependentOnIds,
        timeUnlocked: story.timeUnlocked,
        entity: story,
      } as ItemDependence)
  );
  guardIfAllItemsAccesible(storiesAdapted);
}

/**
 * make sure the dependency between blocks forms a conex graph where every node is accessible
 * @param stories
 */
function quardStoryBuildingBlocksDependencyTree(stories: UserStory[]) {
  stories.forEach((story) => {
    if (!story.timeUnlocked) {
      console.log(
        `SKIPPED. Checking if blocks accessible for -locked- story ${story.name}`
      );
      return;
    }

    console.log(`Checking if blocks accessible for story ${story.name}`);
    const blocksAdapted = story.buildingBlocksProgressItems.map(
      (item) =>
        ({
          id: item.block.id,
          dependentOnIds: item.block.dependentOnIds,
          timeUnlocked: item.timeUnlocked,
          entity: item,
        } as ItemDependence)
    );
    guardIfAllItemsAccesible(blocksAdapted);
  });
}

/**
 * all items (blocks or stories) should be linked to each other
 * using BFS algorithm we're doing a search from starter nodes - which are the items unlocked from the begining
 * @param itemsTargeted
 */
function guardIfAllItemsAccesible(itemsTargeted: ItemDependence[]) {
  const queue = itemsTargeted.filter((item) => !!item.timeUnlocked);
  const visited = queue.map((i) => i.id);

  // create parent vector and assign root blooks (the one unblocked from the start)
  const accessible: {
    parent: "NONE" | "ROOT" | ItemDependence;
    childBp: ItemDependence;
  }[] = itemsTargeted.map((item) => ({ parent: "NONE", childBp: item }));
  queue.forEach((item) => {
    const accessItem = accessible.find((i) => i.childBp.id === item.id);
    if (accessItem) accessItem.parent = "ROOT";
  });

  let currentItem = queue.shift();
  while (currentItem) {
    const dependentIds = currentItem.dependentOnIds;
    if (!dependentIds) {
      currentItem = queue.shift();
      continue;
    }

    const dependentItems: ItemDependence[] = [];
    dependentIds.forEach((dependentId) => {
      const found = itemsTargeted.find((bp) => bp.id === dependentId);
      if (found) {
        dependentItems.push(found);
      }
    });

    dependentItems.forEach((dependentItem) => {
      if (!visited.some((id) => dependentItem.id === id)) {
        if (!currentItem)
          throw Error("Tagert item should not be null or undefined");

        visited.push(dependentItem.id);
        queue.push(dependentItem);

        // update parent
        const accessItem = accessible.find(
          (i) => i.childBp.id === dependentItem.id
        );
        if (accessItem) accessItem.parent = currentItem;
      }
    });

    currentItem = queue.shift();
  }
  const allAreAccesible = accessible.some(
    (accessItem) => accessItem.parent !== "NONE"
  );
  if (!allAreAccesible) {
    console.log(`Not all items are accesible`, {
      accessible,
      blockProgressItems: itemsTargeted,
    });
    throw Error(`Not all items are accesible`);
  }

  console.log(`All items are accesible`, {
    accessible,
    blockProgressItems: itemsTargeted,
  });
}
