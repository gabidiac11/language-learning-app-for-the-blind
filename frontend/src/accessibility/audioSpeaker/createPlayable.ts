import { genKey } from "../../constants";
import { AppMessage } from "../types/appMessage.type";
import { PlayableMessage } from "../types/playableMessage.type";


export const createPlayable = (
  messageOrMessages: AppMessage | AppMessage[]
): PlayableMessage => {
  const allMessages = !Array.isArray(messageOrMessages)
    ? [messageOrMessages]
    : messageOrMessages;

  return {
    key: genKey(),
    messages: allMessages,
  };
};