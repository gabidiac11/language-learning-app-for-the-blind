import { useState } from "react";
import { createPlayable } from "../../../../../accessibility/audioSpeaker/createPlayable";
import { DescribePageVoiceHandlerProps } from "../../../../../accessibility/voiceHandlers/useDescribePageVoiceHandler";
import { usePageVoiceCommands } from "../../../../../accessibility/voiceHandlers/usePageVoiceCommands";
import { BuildingBlockProgress } from "../../../../../context";
import { useHandleVoicePageNavigateToQuizFromBlock } from "../../../../../accessibility/voiceHandlers/quizPageHandlers/useHandleVoicePageNavigateToQuizFromBlock";
import { blockIntroductionPageMessages } from "../appMessages";

export const useHandleVoicePageSummaryCompleted = (
  buildingBlockProgress: BuildingBlockProgress | undefined
) => {
  const [describlePageProps] = useState<DescribePageVoiceHandlerProps>({
    playable: createPlayable([
      blockIntroductionPageMessages.blockSummaryCompleted,
    ]),
  });

  const navigateToQuizHandler = useHandleVoicePageNavigateToQuizFromBlock(
    buildingBlockProgress
  );

  usePageVoiceCommands({
    describlePageProps,
    otherHandlers: [navigateToQuizHandler],
  });
};
