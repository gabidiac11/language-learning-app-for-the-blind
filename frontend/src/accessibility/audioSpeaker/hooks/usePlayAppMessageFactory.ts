import { useCallback } from "react";
import { useFeedbackAudioQueue } from "../../../context/hooks/useFeedbackAudiQueue";
import { AppMessage } from "../../types/appMessage.type";
import { PlayableMessage } from "../../types/playableMessage.type";
import { createPlayable } from "../createPlayable";
import { getListenableKeyFromPlayableKey } from "../getListenableKeyFromPlayable";

/**
 * create waitable callback that wraps start/end audio events within a promise
 * and uses the context actions
 * @returns
 */
export const usePlayAppMessageFactory = () => {
  const { singleEnque } = useFeedbackAudioQueue();

  const playMessagePlayableAsync = useCallback(
    async (playable: PlayableMessage) => {

      // establish listenable event names specifically for whole group of app messages
      const listenablePlayableKey = getListenableKeyFromPlayableKey(
        playable.key
      );
      const eventNameStart = `started-playing-message-${listenablePlayableKey}-app`;
      const eventNameEnd = `stopped-playing-message-${listenablePlayableKey}-app`;

      // declare listeners that will be cleaned up from the event once the audio stops
      const listeners: { eventName: string; listener: () => void }[] = [];
      let timeout: NodeJS.Timeout = setTimeout(() => {}, 0);

      const promise = new Promise<any>((resolve) => {
        const listenerStart = () => {};
        const listenerEnd = () => resolve({});
        listeners.push({ eventName: eventNameStart, listener: listenerStart });
        listeners.push({ eventName: eventNameEnd, listener: listenerEnd });

        document.addEventListener(eventNameStart, listenerStart);
        document.addEventListener(eventNameEnd, listenerEnd);
        singleEnque(playable);

        // to avoid getting stuck at the lost resort will add timeout limit
        timeout = setTimeout(() => {
          resolve({});
        }, 20000);
      });

      await promise;

      timeout && clearTimeout(timeout);
      listeners.forEach((l) => {
        document.removeEventListener(l.eventName, l.listener);
      });
    },
    [singleEnque]
  );

  const playAppMessageAsync = useCallback(
    async (appMessageOrMessages: AppMessage | AppMessage[]) => {
      const playable = createPlayable(appMessageOrMessages);
      await playMessagePlayableAsync(playable);
    },
    [playMessagePlayableAsync]
  );

  return {
    playAppMessageAsync,
    playMessagePlayableAsync
  };
};
