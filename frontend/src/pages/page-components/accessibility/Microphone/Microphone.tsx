import { MicRounded as Mic } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePlayAppMessageFactory } from "../../../../accessibility/audioSpeaker/hooks/usePlayAppMessageFactory";

import { RecState, EventMediaListeners, MicPermissionStatus } from "./microphone.types";

import "./Microphone.scss";

export const Microphone = () => {
  const [recState, setRecState] = useState<RecState>(RecState.NotRecording);

  const [permission, setPermission] = useState<MicPermissionStatus>(
    MicPermissionStatus.Unknown
  );
  const [audioBlob, setAudioBlob] = useState<Blob>();

  const recorderRef = useRef<MediaRecorder>();
  const listeners = useRef<EventMediaListeners>();
  const beforeDialogRef = useRef<(event: BeforeUnloadEvent) => void>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const { playAppMessageAsync } = usePlayAppMessageFactory();

  const informUserPermissionDenied = useCallback(() => {
    // TODO:
    console.log("Media denied. Please allow media from chrome settings.");
  }, []);

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
      // TODO:
      // await playAppMessageAsync();
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
  // TODO: review the usage of useCallback
  // TODO: make this not vissible untill audio interactions is on

  const startRecording = useCallback(async () => {
    if (permission === MicPermissionStatus.Unknown) {
      const knownPermission = await getMediaPermission();
      setPermission(knownPermission);
      if (knownPermission === MicPermissionStatus.Denied) {
        informUserPermissionDenied();
        return;
      }
    }

    setRecState(RecState.Recording);
    setAudioBlob(undefined);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorderRef.current = new MediaRecorder(stream);
    const chunks: Blob[] = [];

    listeners.current = {
      dataavailable: (event) => {
        chunks.push(event.data);
      },
      stop: () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(audioBlob);
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
  }, [informUserPermissionDenied]);

  const stopRecording = useCallback(() => {
    recorderRef.current?.stop();

    clearTimeout(timeoutRef.current);
    removeMediaEventListeners();

    setRecState(RecState.FetchingCommand);
    // TODO: send to server the command
  }, [removeMediaEventListeners]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
      removeMediaEventListeners();

      beforeDialogRef.current &&
        window.addEventListener("beforeunload", beforeDialogRef.current);
    };
  }, []);

  return (
    <div className="page-mic">
      <button
        tabIndex={0}
        className="no-btn mic-btn"
        aria-label="Mic, Enter/click to record your command"
        onClick={
          recState === RecState.Recording
            ? stopRecording
            : recState === RecState.FetchingCommand
            ? () => {}
            : startRecording
        }
        disabled={!permission}
      >
        {recState !== RecState.FetchingCommand && (
          <Mic
            className="feedbackMic"
            htmlColor={recState === RecState.Recording ? "red" : "white"}
          />
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
      {audioBlob && (
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
