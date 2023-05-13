import { UserStory } from "../../Data/ctxTypes/ctx.userStory.types";
import { valuesOrdered } from "../../utils";

// DEMO: add state changes to the user story progress to emulate each state

export class DiverseStateUserStoryDecorator {
  private _userStories: UserStory[];
  constructor(userStories: UserStory[]) {
    this._userStories = userStories;
  }

  // TODO: make sure the dependencies between blocks hold when marking things completd/locked/started
  public generateDiverseStories(): UserStory[] {
    const [
      finishedStory,
      startedStoryWithEpilogueStarted,
      startedStoryWithEpilogueUnlocked,
      startedStory,
      unlockStory,
      lockedStory,
    ] = this._userStories;

    // story - locked:
    // ############################################################################################################################################################################################################################################################
    lockedStory.description = "Example: LOCKED story";

    // story - unlocked with 1 block unlocked:
    // ############################################################################################################################################################################################################################################################
    unlockStory.timeUnlocked = new Date().getTime();
    valuesOrdered(unlockStory.buildingBlocksProgressItems)[0].timeUnlocked =
      new Date().getTime();
    unlockStory.description = "Example: UNLOCKED - 1 block unlocked";

    // story - started with 1 block unlocked, 1 started, 1 completed:
    // ############################################################################################################################################################################################################################################################
    startedStory.timeUnlocked = new Date().getTime();
    startedStory.timeStarted = new Date().getTime();
    // block - unlocked:
    valuesOrdered(startedStory.buildingBlocksProgressItems)[2].timeUnlocked =
      new Date().getTime();
    // block - started:
    valuesOrdered(startedStory.buildingBlocksProgressItems)[1].timeUnlocked =
      new Date().getTime();
    valuesOrdered(startedStory.buildingBlocksProgressItems)[1].timeStarted =
      new Date().getTime();
    valuesOrdered(
      startedStory.buildingBlocksProgressItems
    )[1].timeSummaryCompleted = new Date().getTime();
    // block - completed:
    valuesOrdered(startedStory.buildingBlocksProgressItems)[0].timeUnlocked =
      new Date().getTime();
    valuesOrdered(startedStory.buildingBlocksProgressItems)[0].timeStarted =
      new Date().getTime();
    valuesOrdered(
      startedStory.buildingBlocksProgressItems
    )[2].timeSummaryCompleted = new Date().getTime();
    valuesOrdered(startedStory.buildingBlocksProgressItems)[2].timeCompleted =
      new Date().getTime();
    startedStory.description =
      "Example: STARTED #1 - 1 completed, 1 started, 1 block unlocked";
    this.updateNumOfStuffForStory(startedStory);

    // story - started with all blocks completed, epilogue unlocked
    // ############################################################################################################################################################################################################################################################
    this.completeAllBlocks(startedStoryWithEpilogueUnlocked);
    // epilogue - unlocked:
    startedStoryWithEpilogueUnlocked.epilogueProgress.timeUnlocked =
      new Date().getTime();
    startedStoryWithEpilogueUnlocked.description =
      "Example: STARTED #2 - all blocks completed, epilogue unlocked";
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

    startedStoryWithEpilogueStarted.description =
      "Example: STARTED #2 - all blocks completed";
    this.updateNumOfStuffForStory(startedStoryWithEpilogueStarted);

    // story - completed:
    // ############################################################################################################################################################################################################################################################
    this.completeAllBlocks(finishedStory);
    finishedStory.timeCompleted = new Date().getTime();

    finishedStory.numOfBlocksCompleted = valuesOrdered(
      finishedStory.buildingBlocksProgressItems
    ).length;

    finishedStory.epilogueProgress.timeSummaryCompleted = new Date().getTime();
    finishedStory.epilogueProgress.timeUnlocked = new Date().getTime();
    finishedStory.epilogueProgress.timeStarted = new Date().getTime();
    finishedStory.epilogueProgress.timeCompleted = new Date().getTime();
    this.updateNumOfStuffForStory(finishedStory);
    finishedStory.description = "Example: COMPLETED";

    const stories = [
      finishedStory,
      startedStoryWithEpilogueStarted,
      startedStoryWithEpilogueUnlocked,
      startedStory,
      unlockStory,
      lockedStory,
    ];

    stories.forEach((item, index) => {
      item.name += ` #${index + 1}`;
    });

    return stories;
  }

  private completeAllBlocks(userStory: UserStory) {
    userStory.timeUnlocked = new Date().getTime();
    userStory.timeStarted = new Date().getTime();
    // all blocks - completed:
    valuesOrdered(userStory.buildingBlocksProgressItems).forEach((bp) => {
      bp.timeUnlocked = new Date().getTime();
      bp.timeStarted = new Date().getTime();
      bp.timeSummaryCompleted = new Date().getTime();
      bp.timeCompleted = new Date().getTime();
    });
    userStory.numOfBlocksCompleted = valuesOrdered(
      userStory.buildingBlocksProgressItems
    ).length;
  }

  private updateNumOfStuffForStory(userStory: UserStory) {
    userStory.numOfBlocksCompleted = valuesOrdered(
      userStory.buildingBlocksProgressItems
    ).filter((bp) => !!bp.timeCompleted).length;
  }
}
