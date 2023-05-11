/**
 * these are types related the progress of the a lesson-story
 */
import {
  BuildingBlockProgress,
  EpilogueProgress,
  EpilogueQuestionProgress,
  UserStory,
  WordProgress,
} from "../Data/ctx.userStory.types";

export type UserStoryOutput = Omit<
  UserStory,
  "buildingBlocksProgressItems" | "epilogueProgress"
> & {
  buildingBlocksProgressItems: BuildingBlockProgressOutput[];
  epilogueProgress: EpilogueProgressOutput;
};

export type BuildingBlockProgressOutput = Omit<
  BuildingBlockProgress,
  "wordProgressItems"
> & {
  wordProgressItems: WordProgress[];
};

export type EpilogueProgressOutput = Omit<
  EpilogueProgress,
  "questionProgressItems"
> & {
  questionProgressItems: EpilogueQuestionProgress[];
};
