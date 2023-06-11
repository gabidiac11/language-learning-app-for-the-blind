import { useCallback } from "react";
import { useNavigate } from "react-router";
import { usePlayAppMessageFactory } from "../../audioSpeaker/hooks/usePlayAppMessageFactory";
import { generalAppMessages } from "../../staticAppMessages/generalAppMessages";
import { VoiceHandler } from "../VoiceHandler.types";
import { EpilogueProgress } from "../../../context";
import {
  AudioUserCommand,
  AudioUserCommandType
} from "../../../context/contextTypes/voiceCommand.types";


export function useHandleVoicePageNavigateToQuizFromEpilogue(
  epilogueProgress: EpilogueProgress | undefined
): VoiceHandler {
  const { playAppMessageAsync } = usePlayAppMessageFactory();
  const navigate = useNavigate();

  const handle = useCallback(
    (command: AudioUserCommand) => {
      if (command.commandType !== AudioUserCommandType.AccessQuiz) {
        return false;
      }

      if (!epilogueProgress) {
        playAppMessageAsync(generalAppMessages.cantNavigateToNonExistentItem);
        return true;
      }

      navigate(
        `/epilogues/${epilogueProgress.lang}/${epilogueProgress.id}/quiz`
      );

      return true;
    },
    [epilogueProgress, playAppMessageAsync]
  );

  return {
    handle,
    avaiableCommands: [AudioUserCommandType.AccessQuiz],
  };
}
