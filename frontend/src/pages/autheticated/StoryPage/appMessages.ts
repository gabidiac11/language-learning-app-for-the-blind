import { AppMessage } from "../../../accessibility/accesibilityTypes";
import { audioStorageBasePath } from "../../../constants";

export const storyPageMessages: {
  loadingStoryPage: AppMessage;
  loadedStoryPage: AppMessage;
  greetingPageStoryPage: AppMessage;
} = {
  loadingStoryPage: {
    uniqueName: "loadingStoryPage",
    text: "Loading the selected lesson-story.",
    filePath: `${audioStorageBasePath}/pages/storyPage/loadingStoryPage.mp3`,
  },
  loadedStoryPage: {
    uniqueName: "loadedStoryPage",
    text: "Finished loading your selected story. Choose what building block or epilogue you want to access by pressing arrow left or arrow right to switch between story card information elements then press enter to enter any block focused.",
    filePath: `${audioStorageBasePath}/pages/storyPage/loadedStoryPage.mp3`
  },
  greetingPageStoryPage: {
    uniqueName: "greetingPageStoryPage",
    text: "Page: Lesson story.",
    filePath: `${audioStorageBasePath}/pages/storyPage/greetingPageStoryPage.mp3`,
  },  
};
