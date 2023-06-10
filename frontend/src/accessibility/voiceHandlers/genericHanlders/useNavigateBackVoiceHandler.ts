import { useCallback } from "react";
import { useNavigate } from "react-router";
import {
  AudioUserCommand,
  AudioUserCommandType,
} from "../../../context/contextTypes/voiceCommand.types";
import { VoiceHandler } from "../VoiceHandler.types";

export function useNavigateBackVoiceHandler(): VoiceHandler {
  const navigate = useNavigate();

  const handle = useCallback((command: AudioUserCommand) => {
    if (command.commandType === AudioUserCommandType.NavigateBack) {
      navigate(-1);
      return true;
    }
    return false;
  }, []);

  return {
    handle,
    avaiableCommands: [AudioUserCommandType.NavigateBack],
  };
}
