import { useCallback, useContext } from "react";
import { PlayableMessage } from "../../accessibility/types/playableMessage.type";
import { genKey } from "../../constants";
import { AppContext } from "../AppContext";
import { StateActionType, VoicePageHandler } from "../contextTypes/ctxTypes";
import {
  UserVoiceCommandCtxItem,
  UserVoiceCommandResponse,
} from "../contextTypes/voiceCommand.types";

export const useVoiceCommandQueue = () => {
  const { dispatch } = useContext(AppContext);

  const singleEnque = useCallback(
    (voiceResponse: UserVoiceCommandResponse) => {
      dispatch({
        type: StateActionType.SingleEnqueVoiceCommand,
        payload: {
          key: genKey(),
          command: voiceResponse.command,
          userSpeechText: voiceResponse.userSpeechText,
        } as UserVoiceCommandCtxItem,
      });
    },
    [dispatch]
  );

  const deque = useCallback(
    (voiceCommandKey: string) => {
      dispatch({
        type: StateActionType.DequeueVoiceCommand,
        payload: {
          key: voiceCommandKey,
        },
      });
    },
    [dispatch]
  );

  const addVoiceHandler = useCallback(
    (voicePageHandler: VoicePageHandler) => {
      dispatch({
        type: StateActionType.AddActiveVoiceHandler,
        payload: voicePageHandler,
      });
    },
    [dispatch]
  );

  const removeVoiceHandler = useCallback(
    (voiceHanlderKey: string) => {
      dispatch({
        type: StateActionType.RemoveActiveVoiceHandler,
        payload: {
          key: voiceHanlderKey,
        },
      });
    },
    [dispatch]
  );

  return {
    deque,
    singleEnque,
    addVoiceHandler,
    removeVoiceHandler,
  };
};
