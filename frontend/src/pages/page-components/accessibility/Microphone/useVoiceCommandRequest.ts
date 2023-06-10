import { AxiosPromise } from "axios";
import { useCallback } from "react";
import { getPlayableErrorFromUnknown } from "../../../../accessibility/api/getPlayableErrorFromUnknown";
import { usePlayAppMessageFactory } from "../../../../accessibility/audioSpeaker/hooks/usePlayAppMessageFactory";
import axiosInstance from "../../../../axiosInstance";
import {
  UserVoiceCommandResponse,
} from "../../../../context/contextTypes/voiceCommand.types";
import { commandToString } from "../../../../accessibility/voiceCommandTypesStringUtils/commandToString";
import { useVoiceCommandQueue } from "../../../../context/hooks/useVoiceCommandQueue";
import { RecState } from "./microphone.types";

export const useVoiceCommandRequest = (props: {
  setRecState: (newRecState: RecState) => void;
  setCommandText: (value: string) => void;
}) => {
  const { playMessagePlayableAsync } = usePlayAppMessageFactory();
  const { singleEnque } = useVoiceCommandQueue();

  const sendVoiceCommandRequest = useCallback(
    async (blob: Blob) => {
      props.setRecState(RecState.FetchingCommand);

      try {
        const file = new File([blob], "audioFile.ogg");

        const formData = new FormData();
        formData.append("audioFile", file, "audioFile");

        const response = await (axiosInstance.post(
          `voice-commands`,
          formData
        ) as AxiosPromise<UserVoiceCommandResponse>);
        props.setCommandText(
          `${commandToString(response.data.command)}. User speech: "${
            response.data.userSpeechText
          }"`
        );
        singleEnque(response.data);
      } catch (error) {
        const playableError = getPlayableErrorFromUnknown(error);
        playMessagePlayableAsync(playableError.message);
      } finally {
        props.setRecState(RecState.NotRecording);
      }
    },
    [props.setRecState, playMessagePlayableAsync, props.setCommandText]
  );

  return sendVoiceCommandRequest;
};
