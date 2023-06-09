import { useEffect } from "react";
import { useAppStateContext } from "../../../context/hooks/useAppStateContext";
import { useFeedbackAudioQueue } from "../../../context/hooks/useFeedbackAudiQueue";
import { eventNamePrematureStopAudio } from "../audioEvents";

export const usePrematureStopAudioListener = () => {
  const { prematurelyStopPlayableMessages } = useFeedbackAudioQueue();
  const { playableAudiosQueue, isAudioInteractionOn } = useAppStateContext();

  useEffect(() => {
    const forceStopAllListener = () => {
      if(!isAudioInteractionOn) {
        return;
      }
      const keysPlayableToStop = playableAudiosQueue.map((i) => i.key);
      if(!keysPlayableToStop.length) return;
      
      prematurelyStopPlayableMessages(playableAudiosQueue.map((i) => i.key));
    };
    window.addEventListener(eventNamePrematureStopAudio, forceStopAllListener);

    return () => {
      window.removeEventListener(
        eventNamePrematureStopAudio,
        forceStopAllListener
      );
    };
  }, [playableAudiosQueue, isAudioInteractionOn]);
};

export const emitPrematurStopAudio = () => {
  const event = new CustomEvent(eventNamePrematureStopAudio, {
    detail: {},
  });
  window.dispatchEvent(event);
};