import { getStringifiedError } from "../../ApiSupport/apiErrorHelpers";
import Result from "../../ApiSupport/Result";
import { BuildingBlock, Story } from "../../Data/ctxTypes/ctx.story.types";
import {
  BuildingBlockProgress,
  EpilogueProgress,
  EpilogueQuestionProgress,
  UserStory,
  WordProgress,
} from "../../Data/ctxTypes/ctx.userStory.types";
import { arrayToObjectIds, genUid } from "../../utils";
import { DiverseStateUserStoryDecorator } from "./DiverseStateUserStoryDecorator";

export class UserStoriesCreator {
  public createUserStories(allLessonStories: Story[]): Result<UserStory[]> {
    try {
      const pairsUserAndLesson: { userStory: UserStory; lessonStory: Story }[] =
        [];

      const userStories: UserStory[] = [];
      for (const lessonStory of allLessonStories) {
        const convertor = new LessonToUserStoryConvertor(
          lessonStory,
          allLessonStories
        );
        const userStoryItem = convertor.GetCookedUserStory();
        userStoryItem.order = userStories.length;
        userStories.push(userStoryItem);

        pairsUserAndLesson.push({
          userStory: userStoryItem,
          lessonStory: lessonStory,
        });
      }
      this.fillInDependencies(pairsUserAndLesson);

      // TODO: add conditions for this
      // DEMO: add state changes to the user story progress to emulate each state
      const decorator = new DiverseStateUserStoryDecorator(userStories);
      const userStoriesWithDiverseProgress = decorator.generateDiverseStories();

      return Result.Success(userStoriesWithDiverseProgress);
    } catch (err) {
      return Result.Error<UserStory[]>(getStringifiedError(err));
    }
  }
  private fillInDependencies(
    pairsUserAndLesson: { userStory: UserStory; lessonStory: Story }[]
  ) {
    for (const { userStory, lessonStory } of pairsUserAndLesson) {
      const idsDependentOnThisUserStory: string[] = [];
      lessonStory.idsItemsDependentOnThis?.forEach((depLessonStoryId) => {
        const pair = pairsUserAndLesson.find((i) => i.lessonStory.id);
        if (pair) {
          idsDependentOnThisUserStory.push(pair.userStory.id);
        }
      });

      userStory.idsDependentOnThisUserStory = idsDependentOnThisUserStory;
    }
  }
}

class LessonToUserStoryConvertor {
  private _lessonStory: Story;
  private _allLessons: Story[];

  public constructor(lessonStory: Story, allLessons: Story[]) {
    this._lessonStory = lessonStory;
    this._allLessons = allLessons;
  }

  public GetCookedUserStory(): UserStory {
    const userStoryId = genUid();
    const buildingBlocksProgressItems =
      this.generateBuildingProgress(userStoryId);
    const epilogueProgress = this.generateEpilogueProgress(userStoryId);

    const userStory: UserStory = {
      id: userStoryId,
      order: 0,
      storyId: this._lessonStory.id,

      description: null,

      isDependentOnNames: this.getParentStoryNames(),
      idsDependentOnThisUserStory: [], // to be fiiled in

      name: this._lessonStory.name,
      imageUrl: this._lessonStory.imageUrl,

      buildingBlocksProgressItems: arrayToObjectIds<BuildingBlockProgress>(
        buildingBlocksProgressItems
      ),

      epilogueProgress,

      numOfBlocksCompleted: 0,
      numOfTotalBlocks: buildingBlocksProgressItems.length,
    };
    return userStory;
  }

  getParentStoryNames(): string[] {
    const names = this._allLessons
      .filter((serachedParentStory) =>
        serachedParentStory.idsItemsDependentOnThis?.find(
          (id) => id === this._lessonStory.id
        )
      )
      .map((s) => s.name);
    return names;
  }

  generateBuildingProgress(userStoryId: string): BuildingBlockProgress[] {
    const blockProgressItems: BuildingBlockProgress[] = [];
    for (let buildingBlock of this._lessonStory.buildingBlocks) {
      const wordProgressItems: WordProgress[] = this.generateWordProgressItems(
        buildingBlock,
        userStoryId
      );

      const item: BuildingBlockProgress = {
        id: genUid(),
        order: blockProgressItems.length,
        blockId: buildingBlock.id,
        isDependentOnNames: this.getDependentBlockNames(buildingBlock),

        userStoryId,
        lessonStoryId: this._lessonStory.id,

        isStarter: buildingBlock.isStarter,
        wordProgressItems: arrayToObjectIds(wordProgressItems),
      };
      blockProgressItems.push(item);
    }
    return blockProgressItems;
  }

  getDependentBlockNames(childBlock: BuildingBlock): string[] {
    const names = this._lessonStory.buildingBlocks
      .filter((serachedParentBlock) =>
        serachedParentBlock.idsItemsDependentOnThis?.find(
          (id) => id === childBlock.id
        )
      )
      .map((s) => s.name);
    return names;
  }

  generateWordProgressItems(
    buildingBlock: BuildingBlock,
    userStoryId: string
  ): WordProgress[] {
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

  generateEpilogueProgress(userStoryId: string): EpilogueProgress {
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
      lessonStoryId: this._lessonStory.id,
      epilogueId: this._lessonStory.epilogue.id,
      questionProgressItems: arrayToObjectIds(questionProgressItems),
    };
    return epilogueProgress;
  }
}
