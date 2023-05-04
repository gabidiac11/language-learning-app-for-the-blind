import { axiosMockAdapterInstance } from "../../axiosInstance";
import { UserStory } from "../../context";
import { mockContext } from "../mockContext";
import { withUser, wait } from "./mockEndpointHelpers";

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
    const existingUser = mockContext
      .getCtx()
      .userStories.find((i) => i.userId === userId);
    if (!existingUser) {
      return [400, { message: "User doesn't exist" }];
    }

    const [, storyId] = config?.url?.match(/userStories\/(.+)/) || [];
    if (!storyId) {
      return [400, { message: "Story id should not be empty." }];
    }

    const existingStory = existingUser.stories.find(
      (story) => story.id == Number(storyId)
    );
    if (!existingStory) {
      return [
        400,
        {
          message: `User doesn't have any story with given id.`,
        },
      ];
    }

    await wait();
    return [200, existingStory];
  })
);
