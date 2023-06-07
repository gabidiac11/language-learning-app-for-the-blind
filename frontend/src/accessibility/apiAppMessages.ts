import { AxiosError } from "axios";
import { genKey } from "../constants";
import { AppMessage } from "./accesibilityTypes";
import { errorAppMessages } from "./errorAppMessages";
import { PlayableError } from "./playableMessage";

export type ApiMessage = {
  text: string;
  filePath: string;
  uniqueName: string;
};

export type ApiErrorResponseData = {
  messages: ApiMessage[];
  isApiErrorResponseData: true;
};

export const getIsApiErrorResponseData = (obj: unknown): boolean => {
  if (!obj || typeof obj !== "object") {
    return false;
  }

  const objAsAppMessage = obj as ApiErrorResponseData;
  return !!objAsAppMessage.isApiErrorResponseData;
};

const getPlayableFromAppMessage = (
  originalError: unknown,
  appMessage: AppMessage
): PlayableError => ({
  isAppPlayableError: true,
  originalError,
  message: {
    key: `${genKey()}:${appMessage.uniqueName}`,
    messages: [appMessage],
  },
});

export const getPlayableErrorFromUnknown = (
  error: unknown
): PlayableError | undefined => {
  if (!error) return undefined;

  const errorAsAxios = error as AxiosError;
  if (errorAsAxios?.isAxiosError) {
    const playableError = getPlayableErrorFromAxiosError(errorAsAxios);
    return playableError;
  }

  return getPlayableFromAppMessage(error, errorAppMessages.somethingWentWrong);
};

function getPlayableErrorFromAxiosError(axiosError: AxiosError): PlayableError {
  const isApiErrorResponseData = getIsApiErrorResponseData(
    axiosError.response?.data
  );
  if (!isApiErrorResponseData) {
    if (axiosError.code === "ERR_NETWORK") {
        return getPlayableFromAppMessage(axiosError, errorAppMessages.networkError);
    }
    return getPlayableFromAppMessage(axiosError, errorAppMessages.somethingWentWrong);
  }

  const data = axiosError.response?.data as ApiErrorResponseData;
  const messages: AppMessage[] = data.messages.map((item) => ({
    filePath: item.filePath,
    text: item.text,
    uniqueName: item.uniqueName,
  }));

  const playableMessage = {
    key: `${genKey()}:${messages.map((i) => i.uniqueName).join("-")}`,
    messages,
  };
  const playableError: PlayableError = {
    isAppPlayableError: true,
    originalError: axiosError,
    message: playableMessage,
  };
  return playableError;
}
