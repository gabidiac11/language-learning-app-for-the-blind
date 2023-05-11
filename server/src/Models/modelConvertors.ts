import Result from "../ApiSupport/Result";
import { BuildingBlockProgress, UserStory } from "../Data/ctx.userStory.types";
import { valuesOrdered } from "../utils";
import {
  BuildingBlockProgressOutput,
  UserStoryOutput,
} from "./output.userStory.types";

function convertBlockToOutput(
  blockProgress: BuildingBlockProgress
): BuildingBlockProgressOutput {
  return {
    ...blockProgress,
    wordProgressItems: valuesOrdered(blockProgress.wordProgressItems),
  };
}

function convertUserStoryToOutput(userStory: UserStory): UserStoryOutput {
  const userStoryOutput: UserStoryOutput = {
    ...userStory,

    buildingBlocksProgressItems: valuesOrdered(
      userStory.buildingBlocksProgressItems
    ).map(convertBlockToOutput),

    epilogueProgress: {
      ...userStory.epilogueProgress,
      questionProgressItems: valuesOrdered(
        userStory.epilogueProgress.questionProgressItems
      ),
    },
  };
  return userStoryOutput;
}

export function convertUserStoryResultToOutput(
  userStoryResult: Result<UserStory>
): Result<UserStoryOutput> {
  const result = userStoryResult.getCopy<UserStoryOutput>();
  if (userStoryResult.data) {
    const story = JSON.parse(JSON.stringify(userStoryResult.data));
    const storyOutput = convertUserStoryToOutput(story);
    result.data = storyOutput;
  }
  return result;
}

export function convertUserStoriesResultToOutput(
  userStoryResult: Result<UserStory[]>
): Result<UserStoryOutput[]> {
  const result = userStoryResult.getCopy<UserStoryOutput[]>();
  if (userStoryResult.data) {
    const stories = JSON.parse(
      JSON.stringify(userStoryResult.data)
    ) as UserStory[];
    const storyOutput = stories.map(convertUserStoryToOutput);
    result.data = storyOutput;
  }
  return result;
}

export function convertBlockResultToOutput(
  bpResult: Result<BuildingBlockProgress>
): Result<BuildingBlockProgressOutput> {
  const result = bpResult.getCopy<BuildingBlockProgressOutput>();
  if (bpResult.data) {
    const bcBp = JSON.parse(
      JSON.stringify(bpResult.data)
    ) as BuildingBlockProgress;
    const bpOutput = convertBlockToOutput(bcBp);
    result.data = bpOutput;
  }
  return result;
}
