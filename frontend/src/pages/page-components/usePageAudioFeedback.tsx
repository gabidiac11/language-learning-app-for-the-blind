import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AppMessage } from "../../accessibility/accesibilityTypes";
import { errorAppMessages } from "../../accessibility/errorAppMessages";
import { generalAppMessages } from "../../accessibility/generalAppMessages";
import {
  PlayableError,
  PlayableMessage,
} from "../../accessibility/playableMessage";
import { useFeedbackAudioQueue } from "../../context/hooks/useFeedbackAudiQueue";

export const usePageAudioFeedback = (props: {
  error: PlayableError | undefined;
  loading: boolean;

  pageGreeting: AppMessage;
  pageDataLoadingMessage: AppMessage;
  pageDataLoadedMessage: AppMessage;
}) => {
  const { enqueuePlayableMessage, prematurelyStopPlayableMessages } =
    useFeedbackAudioQueue();

  const playingMessageKeysRef = useRef<string[]>([]);
  const greetingKeyRef = useRef(
    `${Date.now()}-${props.pageGreeting.uniqueName}`
  );

  /**
   * stop all audios enqueued so far (except for the greeting!)
   */
  const clearPlayingMessages = useCallback(() => {
    const playableKeys = [...playingMessageKeysRef.current];
    playingMessageKeysRef.current = [];
    prematurelyStopPlayableMessages(playableKeys);
  }, []);

  useEffect(() => {
    // enqueue page greeting
    const playableMessage: PlayableMessage = {
      key: greetingKeyRef.current,
      messages: [props.pageGreeting],
    };
    enqueuePlayableMessage(playableMessage);
  }, []);

  useEffect(() => {
    clearPlayingMessages();

    if (props.loading) {
      // enqueue loading data feedback message
      const playableMessage: PlayableMessage = {
        key: `${Date.now()}-${props.pageDataLoadingMessage.uniqueName}`,
        messages: [props.pageDataLoadingMessage],
      };
      playingMessageKeysRef.current.push(playableMessage.key);
      enqueuePlayableMessage(playableMessage);
      return;
    }

    if (!!props.error) {
      return;
    }
    // enqueue loading data feedback message
    const playableMessage: PlayableMessage = {
      key: `${Date.now()}-${props.pageDataLoadedMessage.uniqueName}`,
      messages: [props.pageDataLoadedMessage],
    };
    playingMessageKeysRef.current.push(playableMessage.key);
    enqueuePlayableMessage(playableMessage);
  }, [props.loading]);

  useEffect(() => {
    if (!props.error) {
      return;
    }

    clearPlayingMessages();
    const decoratedPlayableMessage: PlayableMessage = {
      ...props.error.message,
      messages: [
        errorAppMessages.operationFailed,
        ...props.error.message.messages,
        generalAppMessages.tryAgainFetchRequest,
      ],
    };
    playingMessageKeysRef.current.push(decoratedPlayableMessage.key);
    enqueuePlayableMessage(decoratedPlayableMessage);
  }, [props.error]);

  // stop all audio when the user exists a page
  useEffect(() => {
    return () => {
      clearPlayingMessages();
      prematurelyStopPlayableMessages([greetingKeyRef.current]);
    };
  }, []);
};
