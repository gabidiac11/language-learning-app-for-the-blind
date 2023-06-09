import { useEffect } from "react";
import {
  AudioAttributeEventDetail,
  eventNameAudioAttribute,
} from "./htmlAttributeAudioEvent";
import { useFeedbackAudioQueue } from "../../../context/hooks/useFeedbackAudiQueue";

const eventName = eventNameAudioAttribute;

/**
    This screen reader will dispatch an event when the focus gets on a element with these attributes:
    <h2
      tabindex="0"
      audio-player-path="word-2-dad.mp3"
      audio-player-text="папа"
      playing-key="word-2-dad.mp3"
      lang="ru"
    >
      папа
    </h2>

    This component is the one listening and executing this command
 */
export const useListenToPlayFromHtmlAttributes = () => {
  const { enqueuePlayableMessage } = useFeedbackAudioQueue();

  useEffect(() => {
    const playAudioFromAttributeNode = (
      e: CustomEvent<AudioAttributeEventDetail>
    ) => {
      if (e.detail.audioPath && e.detail.audioText) {
        enqueuePlayableMessage({
          key: `${e.detail.audioPath}`,
          messages: [
            {
              filePath: e.detail.audioPath,
              text: e.detail.audioText,
              uniqueName: e.detail.audioPath,
            },
          ],
        });
      }
    };
    window.addEventListener(eventName, playAudioFromAttributeNode);

    return () => {
      window.removeEventListener(eventName, playAudioFromAttributeNode);
    };
  }, [enqueuePlayableMessage]);
};
