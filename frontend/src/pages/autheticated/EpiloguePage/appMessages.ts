import { AppMessage } from "../../../accessibility/accesibilityTypes";
import { audioStorageBasePath } from "../../../constants";

export const epilogueOverviewPageMessages: {
  loadingEpilogueOverview: AppMessage;
  loadedEpilogueOverview: AppMessage;
  greetingPageEpilogueOverview: AppMessage;
} = {
  loadingEpilogueOverview: {
    uniqueName: "loadingEpilogueOverview",
    text: "Loading epilogue short story.",
    filePath: `${audioStorageBasePath}/pages/epilogueOverview/loadingEpilogueOverview.mp3`,
  },
  loadedEpilogueOverview: {
    uniqueName: "loadedEpilogueOverview",
    text: "Epilogue short story has finished loading. To listen to the story press 'S' or navigate in the page using arrows up or arrow down.",
    filePath: `${audioStorageBasePath}/pages/epilogueOverview/loadedEpilogueOverview.mp3`,
  },
  greetingPageEpilogueOverview: {
    uniqueName: "greetingPageEpilogueOverview",
    text: "Page: Epilogue short story.",
    filePath: `${audioStorageBasePath}/pages/epilogueOverview/greetingPageEpilogueOverview.mp3`,
  },
};
