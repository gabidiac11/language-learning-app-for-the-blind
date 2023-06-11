import { useCallback } from "react";
import { useNavigate } from "react-router";
import { usePlayAppMessageFactory } from "../../audioSpeaker/hooks/usePlayAppMessageFactory";
import { generalAppMessages } from "../../staticAppMessages/generalAppMessages";
import { VoiceHandler } from "../VoiceHandler.types";
import { BuildingBlockProgress } from "../../../context";
import {
  AudioUserCommand,
  AudioUserCommandType,
} from "../../../context/contextTypes/voiceCommand.types";

export function useHandleVoicePageNavigateToQuizFromBlock(
  buildingBlockProgress: BuildingBlockProgress | undefined
): VoiceHandler {
  const { playAppMessageAsync } = usePlayAppMessageFactory();
  const navigate = useNavigate();

  const handle = useCallback(
    (command: AudioUserCommand) => {
      if (command.commandType !== AudioUserCommandType.AccessQuiz) {
        return false;
      }

      if (!buildingBlockProgress) {
        playAppMessageAsync(generalAppMessages.cantNavigateToNonExistentItem);
        return true;
      }
      
      if (!buildingBlockProgress.timeSummaryCompleted) {
        playAppMessageAsync(generalAppMessages.cantOpenALockedItem);
        return true;
      }

      navigate(
        `/blocks/${buildingBlockProgress.lang}/${buildingBlockProgress.id}/quiz`
      );

      return true;
    },
    [buildingBlockProgress, playAppMessageAsync]
  );

  return {
    handle,
    avaiableCommands: [AudioUserCommandType.AccessQuiz],
  };
}


