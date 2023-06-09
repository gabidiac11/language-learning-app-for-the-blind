import { AppMessage } from "./appMessage.type";

export type PlayableMessage = {
  key: string;
  messages: AppMessage[];
};

export type PlayableError = {
  message: PlayableMessage;
  isAppPlayableError: true;
  originalError: unknown;
};
