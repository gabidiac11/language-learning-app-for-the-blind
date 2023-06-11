import { useState } from "react";
import { AudioUserCommandType } from "../../../context/contextTypes/voiceCommand.types";
import { DescribePageVoiceHandlerProps } from "../../../accessibility/voiceHandlers/useDescribePageVoiceHandler";
import { usePageVoiceCommands } from "../../../accessibility/voiceHandlers/usePageVoiceCommands";
import { PlayableMessage } from "../../../accessibility/types/playableMessage.type";
import { useHandleVoicePageNavigateToQuizFromEpilogue } from "../../../accessibility/voiceHandlers/quizPageHandlers/useHandleVoicePageNavigateToQuizFromEpilogue";
import { EpilogueProgress } from "../../../context";

export const useHandleVoicePageEpilogueStart = (
  pageDataLoadedMessagePlayable: PlayableMessage,
  epilogueProgress: EpilogueProgress | undefined
) => {
  const [describlePageProps] = useState<DescribePageVoiceHandlerProps>({
    playable: pageDataLoadedMessagePlayable,
    otherDescribables: [AudioUserCommandType.EpilogueReadShortStory],
  });

  const navigateToQuizHandler =
    useHandleVoicePageNavigateToQuizFromEpilogue(epilogueProgress);

  usePageVoiceCommands({
    describlePageProps,
    otherHandlers: [navigateToQuizHandler],
  });
};
