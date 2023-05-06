import Result from "../../Controllers/Result";
import { genId } from "../ContextFileBased/FileStorageContext";
import {
  BuildingBlock,
  EpilogueQuestionAnswer,
  EpilogueQuestionProgress,
  Story,
} from "../ctx.story.types";
import {
  BuildingBlockProgress,
  EpilogueProgress,
  UserStory,
  WordProgress,
} from "../ctx.userStory.types";
import { Database } from "../database";

export class LessonStoryToUserStoryConvertor {
  public async createUserStories(
    lessonStories: Story[]
  ): Promise<Result<UserStory[]>> {
    const userStories: UserStory[] = [];
    for (let lessonStory of lessonStories) {
      const convertor = new LessonToUserStoryConvertor(lessonStory);
      const userStoryItem = await convertor.GetCookedUserStory();
      userStories.push(userStoryItem);
    }

    // TODO: add conditions for this
    // DEMO: add state changes to the user story progress to emulate each state
    const decorator = new DiverseStateUserStoryDecorator(userStories);
    const userStoriesWithDiverseProgress = decorator.generateDiverseStories();

    return Result.Success(userStoriesWithDiverseProgress);
  }
}

class LessonToUserStoryConvertor {
  private _lessonStory: Story;

  public userStory: UserStory;

  public constructor(lessonStory: Story) {
    this._lessonStory = lessonStory;
  }

  public async GetCookedUserStory() {
    const buildingBlocksProgressItems = await this.generateBuildingProgress();
    const epilogueProgress = await this.generateEpilogueProgress();

    const userStory: UserStory = {
      id: await genId(),
      storyId: this._lessonStory.id,

      name: this._lessonStory.name,
      imageUrl: this._lessonStory.imageUrl,

      dependentOnIds: this._lessonStory.dependentOnIds,

      buildingBlocksProgressItems,

      epilogueProgress,

      numOfBlocksCompleted: 0,
      numOfTotalBlocks: buildingBlocksProgressItems.length,
    };
    return userStory;
  }
  async generateBuildingProgress(): Promise<BuildingBlockProgress[]> {
    const blockProgressItems: BuildingBlockProgress[] = [];
    for (let buildingBlock of this._lessonStory.buildingBlocks) {
      const wordProgressItems: WordProgress[] =
        await this.generateWordProgressItems(buildingBlock);
      const item: BuildingBlockProgress = {
        id: await genId(),
        blockId: buildingBlock.id,
        isStarter: buildingBlock.isStarter,
        wordProgressItems,
      };
      blockProgressItems.push(item);
    }
    return blockProgressItems;
  }
  async generateWordProgressItems(
    buildingBlock: BuildingBlock
  ): Promise<WordProgress[]> {
    const wordProgressItems: WordProgress[] = [];
    for (const word of buildingBlock.words) {
      const wordProgress: WordProgress = {
        id: await genId(),
        wordId: word.id,
      };
      wordProgressItems.push(wordProgress);
    }
    return wordProgressItems;
  }
  async generateEpilogueProgress(): Promise<EpilogueProgress> {
    const questionProgressItems: EpilogueQuestionProgress[] = [];
    for (let question of this._lessonStory.epilogue.questions) {
      questionProgressItems.push({
        id: await genId(),
        questionId: question.id,
      });
    }
    const epilogueProgress: EpilogueProgress = {
      id: await genId(),
      epilogueId: this._lessonStory.epilogue.id,
      questionProgressItems,
    };
    return epilogueProgress;
  }
}

// DEMO: add state changes to the user story progress to emulate each state
export class DiverseStateUserStoryDecorator {
  private _userStories: UserStory[];
  constructor(userStories: UserStory[]) {
    this._userStories = userStories;
  }

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

    //TODO: add summary states for epilogue

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
    finishedStory.timeCompleted = new Date().getTime();

    finishedStory.numOfBlocksCompleted =
      finishedStory.buildingBlocksProgressItems.length;

    finishedStory.epilogueProgress.timeSummaryCompleted = new Date().getTime();
    finishedStory.epilogueProgress.timeUnlocked = new Date().getTime();
    finishedStory.epilogueProgress.timeStarted = new Date().getTime();
    finishedStory.epilogueProgress.timeCompleted = new Date().getTime();
    this.updateNumOfStuffForStory(finishedStory);

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
