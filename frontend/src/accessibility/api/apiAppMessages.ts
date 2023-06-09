import { genKey } from "../../constants";
import { AppMessage } from "../types/appMessage.type";
import { PlayableError } from "../types/playableMessage.type";

export const getPlayableFromAppMessage = (
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
