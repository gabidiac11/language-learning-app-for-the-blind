import { AppMessage } from "../../../../accessibility/accesibilityTypes";
import { audioStorageBasePath } from "../../../../constants";

export const blockStartPageMessages: {
  loadingBlockStart: AppMessage;
  loadedBlockStart: AppMessage;
  greetingPageBlockStart: AppMessage;
} = {
  loadingBlockStart: {
    uniqueName: "loadingBlockStart",
    text: "Loading your selected building block.",
    filePath: `${audioStorageBasePath}/pages/blockStart/loadingBlockStart.mp3`,
  },
  loadedBlockStart: {
    uniqueName: "loadedBlockStart",
    text: "Finished loading your selected building block. Start or continue practicing the words using the introduction module or the quiz module. Once both are completed the block is completed. Access page by pressing arrow up or arrow down to switch between options.",
    filePath: `${audioStorageBasePath}/pages/blockStart/loadedBlockStart.mp3`,
  },
  greetingPageBlockStart: {
    uniqueName: "greetingPageBlockStart",
    text: "Page: Building block overview.",
    filePath: `${audioStorageBasePath}/pages/blockStart/greetingPageBlockStart.mp3`,
  },
};
