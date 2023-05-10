import { UserStory } from "../../Data/ctx.userStory.types";

// DEMO: add state changes to the user story progress to emulate each state

export class DiverseStateUserStoryDecorator {
  private _userStories: UserStory[];
  constructor(userStories: UserStory[]) {
    this._userStories = userStories;
  }

  public generateDiverseStories(): UserStory[] {
    const [
      finishedStory, startedStoryWithEpilogueStarted, startedStoryWithEpilogueUnlocked, startedStory, unlockStory, lockedStory,
    ] = this._userStories;

    // story - locked:
    // ############################################################################################################################################################################################################################################################
    lockedStory.name += " - LOCKED";

    // story - unlocked with 1 block unlocked:
    // ############################################################################################################################################################################################################################################################
    unlockStory.timeUnlocked = new Date().getTime();
    unlockStory.buildingBlocksProgressItems[0].timeUnlocked =
      new Date().getTime();
    unlockStory.name += " - UNLOCKED - 1 block unlocked";

    // story - started with 1 block unlocked, 1 started, 1 completed:
    // ############################################################################################################################################################################################################################################################
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
    this.updateNumOfStuffForStory(startedStory);

    // story - started with all blocks completed, epilogue unlocked
    // ############################################################################################################################################################################################################################################################
    this.completeAllBlocks(startedStoryWithEpilogueUnlocked);
    // epilogue - unlocked:
    startedStoryWithEpilogueUnlocked.epilogueProgress.timeUnlocked =
      new Date().getTime();
    startedStoryWithEpilogueUnlocked.name +=
      " - STARTED #2 - all blocks completed, epilogue unlocked";
    this.updateNumOfStuffForStory(startedStoryWithEpilogueUnlocked);

    // story - started with all blocks completed:
    // ############################################################################################################################################################################################################################################################
    this.completeAllBlocks(startedStoryWithEpilogueStarted);

    // epilogue - started:
    startedStoryWithEpilogueStarted.epilogueProgress.timeUnlocked =
      new Date().getTime();
    startedStoryWithEpilogueStarted.epilogueProgress.timeSummaryCompleted =
      new Date().getTime();
    startedStoryWithEpilogueStarted.epilogueProgress.timeStarted =
      new Date().getTime();

    startedStoryWithEpilogueStarted.name +=
      " - STARTED #2 - all blocks completed";
    this.updateNumOfStuffForStory(startedStoryWithEpilogueStarted);

    // story - completed:
    // ############################################################################################################################################################################################################################################################
    this.completeAllBlocks(finishedStory);
    finishedStory.timeCompleted = new Date().getTime();

    finishedStory.numOfBlocksCompleted =
      finishedStory.buildingBlocksProgressItems.length;

    finishedStory.epilogueProgress.timeSummaryCompleted = new Date().getTime();
    finishedStory.epilogueProgress.timeUnlocked = new Date().getTime();
    finishedStory.epilogueProgress.timeStarted = new Date().getTime();
    finishedStory.epilogueProgress.timeCompleted = new Date().getTime();
    this.updateNumOfStuffForStory(finishedStory);
    finishedStory.name += " - COMPLETED";

    const stories = [
      finishedStory,
      startedStoryWithEpilogueStarted,
      startedStoryWithEpilogueUnlocked,
      startedStory,
      unlockStory,
      lockedStory,
    ];

    return stories;
  }

  private completeAllBlocks(userStory: UserStory) {
    userStory.timeUnlocked = new Date().getTime();
    userStory.timeStarted = new Date().getTime();
    // all blocks - completed:
    userStory.buildingBlocksProgressItems.forEach((bp) => {
      bp.timeUnlocked = new Date().getTime();
      bp.timeStarted = new Date().getTime();
      bp.timeSummaryCompleted = new Date().getTime();
      bp.timeCompleted = new Date().getTime();
    });
    userStory.numOfBlocksCompleted =
      userStory.buildingBlocksProgressItems.length;
  }

  private updateNumOfStuffForStory(userStory: UserStory) {
    userStory.numOfBlocksCompleted =
      userStory.buildingBlocksProgressItems.filter(
        (bp) => !!bp.timeCompleted
      ).length;
  }
}
