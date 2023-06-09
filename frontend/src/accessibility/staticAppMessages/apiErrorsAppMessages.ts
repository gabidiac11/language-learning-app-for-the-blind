import { audioStorageBasePath } from "../../constants";
import { AppMessage } from "../types/appMessage.type";

export const apiErrorsAppMessages: AppMessageErrorSet = {
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
  somethingWentWrong: AppMessage;
  networkError: AppMessage;
};