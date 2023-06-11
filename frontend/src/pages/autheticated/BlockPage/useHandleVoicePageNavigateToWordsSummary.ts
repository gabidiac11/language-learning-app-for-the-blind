import { useCallback } from "react";
import { useNavigate } from "react-router";
import { usePlayAppMessageFactory } from "../../../accessibility/audioSpeaker/hooks/usePlayAppMessageFactory";
import { generalAppMessages } from "../../../accessibility/staticAppMessages/generalAppMessages";
import { VoiceHandler } from "../../../accessibility/voiceHandlers/VoiceHandler.types";
import { BuildingBlockProgress } from "../../../context";
import {
  AudioUserCommand,
  AudioUserCommandType
} from "../../../context/contextTypes/voiceCommand.types";


export function useHandleVoicePageNavigateToWordsSummary(buildingBlockProgress: BuildingBlockProgress | undefined): VoiceHandler {
  const { playAppMessageAsync } = usePlayAppMessageFactory();
  const navigate = useNavigate();

  const handle = useCallback(
    (command: AudioUserCommand) => {
      if (command.commandType !== AudioUserCommandType.AccessWordsSummary) {
        return false;
      }

      if (!buildingBlockProgress) {
        playAppMessageAsync(generalAppMessages.cantNavigateToNonExistentItem);
        return true;
      }
      navigate(
        `/blocks/${buildingBlockProgress.lang}/${buildingBlockProgress.id}/introduction`
      );
      return true;
    },
    [buildingBlockProgress, playAppMessageAsync]
  );

  return {
    handle,
    avaiableCommands: [AudioUserCommandType.AccessWordsSummary],
  };
}
