import { audioStorageBasePath } from "../constants";
import { AppMessage } from "./accesibilityTypes";

export const errorAppMessages: AppMessageErrorSet = {
  operationFailed: {
    uniqueName: "operationFailed",
    text: "Operation failed.",
    filePath: `${audioStorageBasePath}/errors/operationFailed.mp3`,
  },
  somethingWentWrong: {
    uniqueName: "somethingWentWrong",
    text: "Something went wrong. Please try again later.",
    filePath: `${audioStorageBasePath}/errors/somethingWentWrong.mp3`,
  },
  networkError: {
    uniqueName: "networkError",
    text: "Network error. Please check your connection.",
    filePath: `${audioStorageBasePath}/errors/networkError.mp3`,
  },
};

export type AppMessageErrorSet = {
  operationFailed: AppMessage;
  somethingWentWrong: AppMessage;
  networkError: AppMessage;
};