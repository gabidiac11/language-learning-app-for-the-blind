import { useEffect, useState } from "react";
import { createPlayable } from "../../audioSpeaker/createPlayable";
import { AppMessage } from "../../types/appMessage.type";
import { DescribePageVoiceHandlerProps } from "../useDescribePageVoiceHandler";
import { usePageVoiceCommands } from "../usePageVoiceCommands";
import { AudioUserCommandType } from "../../../context/contextTypes/voiceCommand.types";

export const useHandleVoicePageQuizCompleted = (
  pageDataLoadedMessage: AppMessage | AppMessage[]
) => {
  const [describlePageProps, setDescriblePageProps] =
    useState<DescribePageVoiceHandlerProps>({
      playable: createPlayable(pageDataLoadedMessage),
      otherDescribables: [AudioUserCommandType.ReadAchievements],
    });
    

  usePageVoiceCommands({
    describlePageProps,
  });

  useEffect(() => {
    setDescriblePageProps({
      playable: createPlayable(pageDataLoadedMessage),
      otherDescribables: [AudioUserCommandType.ReadAchievements],
    });
  }, [pageDataLoadedMessage]);
};
