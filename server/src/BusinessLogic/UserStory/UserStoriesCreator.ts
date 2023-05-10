import Result from "../../ApiSupport/Result";
import { genId } from "../../Data/ContextFileBased/FileStorageContext";
import {
  BuildingBlock,
  EpilogueQuestionProgress,
  Story,
} from "../../Data/ctx.story.types";
import {
  BuildingBlockProgress,
  EpilogueProgress,
  UserStory,
  WordProgress,
} from "../../Data/ctx.userStory.types";
import { DiverseStateUserStoryDecorator } from "./DiverseStateUserStoryDecorator";

export class UserStoriesCreator {
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