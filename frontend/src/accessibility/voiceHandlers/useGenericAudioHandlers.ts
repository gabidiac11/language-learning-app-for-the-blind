import { useCallback, useState } from "react";
import { AudioUserCommand } from "../../context/contextTypes/voiceCommand.types";
import { useLogoutVoiceHandler } from "./genericHanlders/useLogoutVoiceHandler";
import { useNavigateBackVoiceHandler } from "./genericHanlders/useNavigateBackVoiceHandler";
import { userLoginVoiceHandler } from "./genericHanlders/userLoginVoiceHandler";
import { useUnknownVoiceHandler } from "./genericHanlders/useUnknownVoiceHandler";
import { VoiceHandler } from "./VoiceHandler.types";

export const useGenericAudioHandlers = (): VoiceHandler => {
  const unknownHandler = useUnknownVoiceHandler();
  const logoutHandler = useLogoutVoiceHandler();
  const navigateBackHandler = useNavigateBackVoiceHandler();
  const loginHandler = userLoginVoiceHandler();

  const handle = useCallback(
    (command: AudioUserCommand) => {
      const handlerCallbacks = [
        unknownHandler.handle,
        logoutHandler.handle,
        navigateBackHandler.handle,
        loginHandler.handle,
      ];

      for (const handleCallback of handlerCallbacks) {
        const wasHandled = handleCallback(command);
        if (wasHandled) {
          return true;
        }
      }
      return false;
    },
    [
      unknownHandler.handle,
      logoutHandler.handle,
      navigateBackHandler.handle,
      loginHandler.handle,
    ]
  );

  return {
    handle,
    avaiableCommands: [
      unknownHandler,
      logoutHandler,
      navigateBackHandler,
      loginHandler,
    ].flatMap((i) => i.avaiableCommands),
  };
};
