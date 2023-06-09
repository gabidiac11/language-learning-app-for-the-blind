import { AppMessage } from "../../../accessibility/types/appMessage.type";
import { audioStorageBasePath } from "../../../constants";

export const langPageMessages: {
  loadingLanguages: AppMessage;
  loadedLanguages: AppMessage;
  greetingPageLanguages: AppMessage;
} = {
  loadingLanguages: {
    uniqueName: "loadingLanguages",
    text: "Loading languages",
    filePath: `${audioStorageBasePath}/pages/languages/loadingLanguages.mp3`,
  },
  loadedLanguages: {
    uniqueName: "loadedLanguages",
    text: "Finished loading languages. Choose what language you want to learn from the available options by pressing arrow left or arrow right to switch between options.",
    filePath: `${audioStorageBasePath}/pages/languages/loadedLanguages.mp3`
  },
  greetingPageLanguages: {
    uniqueName: "greetingPageLanguages",
    text: "Page: Lesson languages.",
    filePath: `${audioStorageBasePath}/pages/languages/greetingPageLanguages.mp3`,
  },
};
