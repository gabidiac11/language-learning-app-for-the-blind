import { AppMessage } from "../../../../accessibility/types/appMessage.type";
import { audioStorageBasePath } from "../../../../constants";

export const blockQuizCompletedPageMessages: {
  loadingBlockQuizCompleted: AppMessage;
  loadedBlockQuizCompleted: AppMessage;
  greetingPageBlockQuizCompleted: AppMessage;
} = {
  loadingBlockQuizCompleted: {
    uniqueName: "loadingBlockQuizCompleted",
    text: "Loading quiz achievements.",
    filePath: `${audioStorageBasePath}/pages/blockQuizCompleted/loadingBlockQuizCompleted.mp3`,
  },
  loadedBlockQuizCompleted: {
    uniqueName: "loadedBlockQuizCompleted",
    text: "Navigate with arrow up or arrow down to access these lessons that you've achieved.",
    filePath: `${audioStorageBasePath}/pages/blockQuizCompleted/loadedBlockQuizCompleted.mp3`,
  },
  greetingPageBlockQuizCompleted: {
    uniqueName: "greetingPageBlockQuizCompleted",
    text: "Page: Block quiz completed.",
    filePath: `${audioStorageBasePath}/pages/blockQuizCompleted/greetingPageBlockQuizCompleted.mp3`,
  },
};
