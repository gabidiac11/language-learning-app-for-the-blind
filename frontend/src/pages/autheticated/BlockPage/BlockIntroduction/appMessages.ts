import { AppMessage } from "../../../../accessibility/accesibilityTypes";
import { audioStorageBasePath } from "../../../../constants";

export const blockIntroductionPageMessages: {
  loadingBlockIntroduction: AppMessage;
  loadedBlockIntroduction: AppMessage;
  greetingPageBlockIntroduction: AppMessage;
  blockSummaryCompleted: AppMessage;
} = {
  loadingBlockIntroduction: {
    uniqueName: "loadingBlockIntroduction",
    text: "Loading words summary of your selected building block.",
    filePath: `${audioStorageBasePath}/pages/blockIntroduction/loadingBlockIntroduction.mp3`,
  },
  loadedBlockIntroduction: {
    uniqueName: "loadedBlockIntroduction",
    text: "Finished loading. The summary page is where each word of the block is displayed and read. It's recommended that you repeat to yourself those words. You can revisit this page each time you need to. Access page by pressing arrow up or arrow down to switch between options.",
    filePath: `${audioStorageBasePath}/pages/blockIntroduction/loadedBlockIntroduction.mp3`
  },
  greetingPageBlockIntroduction: {
    uniqueName: "greetingPageBlockIntroduction",
    text: "Page: Building block words summaries.",
    filePath: `${audioStorageBasePath}/pages/blockIntroduction/greetingPageBlockIntroduction.mp3`,
  },
  blockSummaryCompleted: {
    uniqueName: "blockSummaryCompleted",
    text: "Congratulations! You completed the words introduction, you can start the words quiz.",
    filePath: `${audioStorageBasePath}/pages/blockIntroduction/blockSummaryCompleted.mp3`,
  }
};
