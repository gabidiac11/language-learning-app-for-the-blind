import { useEffect } from "react";
import { usePlayAppMessageFactory } from "../../../../accessibility/audioSpeaker/hooks/usePlayAppMessageFactory";
import { isMicOnOffKeyboardEvent } from "../../../../accessibility/keyboardShortcuts";
import { micMessages } from "./appMessages";
import { RecState } from "./microphone.types";

/**
 * start/stop recoding by pressing ctrl + space
 * @param props
 */
export const useKeyboardMicControls = (props: {
  recState: RecState;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
}) => {
  const { playAppMessageAsync } = usePlayAppMessageFactory();
  useEffect(() => {
    const onSpaceKey = async (event: KeyboardEvent) => {
      if (!isMicOnOffKeyboardEvent(event)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();

      if (props.recState === RecState.FetchingCommand) {
        return;
      }
      if (props.recState === RecState.Recording) {
        props.stopRecording();
        return;
      }
      await playAppMessageAsync(micMessages.micRequested);
      props.startRecording();
    };
    document.addEventListener("keydown", onSpaceKey);

    return () => {
      document.removeEventListener("keydown", onSpaceKey);
    };
  }, [props.recState, props.startRecording, props.stopRecording]);
};
