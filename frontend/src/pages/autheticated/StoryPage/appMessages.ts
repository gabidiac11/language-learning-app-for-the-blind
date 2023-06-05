import { AppMessage } from "../../../accessibility/accesibilityTypes";
import { audioStorageBasePath } from "../../../constants";

export const storyPageMessages: {
  loadingStoryPage: AppMessage;
  loadedStoryPage: AppMessage;
  greetingPageStoryPage: AppMessage;
} = {
  loadingStoryPage: {
    uniqueName: "loadingStoryPage",
    text: "Loading lesson-story selected.",
    filePath: `${audioStorageBasePath}/pages/storyPage/loadingStoryPage.mp3`,
  },
  loadedStoryPage: {
    uniqueName: "loadedStoryPage",
    text: "The story selected finished loading. Choose what building block or epilogue block you want to access by pressing arrow left or arrow right to switch between story card information then press enter to access.",
    filePath: `${audioStorageBasePath}/pages/storyPage/loadedStoryPage.mp3`,
  },
  greetingPageStoryPage: {
    uniqueName: "greetingPageStoryPage",
    text: "Page: Lesson story.",
    filePath: `${audioStorageBasePath}/pages/storyPage/greetingPageStoryPage.mp3`,
  },  
};
