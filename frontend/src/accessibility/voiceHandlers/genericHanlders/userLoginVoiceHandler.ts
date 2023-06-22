import { useCallback } from "react";
import { useAppUser } from "../../../auth/authHooks";
import { signInWithGoogle } from "../../../auth/firebase-auth";
import {
  AudioUserCommand,
  AudioUserCommandType,
} from "../../../context/contextTypes/voiceCommand.types";
import { usePlayAppMessageFactory } from "../../audioSpeaker/hooks/usePlayAppMessageFactory";
import { generalAppMessages } from "../../staticAppMessages/generalAppMessages";
import { VoiceHandler } from "../VoiceHandler.types";

export function userLoginVoiceHandler():VoiceHandler {
  const { user } = useAppUser();
  const { playAppMessageAsync } = usePlayAppMessageFactory();

  const handle = useCallback(
    (command: AudioUserCommand) => {
      if (command.commandType !== AudioUserCommandType.Login) {
        return false;
      }

      if (user) {
        console.log("[VoiceHandling]: Login. You're already logged in.");
        playAppMessageAsync(generalAppMessages.cantLoginBecauseAlreadyLogin);
      } else {
        signInWithGoogle();
      }
      return true;
    },
    [user, playAppMessageAsync]
  );
  return {
    handle,
    isForbidden: !!user,
    avaiableCommands: [AudioUserCommandType.Login]
  };
}
