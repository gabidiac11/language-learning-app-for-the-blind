import { AppMessage } from "../../../accessibility/types/appMessage.type";
import { audioStorageBasePath } from "../../../constants";

export const storiesOverviewPageMessages: {
  loadingStoriesOverview: AppMessage;
  loadedStoriesOverview: AppMessage;
  greetingPageStoriesOverview: AppMessage;
} = {
  loadingStoriesOverview: {
    uniqueName: "loadingStoriesOverview",
    text: "Loading lesson-stories of your selected language.",
    filePath: `${audioStorageBasePath}/pages/storiesOverview/loadingStoriesOverview.mp3`,
  },
  loadedStoriesOverview: {
    uniqueName: "loadedStoriesOverview",
    text: "Stories of your selected language finished loading. Choose what lesson-story you want to access by pressing arrow left or arrow right to switch between story card information then press enter to access the story.",
    filePath: `${audioStorageBasePath}/pages/storiesOverview/loadedStoriesOverview.mp3`
  },
  greetingPageStoriesOverview: {
    uniqueName: "greetingPageStoriesOverview",
    text: "Page: Lesson-stories overview.",
    filePath: `${audioStorageBasePath}/pages/storiesOverview/greetingPageStoriesOverview.mp3`,
  },
};
