import { useEffect, useState } from "react";
import { createPlayable } from "../../audioSpeaker/createPlayable";
import { AppMessage } from "../../types/appMessage.type";
import { DescribePageVoiceHandlerProps } from "../useDescribePageVoiceHandler";
import { usePageVoiceCommands } from "../usePageVoiceCommands";
import {
  QuizOption,
  QuizResponse,
} from "../../../context/contextTypes/quizTypes";
import { useHandleVoiceRespondQuiz } from "./useHandleVoiceRespondQuiz";

export const useHandleVoicePageQuiz = (
  pageDataLoadedMessage: AppMessage[] | AppMessage,
  instructionsMessage: AppMessage,
  quizResponse: QuizResponse | undefined,
  choose: (option: QuizOption) => void
) => {
  const [describlePageProps, setDescriblePageProps] =
    useState<DescribePageVoiceHandlerProps>({
      playable: createPlayable(pageDataLoadedMessage),
    });

  const respondQuizHandler = useHandleVoiceRespondQuiz(quizResponse, choose);

  usePageVoiceCommands({
    describlePageProps,
    otherHandlers: [respondQuizHandler],
  });

  useEffect(() => {
    // don't play "Wrong answer"/"Right answer" audio from the current response
    const previousVerdicts =
      quizResponse?.previousQuestionOutcomePlaybaleMessages ?? [];

    const messages = Array.isArray(pageDataLoadedMessage)
      ? pageDataLoadedMessage.filter((i) => {
          return !previousVerdicts.some(
            (prevVerdict) => prevVerdict.uniqueName === i.uniqueName
          );
        })
      : [pageDataLoadedMessage];

    // add instructions
    messages.push(instructionsMessage);

    setDescriblePageProps({
      playable: createPlayable(messages),
    });
  }, [pageDataLoadedMessage]);
};
