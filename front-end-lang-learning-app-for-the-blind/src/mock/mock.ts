import { axiosMockAdapterInstance } from "../axiosInstance";
import { dummyStoryData } from "./dummyData/storyData";
import { initId } from "./mockUtils";

initId();

const objExistsInLocal = (key: string) => {
  const value = localStorage.getItem(key);
  const exists = !!value && typeof value === "object";
  return exists;
};

axiosMockAdapterInstance.onGet("userStories/:userId").reply((config) => {
  const { userId } = config.params;
  const lsKey = `userStories_${userId}`;
  if (!objExistsInLocal(lsKey)) {
    const userStory = dummyStoryData();
    localStorage.setItem(lsKey, JSON.stringify([userStory]));
  }

  const data = localStorage.getItem(lsKey);
  return [200, data];
});
