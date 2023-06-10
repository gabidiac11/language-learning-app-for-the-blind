import { AppMessage } from "./types/appMessage.type";
import { PlayableMessage } from "./types/playableMessage.type";
import { audioPlayEvents } from "./audioSpeaker/audioEvents";
import { getListenableKeyFromPlayable } from "./audioSpeaker/getListenableKeyFromPlayable";
import { getReadableTextFromHtmlElement } from "./screenReader/getReadableTextFromHtmlElement";
import { emitEventPlayNodeAttribute } from "./audioSpeaker/htmlAttributeAudio/htmlAttributeAudioEvent";
import { emitPrematurStopAudio } from "./audioSpeaker/hooks/usePrematureStopAudioListener";
import { logScreenReader } from "./screenReader/logScreenReader";
import { isMicOnOffKeyboardEvent } from "./keyboardShortcuts";

window.isPlayingUninteruptableAudios = {};

// NOTE: this 2 classes need to be together in this file (didn't investigate why)

class AppScreenReader {
  static instance = new AppScreenReader();

  private _utterance: SpeechSynthesisUtterance | undefined;
  constructor() {
    this.init();
  }
  private init() {
    document.addEventListener(
      "keyup",
      ((event: KeyboardEvent) => {
        if (isMicOnOffKeyboardEvent(event)) return;

        if (event.key !== "Tab") {
          return;
        }
        logScreenReader("tab", { event });
        this.playNodeTarget(document.activeElement);
      }).bind(this)
    );

    document.addEventListener(
      "focus",
      ((event: FocusEvent) => {
        logScreenReader("focus", { event });
        this.playNodeTarget(event.target);
      }).bind(this)
    );

    document.addEventListener(
      "click",
      ((event: MouseEvent) => {
        this.playNodeTarget(event.target);
      }).bind(this)
    );
  }

  public playNodeTarget(target: EventTarget | null) {
    const playerIsInCharged = this.playUsingAudioPlayerIfApplicable(target);
    if (!playerIsInCharged) {
      const text = getReadableTextFromHtmlElement(target as Element);
      if (text) {
        this.play(text);
      }
    }
  }

  private playUsingAudioPlayerIfApplicable(target: EventTarget | null) {
    if (!target) return false;
    const htmlElement = target as HTMLElement;
    if (!("hasAttribute" in htmlElement)) return false;
    if (htmlElement.getAttribute("aria-hidden") === "true") return false;

    if (
      !htmlElement.getAttribute("audio-player-path") ||
      !htmlElement.getAttribute("audio-player-text")
    ) {
      return false;
    }

    emitEventPlayNodeAttribute(htmlElement);
    return true;
  }

  private play(text: string) {
    if (window.isPlayingUninteruptableAudios[window.location.pathname]) {
      logScreenReader(
        `Screen reader play() prevented: is playing Uninteruptable audio.`
      );
      return;
    }

    this.stopIfPlaying();
    emitPrematurStopAudio();

    this._utterance = new SpeechSynthesisUtterance(text);
    this._utterance.lang = "en-US";

    window.speechSynthesis.speak(this._utterance);
  }

  public stopIfPlaying() {
    window.speechSynthesis.cancel();
  }

  public playPageTitle() {
    this.play(document.title);
  }
}

export const screenReader = AppScreenReader.instance;

export class AppAudioPlayer {
  public audio: HTMLAudioElement;

  private _onPlay = () => {};
  private _onPause = () => {};
  private _onError = (event: any) => {};
  private _onEnded = () => {};
  private _onUrlLoaded = () => {};

  private _forceStopAudiosCallbacks: (() => void)[] = [];

  public isPlaying: boolean = false;
  public isPaused: boolean = false;
  public currentTextPlaying: string = "";

  constructor(audio: HTMLAudioElement) {
    this.audio = audio;
  }

  private log(value: any, obj?: any) {
    if (obj) {
      // Note: no stringify - (for events might have circular structure)
      console.log(`AppAudioPlayer-${value}`, obj);
      return;
    }
    console.log(`AppAudioPlayer-${value}`);
  }

  public async playAudio(currentPlayable: PlayableMessage) {
    screenReader.stopIfPlaying();
    this.stopAnyAudio();

    const currentPage = window.location.pathname;

    // EMIT START: group of messages
    this.emitMessageStarted(getListenableKeyFromPlayable(currentPlayable));

    for (const message of currentPlayable.messages) {
      let allAborted = false;
      const logPayload = {
        p: {
          playableKey: currentPlayable.key,
          appMessageUniqueName: message.uniqueName,
        },
      };

      try {
        this.currentTextPlaying = message.text;

        // EMIT START: individual message
        this.emitMessageStarted(message.uniqueName);
        this.assesUnstoppableMessage(message, currentPage);

        await (async () =>
          new Promise((resolve, reject) => {
            // add this event to force this promise to fail when we want to abort playing this playble item all together

            const forceStopListen = (() => {
              this.log("[ON-FORCE-STOP-PLAYABLE]", logPayload);
              allAborted = true;

              reject({ forcedStopped: true });
            }).bind(this);
            this._forceStopAudiosCallbacks.push(forceStopListen);

            // asign all handlers to this class so they can be removed later
            this._onPlay = (() => {
              this.log(`[ON-PLAY]:`, logPayload);

              this.setIsPlaying(true, currentPlayable.key);
              this.isPaused = false;
            }).bind(this);
            this._onPause = (() => {
              this.log(`[ON-PAUSE]:`, logPayload);

              this.setIsPlaying(false, currentPlayable.key);
              this.isPaused = true;
            }).bind(this);
            this._onError = ((event: any) => {
              this.log(`[ERROR]:`, logPayload);

              this.setIsPlaying(false, currentPlayable.key);
              this.isPaused = false;
              reject(event);
            }).bind(this);
            this._onEnded = (() => {
              this.log(`[ENDED]:`, logPayload);

              this.setIsPlaying(false, currentPlayable.key);
              this.isPaused = false;
              resolve({});
            }).bind(this);
            this._onUrlLoaded = (() => {
              this.log(`[URL-LOADED]:`, logPayload);
              this.audio.play();
            }).bind(this);

            if (allAborted) {
              reject();
              return;
            }

            this.audio.src = message.filePath;
            this.addAudioEventListeners();
          })).bind(this)();

        this.markUninteruptableOnceMessagePlayed_IfApplicable(
          message,
          currentPage
        );
      } catch (e) {
        this.log("[ON-AUDIO-ERROR]", { e, message, currentPlayable });
      } finally {
        // EMIT END: individual message
        this.emitMessageStopped(message.uniqueName);
        this.assesUninteruptableMessageStop();
      }
      if (allAborted) {
        break;
      }
      this.removeAudioEventListeners();
    }

    // EMIT END: group of messages
    this.emitMessageStopped(getListenableKeyFromPlayable(currentPlayable));

    this.emitEvent(audioPlayEvents.PlayableFinished, [currentPlayable.key]);
  }

  private setIsPlaying(value: boolean, playableKey: string) {
    this.isPlaying = value;
    this.emitEvent(audioPlayEvents.PlayingStateChange, [playableKey]);
  }
  private addAudioEventListeners() {
    this.audio.addEventListener("loadedmetadata", this._onUrlLoaded);
    this.audio.addEventListener("play", this._onPlay);
    this.audio.addEventListener("pause", this._onPause);
    this.audio.addEventListener("error", this._onError);
    this.audio.addEventListener("ended", this._onEnded);
  }
  private removeAudioEventListeners() {
    this.audio.removeEventListener("loadedmetadata", this._onUrlLoaded);
    this.audio.removeEventListener("play", this._onPlay);
    this.audio.removeEventListener("pause", this._onPause);
    this.audio.removeEventListener("error", this._onError);
    this.audio.removeEventListener("ended", this._onEnded);
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

  private stopOngoingAudioPromise = () => {
    let callback = this._forceStopAudiosCallbacks.pop();
    while (!!callback) {
      callback();
      callback = this._forceStopAudiosCallbacks.pop();
    }
  };

  /**
   * make possible knowning when a certain message has started or stopped playing
   * @param uniqueName
   */
  private emitMessageStarted(uniqueName: string) {
    const eventName = `started-playing-message-${uniqueName}-app`;
    const stopAnyOngoingPromise = new CustomEvent(eventName, { detail: {} });
    document.dispatchEvent(stopAnyOngoingPromise);

    this.log(`Emitted event`, { p: { eventName } });
  }
  private emitMessageStopped(uniqueName: string) {
    const eventName = `stopped-playing-message-${uniqueName}-app`;
    const stopAnyOngoingPromise = new CustomEvent(eventName, { detail: {} });
    document.dispatchEvent(stopAnyOngoingPromise);

    this.log(`Emitted event`, { p: { eventName } });
  }

  /**
   * the user can be forced to listen to an audio all the way through just once using localStorage to marked as listened
   */
  private assesUninteruptableMessageStop() {
    window.isPlayingUninteruptableAudios = {};
  }
  private markUninteruptableOnceMessagePlayed_IfApplicable(
    appMessage: AppMessage,
    currentPage: string
  ) {
    if (!appMessage.preventForcedStopOnCurrentPageJustOnce) {
      return;
    }

    const localStorageKey = `playedOnced-${appMessage.uniqueName}-${currentPage}`;
    if (localStorage.getItem(localStorageKey)) {
      this.log(
        `Message preventForcedStopOnCurrentPageJustOnce already played: ${localStorageKey}`
      );
      return;
    }
    const dateString = new Date().toUTCString();
    localStorage.setItem(localStorageKey, dateString);
    this.log(
      `Message preventForcedStopOnCurrentPageJustOnce set played at: ${localStorageKey}, ${dateString}`
    );
  }
  private assesUnstoppableMessage(appMessage: AppMessage, currentPage: string) {
    window.isPlayingUninteruptableAudios = {};

    if (
      appMessage.preventForcedStopOnCurrentPageJustOnce &&
      !localStorage.getItem(
        `playedOnced-${appMessage.uniqueName}-${currentPage}`
      )
    ) {
      window.isPlayingUninteruptableAudios[currentPage] = true;
      return;
    }

    if (appMessage.preventForcedStopOnCurrentPage) {
      window.isPlayingUninteruptableAudios[currentPage] = true;
    }
  }

  /**
   * use the observer pattern to call handlers when things change in this class:
   * - assignments to isPlaying variable
   * - assignmnets to isPaused variable
   * etc.
   */
  private innerEventsListeners: {
    [eventName: string]: ((values: string[]) => void)[];
  } = {};
  public addEventListener(
    eventName: string,
    listener: (values: string[]) => void
  ) {
    if (!this.innerEventsListeners[eventName]) {
      this.innerEventsListeners[eventName] = [];
    }
    this.innerEventsListeners[eventName].push(listener);
  }
  public removeEventListener(
    eventName: string,
    listener: (values: string[]) => void
  ) {
    if (this.innerEventsListeners[eventName]) {
      this.innerEventsListeners[eventName] = this.innerEventsListeners[
        eventName
      ].filter((l) => l !== listener);
    }
  }
  private emitEvent(eventName: string, values: string[]) {
    if (this.innerEventsListeners[eventName]) {
      this.innerEventsListeners[eventName].forEach((listener) => {
        listener(values);
      });
    }
  }
}
