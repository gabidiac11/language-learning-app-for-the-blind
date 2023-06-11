import { MicRounded as Mic } from "@mui/icons-material";
import { CircularProgress, Tooltip } from "@mui/material";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePlayAppMessageFactory } from "../../../../accessibility/audioSpeaker/hooks/usePlayAppMessageFactory";

import {
  RecState,
  EventMediaListeners,
  MicPermissionStatus,
} from "./microphone.types";

import "./Microphone.scss";
import { useKeyboardMicControls } from "./useKeyboardMicControls";
import { micMessages } from "./appMessages";
import { useVoiceCommandRequest } from "./useVoiceCommandRequest";
import { useAppStateContext } from "../../../../context/hooks/useAppStateContext";
import {
  CommandInstructionSet,
  createCommandInstructionSet,
} from "../../../../accessibility/voiceCommandTypesStringUtils/commandInstructionSet";

export const Microphone = () => {
  const [recState, setRecState] = useState<RecState>(RecState.NotRecording);

  const [permission, setPermission] = useState<MicPermissionStatus>(
    MicPermissionStatus.Unknown
  );
  const [audioBlob, setAudioBlob] = useState<Blob>();

  const [commandText, setCommandText] = useState<string>();
  const commandTextTimeoutRef = useRef<NodeJS.Timeout>();

  const recorderRef = useRef<MediaRecorder>();
  const listeners = useRef<EventMediaListeners>();
  const beforeDialogRef = useRef<(event: BeforeUnloadEvent) => void>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const [commandInstrSet, setCommandInstrSet] =
    useState<CommandInstructionSet>();
  const [allowInstructionToolTip, setAllowInstructionTooltip] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const sendVoiceCommandRequest = useVoiceCommandRequest({
    setRecState: (newRecState: RecState) => setRecState(newRecState),
    setCommandText: (value: string) => {
      setCommandText(value);
      clearTimeout(commandTextTimeoutRef.current);
      commandTextTimeoutRef.current = setTimeout(() => {
        setCommandText(undefined);
      }, 7000);
    },
  });

  const { voiceHandlers } = useAppStateContext();

  const { playAppMessageAsync } = usePlayAppMessageFactory();

  const removeMediaEventListeners = useCallback(() => {
    if (listeners.current) {
      const l = listeners.current;
      const r = recorderRef.current;
      r?.removeEventListener("dataavailable", l.dataavailable);
      r?.removeEventListener("stop", l.stop);

      listeners.current = undefined;
    }
  }, []);

  const getMediaPermission =
    useCallback(async (): Promise<MicPermissionStatus> => {
      console.log(
        "Playing - media popup might open. Pless tab twice then enter to allow."
      );

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        stream.getTracks().forEach((track) => track.stop());
        return MicPermissionStatus.Granted;
      } catch (error) {
        console.error("Error accessing microphone:", { error });
        return MicPermissionStatus.Denied;
      }
    }, []);

  const stopRecording = useCallback(async () => {
    recorderRef.current?.stop();
  }, []);

  const startRecording = useCallback(async () => {
    let currentPermisson = permission;
    if (permission === MicPermissionStatus.Unknown) {
      currentPermisson = await getMediaPermission();
      setPermission(currentPermisson);
    }
    if (currentPermisson === MicPermissionStatus.Denied) {
      await playAppMessageAsync(micMessages.micPermissionDenied);
      return;
    }
    if (voiceHandlers.length === 0) {
      await playAppMessageAsync(micMessages.noVoiceCommandsOnThisPage);
      return;
    }

    setRecState(RecState.Recording);
    await playAppMessageAsync(micMessages.micOn);
    setAudioBlob(undefined);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorderRef.current = new MediaRecorder(stream);
    const chunks: Blob[] = [];

    listeners.current = {
      dataavailable: (event) => {
        chunks.push(event.data);
      },
      stop: async () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(audioBlob);

        sendVoiceCommandRequest(audioBlob);

        clearTimeout(timeoutRef.current);
        removeMediaEventListeners();
      },
    };

    const l = listeners.current;
    recorderRef.current.addEventListener("dataavailable", l.dataavailable);
    recorderRef.current.addEventListener("stop", l.stop);

    recorderRef.current.start();

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      stopRecording();
    }, 30000);
  }, [playAppMessageAsync, stopRecording, voiceHandlers]);

  useKeyboardMicControls({ recState, startRecording, stopRecording });

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
      removeMediaEventListeners();

      beforeDialogRef.current &&
        window.addEventListener("beforeunload", beforeDialogRef.current);
    };
  }, []);

  useEffect(() => {
    return () => clearTimeout(commandTextTimeoutRef.current);
  }, []);

  useEffect(() => {
    const instance = createCommandInstructionSet(voiceHandlers);
    setCommandInstrSet(instance);
  }, [voiceHandlers]);

  useEffect(() => {
    const setAllowTrue = () => {
      setAllowInstructionTooltip(true);
    };
    const setAllowFalse = () => {
      setAllowInstructionTooltip(false);
    };

    if (buttonRef.current) {
      buttonRef.current.addEventListener("focus", setAllowTrue);
      buttonRef.current.addEventListener("blur", setAllowFalse);

      buttonRef.current.addEventListener("mouseover", setAllowTrue);
      buttonRef.current.addEventListener("mouseleave", setAllowFalse);

      window.addEventListener("click", setAllowFalse);
    }
    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener("focus", setAllowTrue);
        buttonRef.current.removeEventListener("blur", setAllowFalse);

        buttonRef.current.addEventListener("mouseover", setAllowTrue);
        buttonRef.current.addEventListener("mouseleave", setAllowFalse);
      }
      window.addEventListener("click", setAllowFalse);
    };
  }, []);

  useEffect(() => {
    const hideCommandText = () => {
      setCommandText(undefined);
      clearTimeout(commandTextTimeoutRef.current);
    };

    buttonRef.current &&
      buttonRef.current.addEventListener("mouseover", hideCommandText);

    window.addEventListener("click", hideCommandText);
    return () => {
      buttonRef.current &&
        buttonRef.current.addEventListener("mouseover", hideCommandText);

      window.addEventListener("click", hideCommandText);
    };
  }, []);

  const ariaLabel =
    voiceHandlers.length === 0
      ? micMessages.noVoiceCommandsOnThisPage.text
      : !permission
      ? micMessages.micPermissionDenied.text
      : "Mic, Enter/click or control + space to record your command. " +
        (!!commandInstrSet ? commandInstrSet.getAriaLabel() : "");

  const toolTipValue = (() => {
    if (commandText) {
      return commandText;
    }

    if (!!commandInstrSet && allowInstructionToolTip) {
      return (
        <div className="voice-commands-instructions">
          <h5>Available commands: </h5>
          {commandInstrSet.getInstructionItems().map((instruction, index) => (
            <div className="instruction-group" key={index}>
              <p className="instruction-tittle">{instruction.label}</p>
              <ul>
                {instruction.phrases.map((phrase, indexChild) => (
                  <li key={indexChild}>{phrase}</li>
                ))}
              </ul>
            </div>
          ))}
          <h5>Ctrl + space to record/stop</h5>
        </div>
      );
    }
    return undefined;
  })();

  return (
    <div className="page-mic">
      <button
        ref={buttonRef}
        tabIndex={0}
        className={`no-btn mic-btn ${
          !permission || voiceHandlers.length === 0 ? "is-disabled" : ""
        }`}
        aria-label={ariaLabel}
        onClick={
          recState === RecState.Recording
            ? stopRecording
            : recState === RecState.FetchingCommand
            ? () => {}
            : startRecording
        }
      >
        {recState !== RecState.FetchingCommand && (
          <Tooltip
            placement="right-end"
            title={toolTipValue}
            open={!!toolTipValue}
          >
            <Mic
              className="feedbackMic"
              htmlColor={recState === RecState.Recording ? "red" : "white"}
            />
          </Tooltip>
        )}
        {recState === RecState.FetchingCommand && (
          <div className="feedbackMic">
            <CircularProgress
              className="spinner-mic"
              onClick={() => setRecState(RecState.NotRecording)}
              color="secondary"
            />
          </div>
        )}
      </button>
      {window.showMicOutput === true && audioBlob && (
        <audio controls>
          <source
            key={audioBlob.size}
            src={URL.createObjectURL(audioBlob)}
            type="audio/webm"
          />
        </audio>
      )}
    </div>
  );
};
