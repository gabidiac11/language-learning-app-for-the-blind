import { useCallback } from "react";
import {
  AudioUserCommand,
  AudioUserCommandType,
} from "../../../context/contextTypes/voiceCommand.types";
import { usePlayAppMessageFactory } from "../../audioSpeaker/hooks/usePlayAppMessageFactory";
import { generalAppMessages } from "../../staticAppMessages/generalAppMessages";
import { VoiceHandler } from "../VoiceHandler.types";

export function useUnknownVoiceHandler(): VoiceHandler {
  const { playAppMessageAsync } = usePlayAppMessageFactory();
  const handle = useCallback(
    (command: AudioUserCommand) => {
      if (command.commandType !== AudioUserCommandType.CommandUnidentified) {
        return false;
      }

      console.log("[VoiceHandling]: CommandUnidentified.");
      playAppMessageAsync(generalAppMessages.couldNotMatchVoiceCommand);
      return true;
    },
    [playAppMessageAsync]
  );
  return {
    handle,
    avaiableCommands: [AudioUserCommandType.CommandUnidentified],
  };
}
