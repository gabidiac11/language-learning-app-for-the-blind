import { useState } from "react";
import { createPlayable } from "../../../../accessibility/audioSpeaker/createPlayable";
import { DescribePageVoiceHandlerProps } from "../../../../accessibility/voiceHandlers/useDescribePageVoiceHandler";
import { usePageVoiceCommands } from "../../../../accessibility/voiceHandlers/usePageVoiceCommands";
import { BuildingBlockProgress } from "../../../../context";
import { blockStartPageMessages } from "./appMessages";
import { useHandleVoicePageNavigateToWordsSummary } from "../useHandleVoicePageNavigateToWordsSummary";
import { useHandleVoicePageNavigateToQuizFromBlock } from "../../../../accessibility/voiceHandlers/quizPageHandlers/useHandleVoicePageNavigateToQuizFromBlock";

export const useHandleVoicePageBlockOverview = (
  buildingBlockProgress: BuildingBlockProgress | undefined
) => {
  const [describlePageProps] = useState<DescribePageVoiceHandlerProps>({
    playable: createPlayable([
      blockStartPageMessages.greetingPageBlockStart,
      blockStartPageMessages.loadedBlockStart,
    ]),
  });

  const navigateToSummaryHandler = useHandleVoicePageNavigateToWordsSummary(
    buildingBlockProgress
  );
  const navigateToQuizHandler = useHandleVoicePageNavigateToQuizFromBlock(
    buildingBlockProgress
  );

  usePageVoiceCommands({
    describlePageProps,
    otherHandlers: [navigateToSummaryHandler, navigateToQuizHandler],
  });
};
