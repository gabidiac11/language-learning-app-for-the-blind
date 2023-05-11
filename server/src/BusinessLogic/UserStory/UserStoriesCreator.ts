import Result from "../../ApiSupport/Result";
import {
  BuildingBlock,
  Story,
} from "../../Data/ctx.story.types";
import {
  BuildingBlockProgress,
  EpilogueProgress,
  EpilogueQuestionProgress,
  UserStory,
  WordProgress,
} from "../../Data/ctx.userStory.types";
import { arrayToObjectIds, genUid } from "../../utils";
import { DiverseStateUserStoryDecorator } from "./DiverseStateUserStoryDecorator";

export class UserStoriesCreator {
  public async createUserStories(
    lessonStories: Story[]
  ): Promise<Result<UserStory[]>> {
    const userStories: UserStory[] = [];
    for (let lessonStory of lessonStories) {
      const convertor = new LessonToUserStoryConvertor(lessonStory);
      const userStoryItem = await convertor.GetCookedUserStory();
      userStoryItem.order = userStories.length;
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
    const userStoryId = genUid();
    const buildingBlocksProgressItems = await this.generateBuildingProgress(
      userStoryId
    );
    const epilogueProgress = await this.generateEpilogueProgress(userStoryId);

    const userStory: UserStory = {
      id: userStoryId,
      order: 0,
      storyId: this._lessonStory.id,

      description: null,

      name: this._lessonStory.name,
      imageUrl: this._lessonStory.imageUrl,

      dependentOnIds: this._lessonStory.dependentOnIds,

      buildingBlocksProgressItems: arrayToObjectIds<BuildingBlockProgress>(
        buildingBlocksProgressItems
      ),

      epilogueProgress,

      numOfBlocksCompleted: 0,
      numOfTotalBlocks: buildingBlocksProgressItems.length,
    };
    return userStory;
  }
  async generateBuildingProgress(
    userStoryId: string
  ): Promise<BuildingBlockProgress[]> {
    const blockProgressItems: BuildingBlockProgress[] = [];
    for (let buildingBlock of this._lessonStory.buildingBlocks) {
      const wordProgressItems: WordProgress[] =
        await this.generateWordProgressItems(buildingBlock, userStoryId);

      const item: BuildingBlockProgress = {
        id: genUid(),
        order: blockProgressItems.length,
        blockId: buildingBlock.id,
        userStoryId,

        isStarter: buildingBlock.isStarter,
        wordProgressItems: arrayToObjectIds(wordProgressItems),
      };
      blockProgressItems.push(item);
    }
    return blockProgressItems;
  }
  async generateWordProgressItems(
    buildingBlock: BuildingBlock,
    userStoryId: string
  ): Promise<WordProgress[]> {
    const wordProgressItems: WordProgress[] = [];
    for (const word of buildingBlock.words) {
      const wordProgress: WordProgress = {
        id: genUid(),
        order: wordProgressItems.length,
        userStoryId,
        wordId: word.id,
      };
      wordProgressItems.push(wordProgress);
    }
    return wordProgressItems;
  }
  async generateEpilogueProgress(
    userStoryId: string
  ): Promise<EpilogueProgress> {
    const questionProgressItems: EpilogueQuestionProgress[] = [];
    for (let question of this._lessonStory.epilogue.questions) {
      questionProgressItems.push({
        id: genUid(),
        order: questionProgressItems.length,
        userStoryId,
        questionId: question.id,
      });
    }
    const epilogueProgress: EpilogueProgress = {
      id: genUid(),
      userStoryId,
      epilogueId: this._lessonStory.epilogue.id,
      questionProgressItems: arrayToObjectIds(questionProgressItems),
    };
    return epilogueProgress;
  }
}
