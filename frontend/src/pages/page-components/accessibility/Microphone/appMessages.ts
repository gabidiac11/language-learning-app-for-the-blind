import { AppMessage } from "../../../../accessibility/types/appMessage.type";
import { audioStorageBasePath } from "../../../../constants";

export const micMessages: {
  micOn: AppMessage;
  micOff: AppMessage;
  micRequested: AppMessage;
  popupAllowMicMightOpen: AppMessage;
  micPermissionDenied: AppMessage;
  noVoiceCommandsOnThisPage: AppMessage
} = {
  micOn: {
    uniqueName: "micOn",
    text: "Mic on",
    filePath: `${audioStorageBasePath}/pages/blockIntroduction/micOn.mp3`,
  },
  micOff: {
    uniqueName: "micOff",
    text: "Mic off.",
    filePath: `${audioStorageBasePath}/pages/blockIntroduction/micOff.mp3`,
  },
  micRequested: {
    uniqueName: "micRequested",
    text: "Mic requested.",
    filePath: `${audioStorageBasePath}/pages/blockIntroduction/micRequested.mp3`,
  },
  popupAllowMicMightOpen: {
    uniqueName: "popupAllowMicMightOpen",
    text: "Chrome might show a prompt. Please allow mic by pressing tab twice then press enter to allow.",
    filePath: `${audioStorageBasePath}/pages/blockIntroduction/popupAllowMicMightOpen.mp3`,
  },
  micPermissionDenied: {
    uniqueName: "micPermissionDenied",
    text: "Mic blocked. Please allow media from your chrome settings to use the mic interactions.",
    filePath: `${audioStorageBasePath}/pages/blockIntroduction/micPermissionDenied.mp3`,
  },
  noVoiceCommandsOnThisPage: {
    uniqueName: "noVoiceCommandsOnThisPage",
    text: "Mic disabled. No available voice commands on this page.",
    filePath: `${audioStorageBasePath}/pages/blockIntroduction/noVoiceCommandsOnThisPage.mp3`,
  },
};
