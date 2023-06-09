import { AxiosError } from "axios";
import { genKey } from "../../constants";
import { apiErrorsAppMessages } from "../staticAppMessages/apiErrorsAppMessages";
import { ApiErrorResponseData } from "../types/apiMessage.type";
import { AppMessage } from "../types/appMessage.type";
import { PlayableError } from "../types/playableMessage.type";
import { getPlayableFromAppMessage } from "./apiAppMessages";
import { getIsApiErrorResponseData } from "./getIsApiErrorResponseData";


export function getPlayableErrorFromUnknown(error: unknown): PlayableError | undefined {
  if (!error)
    return undefined;

  const errorAsAxios = error as AxiosError;
  if (errorAsAxios?.isAxiosError) {
    const playableError = getPlayableErrorFromAxiosError(errorAsAxios);
    return playableError;
  }

  return getPlayableFromAppMessage(
    error,
    apiErrorsAppMessages.somethingWentWrong
  );
}

function getPlayableErrorFromAxiosError(axiosError: AxiosError): PlayableError {
  const isApiErrorResponseData = getIsApiErrorResponseData(
    axiosError.response?.data
  );
  if (!isApiErrorResponseData) {
    if (axiosError.code === "ERR_NETWORK") {
      return getPlayableFromAppMessage(
        axiosError,
        apiErrorsAppMessages.networkError
      );
    }
    return getPlayableFromAppMessage(
      axiosError,
      apiErrorsAppMessages.somethingWentWrong
    );
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
