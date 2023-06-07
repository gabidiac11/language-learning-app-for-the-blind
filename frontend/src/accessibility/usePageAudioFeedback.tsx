import { useCallback, useEffect, useRef } from "react";
import { AppMessage } from "./accesibilityTypes";
import { errorAppMessages } from "./errorAppMessages";
import { generalAppMessages } from "./generalAppMessages";
import { PlayableError, PlayableMessage } from "./playableMessage";
import { useFeedbackAudioQueue } from "../context/hooks/useFeedbackAudiQueue";
import { genKey } from "../constants";

export const usePageAudioFeedback = (props: {
  error: PlayableError | undefined;
  loading: boolean;

  pageGreeting: AppMessage;
  pageDataLoadingMessage?: AppMessage;
  pageDataLoadedMessage: AppMessage | AppMessage[];
}) => {
  const { enqueuePlayableMessage, prematurelyStopPlayableMessages } =
    useFeedbackAudioQueue();
  const loadingTimeoutRef = useRef<NodeJS.Timeout>();

  const playingMessageKeysRef = useRef<string[]>([]);
  const greetingKeyRef = useRef(
    `${genKey()}-${props.pageGreeting.uniqueName}`
  );

  const loadingRef = useRef(props.loading);
  loadingRef.current = props.loading;

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
      // delay showing the loading message only if it takes too little to load
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = setTimeout(() => {
        if (!loadingRef.current) {
          return;
        }
        if(!props.pageDataLoadingMessage) {
          return;
        }
        const playableMessage: PlayableMessage = {
          key: `${genKey()}-${props.pageDataLoadingMessage.uniqueName}`,
          messages: [props.pageDataLoadingMessage],
        };
        playingMessageKeysRef.current.push(playableMessage.key);
        enqueuePlayableMessage(playableMessage);
      }, 1000);
      return;
    }

    if (!!props.error) {
      return;
    }

    const messages = Array.isArray(props.pageDataLoadedMessage)
      ? props.pageDataLoadedMessage
      : [props.pageDataLoadedMessage];
    // enqueue loading data feedback message
    const playableMessage: PlayableMessage = {
      key: `${genKey()}-${messages.map((i) => i.uniqueName).join("-")}`,
      messages,
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
      clearTimeout(loadingTimeoutRef.current);
      clearPlayingMessages();
      prematurelyStopPlayableMessages([greetingKeyRef.current]);
    };
  }, []);
};

export const usePreappendLoadedData = (
  mainMessage: AppMessage,
  text?: string,
  audioFile?: string,
  uninteruptableJustOnce?: boolean
) => {
  const loadedMessagesRef = useRef<AppMessage[]>([
    {
      filePath: audioFile ?? "",
      text: text ?? "",
      uniqueName: "",
    },
    mainMessage,
  ]);

  if (audioFile && text && !loadedMessagesRef.current[0].text) {
    loadedMessagesRef.current[0] = {
      filePath: audioFile,
      text: text,
      uniqueName: text,
      preventForcedStopOnCurrentPageJustOnce: uninteruptableJustOnce
    };
  }

  return loadedMessagesRef.current;
};


export const useAppendLoadedData = (
  mainMessage: AppMessage,
  tooltipLabel: string,
  audioFiles?: string[]
) => {
  const loadedMessagesRef = useRef<AppMessage[]>([
    mainMessage,
  ]);

  if (audioFiles && loadedMessagesRef.current.length === 1) {
    audioFiles.forEach(path => {
      loadedMessagesRef.current[0] = {
        filePath: path,
        text: tooltipLabel,
        uniqueName: path,
      };
    });
  }

  return loadedMessagesRef.current;
};