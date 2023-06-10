import { useCallback } from "react";
import { AudioUserCommand } from "../../../context/contextTypes/voiceCommand.types";
import { usePlayAppMessageFactory } from "../../audioSpeaker/hooks/usePlayAppMessageFactory";
import { generalAppMessages } from "../../staticAppMessages/generalAppMessages";
import { VoiceHandler } from "../VoiceHandler.types";

// fallback for voice commands:
export function useNotAllowedVoiceHandler():VoiceHandler {
  const { playAppMessageAsync } = usePlayAppMessageFactory();
  const handle = useCallback(
    (command: AudioUserCommand) => {
      console.log(`[VoiceHandling]: ${command} not allowd on this page.`);
      playAppMessageAsync(
        generalAppMessages.voiceCommandNotAvailableOnThisPage
      );
      return true;
    },
    [playAppMessageAsync]
  );

  return {
    handle,
    avaiableCommands: []
  };
}
