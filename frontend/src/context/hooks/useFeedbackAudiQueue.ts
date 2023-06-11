import { useCallback, useContext } from "react";
import { logAudioQueue } from "../../accessibility/audioSpeaker/logAudioQueue";
import { generalAppMessages } from "../../accessibility/staticAppMessages/generalAppMessages";
import { PlayableMessage } from "../../accessibility/types/playableMessage.type";
import { genKey } from "../../constants";
import { AppContext } from "../AppContext";
import { StateActionType } from "../contextTypes/ctxTypes";

export const useFeedbackAudioQueue = () => {
  const { dispatch } = useContext(AppContext);

  const enqueuePlayableMessage = useCallback(
    (playableMessage: PlayableMessage) => {
      logAudioQueue(`ENQUE(${playableMessage.key})`);
      dispatch({
        type: StateActionType.EnqueuePlayableMessage,
        payload: playableMessage,
      });
    },
    [dispatch]
  );

  const singleEnque = useCallback(
    (playableMessage: PlayableMessage) => {
      logAudioQueue(`SINGLE_ENQUEUE(${playableMessage.key})`);

      dispatch({
        type: StateActionType.SingleEnquePlayableMessages,
        payload: playableMessage,
      });
    },
    [dispatch]
  );

  const dequePlayableMessage = useCallback(
    (playableKey: string) => {
      logAudioQueue(`DEQUE(${playableKey})`);

      dispatch({
        type: StateActionType.DequePlayableMessages,
        payload: {
          playableKey,
        },
      });
    },
    [dispatch]
  );

  const prematurelyStopPlayableMessages = useCallback(
    (playableKeys: string[]) => {
      if(!playableKeys.length) {
        return;
      }
      console.log(`DEQUEUE_MULTIPLE(${playableKeys.join(",")})`);

      dispatch({
        type: StateActionType.PrematurelyStopPlayableMessages,
        payload: {
          playableKeys,
        },
      });
    },
    [dispatch]
  );

  const enqueueCantOpenALockedItemMessage = useCallback(() => {
    enqueuePlayableMessage({
      key: `${genKey()}-${generalAppMessages.cantOpenALockedItem.uniqueName}`,
      messages: [generalAppMessages.cantOpenALockedItem],
    });
  }, [enqueuePlayableMessage]);

  const emptyQueue = useCallback(
    () => {
      logAudioQueue(`EMPTY_QUEUE()`);

      dispatch({
        type: StateActionType.EmptyAudioQueue,
        payload: {},
      });
    },
    [dispatch]
  );

  return {
    enqueuePlayableMessage,
    prematurelyStopPlayableMessages,
    dequePlayableMessage,
    enqueueCantOpenALockedItemMessage,
    singleEnque,
    emptyQueue
  };
};
