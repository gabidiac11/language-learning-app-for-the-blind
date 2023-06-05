import { AppMessage } from "../../../../accessibility/accesibilityTypes";
import { audioStorageBasePath } from "../../../../constants";

export const blockQuizCompletedPageMessages: {
  loadingBlockQuizCompleted: AppMessage;
  loadedBlockQuizCompleted: AppMessage;
  greetingPageBlockQuizCompleted: AppMessage;
} = {
  loadingBlockQuizCompleted: {
    uniqueName: "loadingBlockQuizCompleted",
    text: "Loading quiz status.",
    filePath: `${audioStorageBasePath}/pages/blockQuizCompleted/loadingBlockQuizCompleted.mp3`,
  },
  loadedBlockQuizCompleted: {
    uniqueName: "loadedBlockQuizCompleted",
    text: "Coungradulations! You finished block! Navigate with arrow up or arrow down to see the achievements.",
    filePath: `${audioStorageBasePath}/pages/blockQuizCompleted/loadedBlockQuizCompleted.mp3`,
  },
  greetingPageBlockQuizCompleted: {
    uniqueName: "greetingPageBlockQuizCompleted",
    text: "Page: Block quiz completed.",
    filePath: `${audioStorageBasePath}/pages/blockQuizCompleted/greetingPageBlockQuizCompleted.mp3`,
  },
};
