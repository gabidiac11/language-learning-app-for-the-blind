import { useEffect, useRef, useState } from "react";
import {
  DescribePageVoiceHandlerProps,
  useDescribePageVoiceHandler,
} from "./useDescribePageVoiceHandler";
import { useGenericAudioHandlers } from "./useGenericAudioHandlers";
import { useNotAllowedVoiceHandler } from "./genericHanlders/useNotAllowedVoiceHandler";
import { VoiceHandler } from "./VoiceHandler.types";
import { useAppStateContext } from "../../context/hooks/useAppStateContext";
import { useVoiceCommandQueue } from "../../context/hooks/useVoiceCommandQueue";
import { genKey } from "../../constants";

export function usePageVoiceCommands(props: {
  describlePageProps: DescribePageVoiceHandlerProps;
  otherHandlers?: VoiceHandler[];
}) {
  const { deque, addVoiceHandler, removeVoiceHandler } = useVoiceCommandQueue();
  const { voiceCommandsQueue } = useAppStateContext();
  const genericHandler = useGenericAudioHandlers();
  const notAllowedHanlder = useNotAllowedVoiceHandler();
  const handlerKeyRef = useRef(genKey());

  const describeHanlder = useDescribePageVoiceHandler(props.describlePageProps);

  // let the global context that someone is handling these audio commands
  useEffect(() => {
    const pageAvailableCommands = [
      genericHandler,
      describeHanlder,
      ...(props.otherHandlers ?? []),
      notAllowedHanlder,
    ]
      .map((h) => h.avaiableCommands)
      .flatMap((h) => h);

    addVoiceHandler({ key: handlerKeyRef.current, pageAvailableCommands });
    return () => {
      removeVoiceHandler(handlerKeyRef.current);
    };
  }, [addVoiceHandler, removeVoiceHandler]);

  useEffect(() => {
    if (!voiceCommandsQueue.length) {
      return;
    }
    if(handlerKeyRef.current !== window.appCurrentVoiceHanlderId) {
      return;
    }

    const first = voiceCommandsQueue[0];
    const callbacks = [
      genericHandler.handle,
      describeHanlder.handle,
      ...(props.otherHandlers ?? []).map((h) => h.handle),
      notAllowedHanlder.handle,
    ];
    for (const callback of callbacks) {
      if (callback(first.command)) {
        break;
      }
    }
    deque(first.key);
  }, [voiceCommandsQueue]);
}
