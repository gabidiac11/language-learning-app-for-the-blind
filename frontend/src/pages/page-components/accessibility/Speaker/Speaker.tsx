import {
  Speaker as SpeakerIcon,
  WarningSharp as WarningIcon,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { AppAudioPlayer } from "../../../../accessibility/appReaders";
import { audioPlayEvents } from "../../../../accessibility/audioSpeaker/audioEvents";
import { generalAppMessages } from "../../../../accessibility/staticAppMessages/generalAppMessages";
import { PlayableMessage } from "../../../../accessibility/types/playableMessage.type";
import { genKey } from "../../../../constants";
import { useAppStateContext } from "../../../../context/hooks/useAppStateContext";
import { useContextActions } from "../../../../context/hooks/useContextActions";
import { useFeedbackAudioQueue } from "../../../../context/hooks/useFeedbackAudiQueue";

import "./Speaker.scss";
import { useListenToPlayFromHtmlAttributes } from "../../../../accessibility/audioSpeaker/htmlAttributeAudio/useListenToPlayFromHtmlAttributes";
import { usePrematureStopAudioListener } from "../../../../accessibility/audioSpeaker/hooks/usePrematureStopAudioListener";
import { logAudioQueue } from "../../../../accessibility/audioSpeaker/logAudioQueue";

export function Speaker() {
  const audioRef = useRef<AppAudioPlayer>(new AppAudioPlayer(new Audio()));

  const [currentPlayable, setCurrentPlayable] = useState<PlayableMessage>();

  const [isPlaying, setIsPlaying] = useState(false);

  const { dequePlayableMessage, enqueuePlayableMessage } =
    useFeedbackAudioQueue();
  const { setIsAudioInteractionOn } = useContextActions();
  const { isAudioInteractionOn, playableAudiosQueue } = useAppStateContext();

  useListenToPlayFromHtmlAttributes();
  usePrematureStopAudioListener();

  const setInteractionActive = () => {
    if (isAudioInteractionOn) {
      return;
    }
    enqueuePlayableMessage({
      key: `${genKey()}-test-interaction-active`,
      messages: [generalAppMessages.interactionIsOn],
    });
  };

  const m = playableAudiosQueue.map((i) => i.key).join(",");
  useEffect(() => {
    logAudioQueue(`QUEUE-CHANGE`, playableAudiosQueue);

    if (playableAudiosQueue.length === 0) {
      setCurrentPlayable(undefined);
      return;
    }
    const first = playableAudiosQueue[0];

    if (first.key !== currentPlayable?.key) {
      setCurrentPlayable(first);
    }
  }, [m]);

  useEffect(() => {
    // all playable items have been dequeued -> stop any currently playing
    if (!currentPlayable) {
      audioRef.current.stopAnyAudio();
      return;
    }

    audioRef.current.playAudio(currentPlayable);
  }, [currentPlayable]);

  useEffect(() => {
    const onPlayingStateChange = () => {
      if (audioRef.current.isPlaying) {
        setIsAudioInteractionOn(true);
      }
      setIsPlaying(audioRef.current.isPlaying);
    };

    audioRef.current.addEventListener(
      audioPlayEvents.PlayingStateChange,
      onPlayingStateChange
    );
    return () => {
      audioRef.current.removeEventListener(
        audioPlayEvents.PlayingStateChange,
        onPlayingStateChange
      );
    };
  }, []);

  useEffect(() => {
    const onPlayableFinished = (v: string[]) => {
      const [playableKey] = v;
      dequePlayableMessage(playableKey);
    };

    audioRef.current.addEventListener(
      audioPlayEvents.PlayableFinished,
      onPlayableFinished
    );

    return () => {
      audioRef.current.removeEventListener(
        audioPlayEvents.PlayableFinished,
        onPlayableFinished
      );
    };
  }, []);

  return (
    <div className="flex speaker-container">
      <div
        className={`audioPlayer ${
          !isAudioInteractionOn ? "audio-no-interaction" : ""
        }`}
      >
        <Tooltip
          title={audioRef.current.currentTextPlaying}
          open={isPlaying && !!currentPlayable}
        >
          <audio
            id="play-audio"
            {...(isAudioInteractionOn
              ? {
                  tabIndex: -1,
                  "aria-hidden": true,
                  onFocus: (event) => event.target.blur(),
                }
              : {
                  tabIndex: 0,
                })}
            onClick={setInteractionActive}
            onFocus={setInteractionActive}
            onKeyDown={setInteractionActive}
            controls={true}
            ref={(audioNode) => {
              if (audioNode) {
                audioRef.current.audio = audioNode;
              }
            }}
          />
        </Tooltip>

        {!isAudioInteractionOn && (
          <WarningIcon
            fontSize={"large"}
            color="warning"
            aria-hidden="true"
            className="warning-icon"
          />
        )}
      </div>
      <SpeakerIcon aria-hidden="true" htmlColor={isPlaying ? "red" : "white"} />
    </div>
  );
}
