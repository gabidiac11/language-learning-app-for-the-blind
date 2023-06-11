import { useCallback, useState } from "react";
import { createPlayable } from "../../../../accessibility/audioSpeaker/createPlayable";
import { useHandleVoicePageNavigateToQuizFromBlock } from "../../../../accessibility/voiceHandlers/quizPageHandlers/useHandleVoicePageNavigateToQuizFromBlock";
import { DescribePageVoiceHandlerProps } from "../../../../accessibility/voiceHandlers/useDescribePageVoiceHandler";
import { usePageVoiceCommands } from "../../../../accessibility/voiceHandlers/usePageVoiceCommands";
import { VoiceHandler } from "../../../../accessibility/voiceHandlers/VoiceHandler.types";
import { BuildingBlockProgress } from "../../../../context";
import {
  AudioUserCommand,
  AudioUserCommandType,
} from "../../../../context/contextTypes/voiceCommand.types";
import { blockIntroductionPageMessages } from "./appMessages";

export const useHandlerVoiceGoToNextWord = (
  navigateNextWord: () => void
): VoiceHandler => {
  const handle = useCallback(
    (command: AudioUserCommand) => {
      if (command.commandType !== AudioUserCommandType.GoToNextWord) {
        return false;
      }

      navigateNextWord();
      return true;
    },
    [navigateNextWord]
  );

  return {
    handle,
    avaiableCommands: [AudioUserCommandType.GoToNextWord],
  };
};

export const useHandlerVoiceReadCurrentWord = (
  listenCurrentWord: () => void
): VoiceHandler => {
  const handle = useCallback(
    (command: AudioUserCommand) => {
      if (command.commandType !== AudioUserCommandType.ReadThecurrentWord) {
        return false;
      }

      listenCurrentWord();
      return true;
    },
    [listenCurrentWord]
  );

  return {
    handle,
    avaiableCommands: [AudioUserCommandType.ReadThecurrentWord],
  };
};

export const useHandleVoicePageBlockIntroduction = (
  buildingBlockProgress: BuildingBlockProgress | undefined,
  navigateNextWord: () => void,
  listenCurrentWord: () => void
) => {
  const [describlePageProps] = useState<DescribePageVoiceHandlerProps>({
    playable: createPlayable([
      blockIntroductionPageMessages.greetingPageBlockIntroduction,
      blockIntroductionPageMessages.loadingBlockIntroduction,
    ]),
  });

  const navigateToQuizHandler = useHandleVoicePageNavigateToQuizFromBlock(
    buildingBlockProgress
  );

  const navigateToNextWordHandler =
    useHandlerVoiceGoToNextWord(navigateNextWord);

  const readCurrentWordHandler =
    useHandlerVoiceReadCurrentWord(listenCurrentWord);

  usePageVoiceCommands({
    describlePageProps,
    otherHandlers: [
      navigateToQuizHandler,
      navigateToNextWordHandler,
      readCurrentWordHandler,
    ],
  });
};
