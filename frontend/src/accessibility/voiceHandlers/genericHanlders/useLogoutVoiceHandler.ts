import { useCallback } from "react";
import { useAppUser } from "../../../auth/authHooks";
import { logout } from "../../../auth/firebase-auth";
import {
  AudioUserCommand,
  AudioUserCommandType,
} from "../../../context/contextTypes/voiceCommand.types";
import { usePlayAppMessageFactory } from "../../audioSpeaker/hooks/usePlayAppMessageFactory";
import { generalAppMessages } from "../../staticAppMessages/generalAppMessages";
import { logVoice } from "../logVoice";
import { VoiceHandler } from "../VoiceHandler.types";

export function useLogoutVoiceHandler():VoiceHandler {
  const { user } = useAppUser();

  const { playAppMessageAsync } = usePlayAppMessageFactory();

  const handle = useCallback(
    (command: AudioUserCommand) => {
      if (command.commandType !== AudioUserCommandType.Logout) {
        return false;
      }
      
      if (user) {
        logVoice("LOGOUT");
        logout();
      } else {
        logVoice("LOGOUT", "You're already logged out.");
        playAppMessageAsync(generalAppMessages.cantLogoutBecauseAlreadyLogout);
      }
      return true;
    },
    [user, playAppMessageAsync]
  );
  return {
    handle,
    isForbidden: !user,
    avaiableCommands: [AudioUserCommandType.Logout]
  };
}
