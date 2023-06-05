import {
  MicRounded as Mic,
  Speaker as SpeakerIcon,
  WarningSharp as WarningIcon,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { generalAppMessages } from "../../../accessibility/generalAppMessages";
import { PlayableMessage } from "../../../accessibility/playableMessage";
import { useAppStateContext } from "../../../context/hooks/useAppStateContext";
import { useContextActions } from "../../../context/hooks/useContextActions";
import { useFeedbackAudioQueue } from "../../../context/hooks/useFeedbackAudiQueue";
import "./SoundInterationPanel.scss";

export const SoundInterationPanel = () => {
  return (
    <div aria-label="Sound controls" className="flex sound-interaction-panel">
      <Speaker />
      <button
        tabIndex={0}
        className="no-btn mic-btn"
        aria-label="Mic, Click to record your command"
      >
        <Mic htmlColor="white" />
      </button>
    </div>
  );
};

const audioPlayEvents = {
  PlayingStateChange: "playing-state-change",
  PlayableFinished: "playable-finished",
};

class AppAudioPlayer {
  public audio: HTMLAudioElement;

  // NOTE: take care to bind() in case this is involved
  private _onPlay = () => {};
  private _onPause = () => {};
  private _onError = (event: any) => {};
  private _onEnded = () => {};
  private _onUrlLoaded = () => {};

  public isPlaying: boolean = false;
  public isPaused: boolean = false;

  private playablePromiseEventName = "cancel-any-playable-item-promise";

  constructor(audio: HTMLAudioElement) {
    this.audio = audio;
  }

  public async playAudio(currentPlayable: PlayableMessage) {
    this.stopAnyAudio();

    for (const message of currentPlayable.messages) {
      let allAborted = false;

      try {
        await (async () =>
          new Promise((resolve, reject) => {
            // add this event to force this promise to fail when we want to abort playing this playble item all together
            document.addEventListener(this.playablePromiseEventName, () => {
              console.log("Force stop audio:", currentPlayable.key);
              allAborted = true;
              reject({ forcedStopped: true });
            });

            // asign all handlers to this class so they can be removed later
            this._onPlay = () => {
              console.log(`[ON-PLAY]: Audio-${currentPlayable.key}`);

              this.setIsPlaying(true, currentPlayable.key);
              this.isPaused = false;
            };
            this._onPause = () => {
              console.log(`[ON-PLAY]: Audio-${currentPlayable.key}`);

              this.setIsPlaying(false, currentPlayable.key);
              this.isPaused = true;
            };
            this._onError = (event: any) => {
              console.log(`[ERROR]: Audio-${currentPlayable.key}`);

              this.setIsPlaying(false, currentPlayable.key);
              this.isPaused = false;
              reject(event);
            };
            this._onEnded = () => {
              console.log(`[ENDED]: Audio-${currentPlayable.key}`);

              this.setIsPlaying(false, currentPlayable.key);
              this.isPaused = false;
              resolve({});
            };
            this._onUrlLoaded = () => {
              console.log(`[URL-LOADED]: Audio-${currentPlayable.key}`);
              this.audio.play();
            };

            if (allAborted) {
              return;
            }

            this.audio.src = message.filePath;
            this.addAudioEventListeners();
          })).bind(this)();
      } catch (e) {
        console.log("audio error", { e, message, currentPlayable });
      }
      if (allAborted) {
        break;
      }
      this.removeAudioEventListeners();
    }

    this.emitEvent(audioPlayEvents.PlayableFinished, [currentPlayable.key]);
  }

  private setIsPlaying(value: boolean, playableKey: string) {
    this.isPlaying = value;
    this.emitEvent(audioPlayEvents.PlayingStateChange, [playableKey]);
  }

  public stopAnyAudio() {
    this.pauseIfPlaying();
    this.removeAudioEventListeners();
    this.stopOngoingAudioPromise();
    this.setIsPlaying(false, "");
    this.isPaused = false;
  }

  public resumeAudio() {
    if (!this.isPaused) {
      return;
    }
    try {
      this.audio.play();
    } catch (e) {}
  }
  public pauseIfPlaying() {
    if (this.isPaused) {
      return;
    }
    try {
      this.audio.pause();
    } catch (e) {}
  }

  private addAudioEventListeners() {
    this.audio.addEventListener("loadedmetadata", this._onUrlLoaded.bind(this));
    this.audio.addEventListener("play", this._onPlay.bind(this));
    this.audio.addEventListener("pause", this._onPause.bind(this));
    this.audio.addEventListener("error", this._onError.bind(this));
    this.audio.addEventListener("ended", this._onEnded.bind(this));
  }
  private removeAudioEventListeners() {
    this.audio.removeEventListener(
      "loadedmetadata",
      this._onUrlLoaded.bind(this)
    );
    this.audio.removeEventListener("play", this._onPlay.bind(this));
    this.audio.removeEventListener("pause", this._onPause.bind(this));
    this.audio.removeEventListener("error", this._onError.bind(this));
    this.audio.removeEventListener("ended", this._onEnded.bind(this));
  }

  private stopOngoingAudioPromise = () => {
    const stopAnyOngoingPromise = new CustomEvent(
      this.playablePromiseEventName,
      { detail: {} }
    );
    document.dispatchEvent(stopAnyOngoingPromise);
  };

  private eventListeners: {
    [eventName: string]: ((values: string[]) => void)[];
  } = {};

  addEventListener(eventName: string, listener: (values: string[]) => void) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    this.eventListeners[eventName].push(listener);
  }

  removeEventListener(eventName: string, listener: (values: string[]) => void) {
    if (this.eventListeners[eventName]) {
      this.eventListeners[eventName] = this.eventListeners[eventName].filter(
        (l) => l !== listener
      );
    }
  }

  private emitEvent(eventName: string, values: string[]) {
    if (this.eventListeners[eventName]) {
      this.eventListeners[eventName].forEach((listener) => {
        listener(values);
      });
    }
  }
}

const Speaker = () => {
  const counterRef = useRef<NodeJS.Timeout>();

  const audioRef = useRef<AppAudioPlayer>(new AppAudioPlayer(new Audio()));

  const [currentPlayable, setCurrentPlayable] = useState<PlayableMessage>();
  const currentPlayingKeyRef = useRef<string>();

  const [isPlaying, setIsPlaying] = useState(false);

  const { dequePlayableMessage, enqueuePlayableMessage } =
    useFeedbackAudioQueue();
  const { setIsAudioInteractionOn } = useContextActions();
  const { isAudioInteractionOn, playableAudiosQueue } = useAppStateContext();

  const setInteractionActive = () => {
    if (isAudioInteractionOn) {
      return;
    }
    enqueuePlayableMessage({
      key: `${Date.now()}-test-interaction-active-${counterRef.current}`,
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
    const listener = (e:KeyboardEvent) => {
      console.log("speaking---", e, window.speechSynthesis.speaking, window.speechSynthesis)
      if(audioRef.current.isPlaying) {
        window.speechSynthesis.pause();
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [])

  return (
    <div className="flex">
      <div
        className={`audioPlayer ${
          !isAudioInteractionOn ? "audio-no-interaction" : ""
        }`}
      >
        <Tooltip
          title={currentPlayable?.messages.map((i) => i.text).join(". ")}
          open={isPlaying && !!currentPlayable}
        >
          <audio
            id="play-audio"
            {...(isAudioInteractionOn
              ? {
                  tabIndex: -1,
                  "aria-hidden": true,
                }
              : {})}
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
      <SpeakerIcon
        tabIndex={0}
        htmlColor={isPlaying ? "red" : "white"}
        aria-label="Speaker"
      />
    </div>
  );
};
