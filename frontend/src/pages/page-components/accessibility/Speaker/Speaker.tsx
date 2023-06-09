import {
  Speaker as SpeakerIcon,
  WarningSharp as WarningIcon
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  AppAudioPlayer,
  AudioAttributeEventDetail,
  audioPlayEvents
} from "../../../../accessibility/appReaders";
import { generalAppMessages } from "../../../../accessibility/staticAppMessages/generalAppMessages";
import { PlayableMessage } from "../../../../accessibility/types/playableMessage.type";
import { genKey } from "../../../../constants";
import { useAppStateContext } from "../../../../context/hooks/useAppStateContext";
import { useContextActions } from "../../../../context/hooks/useContextActions";
import { useFeedbackAudioQueue } from "../../../../context/hooks/useFeedbackAudiQueue";

import "./Speaker.scss";

export function Speaker() {
  const audioRef = useRef<AppAudioPlayer>(new AppAudioPlayer(new Audio()));

  const [currentPlayable, setCurrentPlayable] = useState<PlayableMessage>();
  const currentPlayingKeyRef = useRef<string>();

  const [isPlaying, setIsPlaying] = useState(false);

  const {
    dequePlayableMessage, enqueuePlayableMessage, prematurelyStopPlayableMessages,
  } = useFeedbackAudioQueue();
  const { setIsAudioInteractionOn } = useContextActions();
  const { isAudioInteractionOn, playableAudiosQueue } = useAppStateContext();

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
    console.log(
      `[PLAYABLES]: `,
      JSON.parse(JSON.stringify(playableAudiosQueue))
    );
    if (playableAudiosQueue.length === 0) {
      currentPlayingKeyRef.current = undefined;
      setCurrentPlayable(undefined);
      return;
    }
    const first = playableAudiosQueue[0];

    if (first.key !== currentPlayable?.key) {
      currentPlayingKeyRef.current = first.key;
      setCurrentPlayable(first);
    }
  }, [m]);

  useEffect(() => {
    if (!currentPlayable) {
      audioRef.current.stopAnyAudio();
      return;
    }

    audioRef.current.playAudio(currentPlayable);
  }, [currentPlayable]);

  useEffect(() => {
    audioRef.current.addEventListener(
      audioPlayEvents.PlayingStateChange,
      () => {
        if (audioRef.current.isPlaying) {
          setIsAudioInteractionOn(true);
        }
        setIsPlaying(audioRef.current.isPlaying);
      }
    );
    audioRef.current.addEventListener(audioPlayEvents.PlayableFinished, (v) => {
      const [playableKey] = v;
      dequePlayableMessage(playableKey);
    });
  }, []);

  useEffect(() => {
    const forceStopAllListener = () => {
      prematurelyStopPlayableMessages(playableAudiosQueue.map((i) => i.key));
    };
    window.addEventListener(
      "prematurelyStopPlayableMessages",
      forceStopAllListener
    );

    return () => {
      window.removeEventListener(
        "prematurelyStopPlayableMessages",
        forceStopAllListener
      );
    };
  }, [playableAudiosQueue]);

  useEffect(() => {
    const playAudioFromAttributeNode = (
      e: CustomEvent<AudioAttributeEventDetail>
    ) => {
      if (e.detail.audioPath && e.detail.audioText) {
        enqueuePlayableMessage({
          key: `${e.detail.audioPath}`,
          messages: [
            {
              filePath: e.detail.audioPath,
              text: e.detail.audioText,
              uniqueName: e.detail.audioPath,
            },
          ],
        });
      }
    };
    window.addEventListener(
      "request-audio-play-from-node-attribute-event",
      playAudioFromAttributeNode
    );

    return () => {
      window.removeEventListener(
        "request-audio-play-from-node-attribute-event",
        playAudioFromAttributeNode
      );
    };
  }, [enqueuePlayableMessage]);

  return (
    <div className="flex speaker-container">
      <div
        className={`audioPlayer ${!isAudioInteractionOn ? "audio-no-interaction" : ""}`}
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
            }} />
        </Tooltip>

        {!isAudioInteractionOn && (
          <WarningIcon
            fontSize={"large"}
            color="warning"
            aria-hidden="true"
            className="warning-icon" />
        )}
      </div>
      <SpeakerIcon aria-hidden="true" htmlColor={isPlaying ? "red" : "white"} />
    </div>
  );
}
