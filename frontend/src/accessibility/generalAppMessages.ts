import { audioStorageBasePath } from "../constants";
import { AppMessage } from "./accesibilityTypes";

export const generalAppMessages: AppMessageGeneralSet = {
  readAvailableCommands: {
    uniqueName: "readAvailableCommands",
    text: "Read avilable commands.",
    filePath: `${audioStorageBasePath}/frontendGeneral/readAvailableCommands.mp3`,
  },
  tryAgainFetchRequest: {
    uniqueName: "tryAgainFetchRequest",
    text: "Try again to fetch the request.",
    filePath: `${audioStorageBasePath}/frontendGeneral/tryAgainFetchRequest.mp3`,
  },
  interactionIsOn: {
    uniqueName: "interactionIsOn",
    text: "Interaction is on.",
    filePath: `${audioStorageBasePath}/frontendGeneral/interactionIsOn.mp3`,
  }
};

export type AppMessageGeneralSet = {
  readAvailableCommands: AppMessage;
  tryAgainFetchRequest: AppMessage;
  interactionIsOn: AppMessage;
};
