import { Button } from "@mui/material";
import { useRef, useEffect, useCallback, useState } from "react";
import { BuildingBlockProgress, Word } from "../../../../context";
import { VolumeUp as PlayIcon } from "@mui/icons-material";
import { StopCircle as StopIcon } from "@mui/icons-material";
import { useFeedbackAudioQueue } from "../../../../context/hooks/useFeedbackAudiQueue";
import { createPlayableGroupFromWord } from "./createPlayableGroupFromWord";
import { languages } from "../../../../constants";
import { getListenableKeyFromPlayableKey } from "../../../../accessibility/audioSpeaker/getListenableKeyFromPlayable";
import { useIsPlayingAudioMessage } from "../../../../accessibility/audioSpeaker/hooks/useIsPlayingAudioMessage";
import { useHandleVoicePageBlockIntroduction } from "./useHandleVoicePageBlockIntroduction";

export const BlockWordSummary: React.FC<{
  word: Word;
  blockProgress: BuildingBlockProgress;
  isFirst: boolean;
  next: () => void;
}> = (props) => {
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const playBtnTriggeredRef = useRef<boolean>();

  const playableKeyRef = useRef<string>();
  const [playableKey, _setPlayableKey] = useState<string>("");

  const isListening = useIsPlayingAudioMessage(playableKey);
  const { enqueuePlayableMessage, singleEnque, dequePlayableMessage } =
    useFeedbackAudioQueue();

  useHandleVoicePageBlockIntroduction(
    props.blockProgress,
    () => {
      props.next();
    },
    () => {
      playBtnRef.current?.click();
    }
  );

  const setPlayableKey = useCallback((value: string) => {
    playableKeyRef.current = value;
    playableKeyRef.current &&
      _setPlayableKey(getListenableKeyFromPlayableKey(playableKeyRef.current));
  }, []);

  const listenWord = useCallback(
    (nonSingle?: boolean) => {
      if (isListening) {
        playableKeyRef.current && dequePlayableMessage(playableKeyRef.current);
        return;
      }
      const groupPlayable = createPlayableGroupFromWord(props.word);
      setPlayableKey(groupPlayable.key);
      !nonSingle && singleEnque(groupPlayable);
      nonSingle && enqueuePlayableMessage(groupPlayable);
    },
    [isListening]
  );

  useEffect(() => {
    if (playBtnRef.current) {
      playBtnTriggeredRef.current = true;
      playBtnRef.current.focus();
    }
  }, []);

  return (
    <div aria-label={`wrapper for word to learn`}>
      <h2
        tabIndex={0}
        audio-player-path={props.word.audioFile}
        audio-player-text={props.word.text}
        playing-key={props.word.audioFile}
        lang="ru"
      >
        {props.word.text}
      </h2>
      <p
        tabIndex={0}
        aria-label={`text: Word translation: ${props.word.shortTranslation} - ${
          props.word.longTranslation
        }. Press tab to go to play the word in ${
          languages.find((l) => l.id === props.word.lang)?.name ??
          "the foreign language"
        }`}
      >
        {props.word.shortTranslation} - {props.word.longTranslation}
      </p>

      <div style={{ margin: "30px 0" }}>
        <div>
          <Button
            tabIndex={0}
            aria-label="button: Play the word. Press enter to stop."
            aria-hidden={isListening ? "true" : "false"}
            ref={playBtnRef}
            color={isListening ? "secondary" : "primary"}
            startIcon={isListening ? <StopIcon /> : <PlayIcon />}
            style={{ marginBottom: "20px" }}
            variant="contained"
            onFocus={() => {
              if (playBtnTriggeredRef.current) {
                listenWord(props.isFirst);
                playBtnTriggeredRef.current = false;
              }
            }}
            onClick={(event) => {
              event.stopPropagation(); // stop propagation to the screen reader to avoid him interupting
              listenWord();
              playBtnTriggeredRef.current = false;
            }}
          >
            {isListening ? "Playing..." : "Play word"}
          </Button>
        </div>
        <div>
          <Button
            tabIndex={0}
            aria-label="Next word button"
            variant="contained"
            onClick={(event) => {
              event.stopPropagation();
              props.next();
            }}
          >
            Next word
          </Button>
        </div>
      </div>
    </div>
  );
};
