import { axiosMockAdapterInstance } from "../axiosInstance";
import { UserStory } from "../context";

import { mockContext } from "./mockContext";

axiosMockAdapterInstance.onGet("userStories").reply(async (config) => {
  log(`Mock request at ${config.url}`);
  const userId = config?.headers?.["user-id"] ?? "";
  if (!userId) {
    return [400, { message: "Bad useId" }];
  }

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

  await new Promise((resolve) =>
    setTimeout(() => {
      resolve({});
    }, 1000)
  );
  return [200, data];
});

axiosMockAdapterInstance.onGet(/userStories\/(.+)/).reply(async (config) => {
  log(`Mock request at ${config.url}`);

  const userId = config?.headers?.["user-id"] ?? "";
  if (!userId) {
    return [400, { message: "Bad useId" }];
  }

  const [, storyId] = config?.url?.match(/userStories\/(.+)/) || [];
  if (!storyId) {
    return [400, { message: "Story id should not be empty" }];
  }

  let data: UserStory[];
  const existingUser = mockContext
    .getCtx()
    .userStories.find((i) => i.userId === userId);
  if (!existingUser) {
    return [400, { message: "User doesn't exist" }];
  }

  const existingStory = existingUser.stories.find(story => story.id == Number(storyId));
  if (!existingStory) {
    return [400, { message: `User doesn't have any story with id:${Number(storyId)}` }];
  }

  await new Promise((resolve) =>
    setTimeout(() => {
      resolve({});
    }, 1000)
  );
  return [200, existingStory];
});

function log(value: any) {
  console.log(value);
}
