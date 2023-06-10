import { audioStorageBasePath } from "../../constants";
import { AppMessage } from "../types/appMessage.type";

export const generalAppMessages: AppMessageGeneralSet = {
  readAvailableCommands: {
    uniqueName: "readAvailableCommands",
    text: "Read avilable commands.",
    filePath: `${audioStorageBasePath}/frontendGeneral/readAvailableCommands.mp3`,
  },
  tryAgainFetchRequest: {
    uniqueName: "tryAgainFetchRequest",
    text: "Try again to fetch the request by navigating to 'Try again' button using tab.",
    filePath: `${audioStorageBasePath}/frontendGeneral/tryAgainFetchRequest.mp3`,
  },
  interactionIsOn: {
    uniqueName: "interactionIsOn",
    text: "Interaction is on.",
    filePath: `${audioStorageBasePath}/frontendGeneral/interactionIsOn.mp3`,
  },
  cantOpenALockedItem: {
    uniqueName: "cantOpenALockedItem",
    text: "Entering this item is forbidden because the item is in the locked state.",
    filePath: `${audioStorageBasePath}/frontendGeneral/cantOpenALockedItem.mp3`,
  },
  cantNavigateToNonExistentItem: {
    uniqueName: "cantNavigateToNonExistentItem",
    text: "Can't navigate to the item because it doesn't exist on this page.",
    filePath: `${audioStorageBasePath}/frontendGeneral/cantNavigateToNonExistentItem.mp3`,
  },
  cantLogoutBecauseAlreadyLogout: {
    uniqueName: "cantLogoutBecauseAlreadyLogout",
    text: "Cannot logout, because you're already logged out.",
    filePath: `${audioStorageBasePath}/frontendGeneral/cantLogoutBecauseAlreadyLogout.mp3`,
  },
  cantLoginBecauseAlreadyLogin: {
    uniqueName: "cantLoginBecauseAlreadyLogin",
    text: "Cannot login, because you're already logged in.",
    filePath: `${audioStorageBasePath}/frontendGeneral/cantLoginBecauseAlreadyLogin.mp3`,
  },
  couldNotMatchVoiceCommand: {
    uniqueName: "couldNotMatchVoiceCommand",
    text: "Voice command not found.",
    filePath: `${audioStorageBasePath}/frontendGeneral/couldNotMatchVoiceCommand.mp3`,
  },
  voiceCommandNotAvailableOnThisPage: {
    uniqueName: "voiceCommandNotAvailableOnThisPage",
    text: "Voice command not allowed on this page.",
    filePath: `${audioStorageBasePath}/frontendGeneral/voiceCommandNotAvailableOnThisPage.mp3`,
  },
};

export type AppMessageGeneralSet = {
  readAvailableCommands: AppMessage;
  tryAgainFetchRequest: AppMessage;
  interactionIsOn: AppMessage;
  cantOpenALockedItem: AppMessage;

  // voice commands
  cantNavigateToNonExistentItem: AppMessage;
  cantLogoutBecauseAlreadyLogout: AppMessage,
  cantLoginBecauseAlreadyLogin: AppMessage;
  couldNotMatchVoiceCommand: AppMessage;
  voiceCommandNotAvailableOnThisPage: AppMessage;
};
