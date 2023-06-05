import { useCallback, useContext } from "react";
import { PlayableMessage } from "../../accessibility/playableMessage";
import { AppContext } from "../AppContext";
import { StateActionType } from "../contextTypes/ctxTypes";

export const useFeedbackAudioQueue = () => {
  const { dispatch } = useContext(AppContext);

  const enqueuePlayableMessage = useCallback(
    (playableMessage: PlayableMessage) => {
      dispatch({
        type: StateActionType.EnqueuePlayableMessage,
        payload: playableMessage,
      });
    },
    [dispatch]
  );

  const dequePlayableMessage = useCallback(
    (playableKey: string) => {
      console.log(`[DEQUE]-${playableKey}`);

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
      console.log(`[DEQUE-multiple]-${playableKeys.join(",")}`);
      dispatch({
        type: StateActionType.PrematurelyStopPlayableMessages,
        payload: {
          playableKeys,
        },
      });
    },
    [dispatch]
  );

  return {
    enqueuePlayableMessage,
    prematurelyStopPlayableMessages,
    dequePlayableMessage,
  };
};
