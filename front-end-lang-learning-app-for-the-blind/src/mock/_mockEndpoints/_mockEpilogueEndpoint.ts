import { AxiosRequestConfig } from "axios";
import { axiosMockAdapterInstance } from "../../axiosInstance";
import { UserStory } from "../../context";
import { mockContext } from "../mockContext";
import {
  withUser,
  wait,
  Result,
  processResultOfT,
} from "./mockEndpointHelpers";

const getStoryWithGuard = (
  config: AxiosRequestConfig<any>,
  userId: string
): Result<UserStory> => {
  const existingUser = mockContext
    .getCtx()
    .userStories.find((i) => i.userId === userId);
  if (!existingUser) {
    return { errorStatusCode: 401, errors: ["User doesn't exist."] };
  }

  const [, epilogueId] = config?.url?.match(/epilogue\/([\d]+)/) || [];
  if (!epilogueId) {
    return { errorStatusCode: 400, errors: ["Block id should not be empty."] };
  }

  const existingStory = existingUser.stories.find(
    (s) => s.epilogueProgress.id === Number(epilogueId)
  );
  if (!existingStory) {
    return {
      errorStatusCode: 403,
      errors: [`User doesn't have any epilogue.`],
    };
  }

  if (!existingStory.epilogueProgress.timeUnlocked) {
    return {
      errorStatusCode: 403,
      errors: [
        `Epilogue is locked. Complete all building blocks to start this epilogue.`,
      ],
    };
  }

  return { data: existingStory };
};

axiosMockAdapterInstance.onGet(/^epilogue\/([\d]+)$/).reply(async (config) =>
  withUser(config, async (userId) => {
    const result = getStoryWithGuard(config, userId);
    if (result.errors || !result.data) {
      return processResultOfT(result);
    }

    const { data: existingStory } = result;

    await wait();
    return [200, existingStory.epilogueProgress];
  })
);

axiosMockAdapterInstance
  .onPost(/^epilogue\/([\d]+)\/complete-summary$/)
  .reply(async (config) =>
    withUser(config, async (userId) => {
      const result = getStoryWithGuard(config, userId);
      if (result.errors || !result.data) {
        return processResultOfT(result);
      }

      const { data: existingStory } = result;
      existingStory.epilogueProgress.timeSummaryCompleted =
        new Date().getTime();
      mockContext.SaveContext();

      await wait();
      return [200];
    })
  );
