import { AxiosRequestConfig } from "axios";
import { axiosMockAdapterInstance } from "../axiosInstance";
import { UserStory } from "../context";

import { mockContext } from "./mockContext";

axiosMockAdapterInstance.onGet("userStories").reply(async (config) =>
  withUser(config, async (userId) => {
    let data: UserStory[];
    const existingUser = mockContext
      .getCtx()
      .userStories.find((i) => i.userId === userId);
    if (existingUser) {
      data = existingUser.stories;
    } else {
      data = mockContext.addAndGetInitializingUserAndStories(userId);
    }
    mockContext.SaveContext();

    await wait();
    return [200, data];
  })
);

axiosMockAdapterInstance.onGet(/^userStories\/(.+)/).reply(async (config) =>
  withUser(config, async (userId) => {
    const [, storyId] = config?.url?.match(/userStories\/(.+)/) || [];
    if (!storyId) {
      return [400, { message: "Story id should not be empty" }];
    }

    const existingUser = mockContext
      .getCtx()
      .userStories.find((i) => i.userId === userId);
    if (!existingUser) {
      return [400, { message: "User doesn't exist" }];
    }

    const existingStory = existingUser.stories.find(
      (story) => story.id == Number(storyId)
    );
    if (!existingStory) {
      return [
        400,
        { message: `User ${userId} doesn't have any story with id ${Number(storyId)}` },
      ];
    }

    await wait();
    return [200, existingStory];
  })
);

axiosMockAdapterInstance.onGet(/^blocks\/(.+)$/).reply(async (config) =>
  withUser(config, async (userId) => {
    const [, blockId] = config?.url?.match(/blocks\/(.+)/) || [];
    if (!blockId) {
      return [400, { message: "Block id should not be empty" }];
    }

    const existingUser = mockContext
      .getCtx()
      .userStories.find((i) => i.userId === userId);
    if (!existingUser) {
      return [401, { message: "User doesn't exist" }];
    }

    const existingBlock = existingUser.stories
      .flatMap((s) => s.buildingBlocksProgressItems)
      .find((bp) => bp.id === Number(blockId));
    if (!existingBlock) {
      return [
        403,
        { message: `User ${userId} doesn't have any block with id:${Number(blockId)}` },
      ];
    }

    await wait();
    return [200, existingBlock];
  })
);

axiosMockAdapterInstance.onPost(/^blocks\/(.+)\/complete-summary$/).reply(async (config) =>
  withUser(config, async (userId) => {
    const [, blockId] = config?.url?.match(/blocks\/(.+)\/complete-summary/) || [];
    if (!blockId) {
      return [400, { message: "Block id should not be empty" }];
    }

    const existingUser = mockContext
      .getCtx()
      .userStories.find((i) => i.userId === userId);
    if (!existingUser) {
      return [401, { message: "User doesn't exist" }];
    }

    const existingBlock = existingUser.stories
      .flatMap((s) => s.buildingBlocksProgressItems)
      .find((bp) => bp.id === Number(blockId));
    if (!existingBlock) {
      return [
        403,
        { message: `User ${userId} doesn't have any block with id:${Number(blockId)}` },
      ];
    }

    existingBlock.timeSummaryCompleted = new Date().getTime();
    mockContext.SaveContext();

    await wait();
    return [200, existingBlock];
  })
);

function log(value: any) {
  console.log(`Mock: ${value}`);
}

async function withUser(
  config: AxiosRequestConfig,
  callback: (userId: string) => Promise<any[]>
) {
  const userId = config?.headers?.["user-id"] ?? "";
  if (!userId) {
    const failedAuthorisedResponse = await withLog(config, () =>
      Promise.resolve([401, { message: "User is not authorised." }])
    );
    return failedAuthorisedResponse;
  }

  const authorisedLoggedResponse = await withLog(config, () =>
    callback(userId)
  );
  return authorisedLoggedResponse;
}

async function withLog(
  config: AxiosRequestConfig,
  callback: () => Promise<any[]>
) {
  log(`Started ${config.method?.toUpperCase()} /${config.url}`);

  const response = await callback();

  const possibleErrorMessage =
    response[0] !== 200 && response[0] !== 201
      ? ` Message: '${response[1].message}'`
      : "";
  log(
    `Finished [${response[0]}]${possibleErrorMessage} at ${config.method?.toUpperCase()} /${config.url}`
  );
  return response;
}

function wait(miliseconds = 500) {
  new Promise((resolve) =>
      setTimeout(() => {
        resolve({});
      }, miliseconds)
    );
}