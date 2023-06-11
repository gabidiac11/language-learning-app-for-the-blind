import { AppMessage } from "../../../../../accessibility/types/appMessage.type";
import { audioStorageBasePath } from "../../../../../constants";

export const epiloqueQuizCompletedPageMessages: {
  loadingEpilogueQuizCompleted: AppMessage;
  loadedEpilogueQuizCompleted: AppMessage;
  greetingPageEpilogueQuizCompleted: AppMessage;
} = {
  loadingEpilogueQuizCompleted: {
    uniqueName: "loadingEpilogueQuizCompleted",
    text: "Loading quiz status.",
    filePath: `${audioStorageBasePath}/pages/epiloqueQuizCompleted/loadingEpilogueQuizCompleted.mp3`,
  },
  loadedEpilogueQuizCompleted: {
    uniqueName: "loadedEpilogueQuizCompleted",
    text: "Navigate with arrow up or arrow down to access these lessons that you've achieved.",
    filePath: `${audioStorageBasePath}/pages/epiloqueQuizCompleted/loadedEpilogueQuizCompleted.mp3`,
    preventForcedStopOnCurrentPageJustOnce: true
  },
  greetingPageEpilogueQuizCompleted: {
    uniqueName: "greetingPageEpilogueQuizCompleted",
    text: "Page: Epilogue quiz completed.",
    filePath: `${audioStorageBasePath}/pages/epiloqueQuizCompleted/greetingPageEpilogueQuizCompleted.mp3`,
  },
};
