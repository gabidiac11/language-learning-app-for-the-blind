import { AppMessage } from "./types/appMessage.type";
import { PlayableMessage } from "./types/playableMessage.type";

window.isPlayingUninteruptableAudios = {};

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
        if (event.key !== "Tab") {
          return;
        }
        console.log("tab", { event });
        this.playNodeTarget(document.activeElement);
      }).bind(this)
    );

    document.addEventListener(
      "focus",
      ((event: FocusEvent) => {
        console.log("focus", { event });
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
      const text = getNodeText(target as Element);
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

    const event = new CustomEvent<AudioAttributeEventDetail>(
      "request-audio-play-from-node-attribute-event",
      {
        detail: {
          audioPath: htmlElement.getAttribute("audio-player-path"),
          audioText: htmlElement.getAttribute("audio-player-text"),
        } as AudioAttributeEventDetail,
      }
    );
    window.dispatchEvent(event);
    return true;
  }

  private play(text: string) {
    if (window.isPlayingUninteruptableAudios[window.location.pathname]) {
      console.log(
        `Screen reader play() prevented: is playing Uninteruptable audio.`
      );
      return;
    }

    this.stopIfPlaying();
    this.stopAudioPlayer();

    this._utterance = new SpeechSynthesisUtterance(text);
    this._utterance.lang = "en-US";

    window.speechSynthesis.speak(this._utterance);
  }

  private stopAudioPlayer() {
    const event = new CustomEvent("prematurelyStopPlayableMessages", {
      detail: {},
    });
    window.dispatchEvent(event);
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

  // NOTE: take care to bind() in case this is involved
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

  public async playAudio(currentPlayable: PlayableMessage) {
    screenReader.stopIfPlaying();
    this.stopAnyAudio();

    const currentPage = window.location.pathname;

    // EMIT START: group of messages
    this.emitMessageStarted(getListenableKeyFromPlayable(currentPlayable));
    for (const message of currentPlayable.messages) {
      let allAborted = false;

      try {
        this.currentTextPlaying = message.text;

        // EMIT START: individual message
        this.emitMessageStarted(message.uniqueName);
        this.assesUnstoppableMessage(message, currentPage);

        await (async () =>
          new Promise((resolve, reject) => {
            // add this event to force this promise to fail when we want to abort playing this playble item all together

            const forceStopListen = (() => {
              console.log("Force stop audio:", currentPlayable.key);
              allAborted = true;

              reject({ forcedStopped: true });
            }).bind(this);
            this._forceStopAudiosCallbacks.push(forceStopListen);

            // asign all handlers to this class so they can be removed later
            this._onPlay = (() => {
              console.log(`[ON-PLAY]: Audio-${currentPlayable.key}`);

              this.setIsPlaying(true, currentPlayable.key);
              this.isPaused = false;
            }).bind(this);
            this._onPause = (() => {
              console.log(`[ON-PAUSE]: Audio-${currentPlayable.key}`);

              this.setIsPlaying(false, currentPlayable.key);
              this.isPaused = true;
            }).bind(this);
            this._onError = ((event: any) => {
              console.log(`[ERROR]: Audio-${currentPlayable.key}`);

              this.setIsPlaying(false, currentPlayable.key);
              this.isPaused = false;
              reject(event);
            }).bind(this);
            this._onEnded = (() => {
              console.log(`[ENDED]: Audio-${currentPlayable.key}`);

              this.setIsPlaying(false, currentPlayable.key);
              this.isPaused = false;
              resolve({});
            }).bind(this);
            this._onUrlLoaded = (() => {
              console.log(`[URL-LOADED]: Audio-${currentPlayable.key}`);
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
        console.log("audio error", { e, message, currentPlayable });
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
  assesUnstoppableMessage(appMessage: AppMessage, currentPage: string) {
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
  assesUninteruptableMessageStop() {
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
      console.log(
        `Message preventForcedStopOnCurrentPageJustOnce already played: ${localStorageKey}`
      );
      return;
    }
    const dateString = new Date().toUTCString();
    localStorage.setItem(localStorageKey, dateString);
    console.log(
      `Message preventForcedStopOnCurrentPageJustOnce set played at: ${localStorageKey}, ${dateString}`
    );
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

  /**
   * make possible knowning when a certain message has started or stopped playing
   * @param uniqueName
   */
  private emitMessageStarted(uniqueName: string) {
    const eventName = `started-playing-message-${uniqueName}-app`;
    const stopAnyOngoingPromise = new CustomEvent(eventName, { detail: {} });
    document.dispatchEvent(stopAnyOngoingPromise);

    console.log(`Emitted event '${eventName}'`);
  }
  private emitMessageStopped(uniqueName: string) {
    const eventName = `stopped-playing-message-${uniqueName}-app`;
    const stopAnyOngoingPromise = new CustomEvent(eventName, { detail: {} });
    document.dispatchEvent(stopAnyOngoingPromise);

    console.log(`Emitted event '${eventName}'`);
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

  private stopOngoingAudioPromise = () => {
    let callback = this._forceStopAudiosCallbacks.pop();
    while (!!callback) {
      callback();
      callback = this._forceStopAudiosCallbacks.pop();
    }
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

export const audioPlayEvents = {
  PlayingStateChange: "playing-state-change",
  PlayableFinished: "playable-finished",
};

function getNodeText(node: Element) {
  if (!node) return "";
  const htmlElement = node as HTMLElement;
  if (!("hasAttribute" in htmlElement)) return "";
  if (htmlElement.getAttribute("aria-hidden") === "true") return "";

  if (htmlElement.hasAttribute("aria-label")) {
    const label = htmlElement.getAttribute("aria-label") ?? "";
    return `${label}`;
  }

  if (htmlElement.hasAttribute("alt")) {
    const label = htmlElement.getAttribute("alt") ?? "";
    return label;
  }

  if (["TEXTAREA", "INPUT"].includes(htmlElement.tagName)) {
    return `Input ${htmlElement.getAttribute("type") ?? "text"}. Value: ${
      htmlElement.getAttribute("value") ?? "empty"
    }`;
  }

  if (!htmlElement.children?.length && htmlElement.innerText) {
    const label = htmlElement.innerText;
    return `${label}`;
  }

  if (htmlElement.children?.length > 0) {
    let text = "";
    for (let i = 0; i < htmlElement.children.length; i++) {
      const textItem = getNodeText(htmlElement.children[i]);
      if (textItem) {
        text += textItem;
      }
    }
    return text;
  }
  return "";
}

export type AudioAttributeEventDetail = {
  audioPath: string;
  audioText: string;
};

export const getListenableKeyFromPlayable = (
  currentPlayable: PlayableMessage
) => {
  return getListenableKeyFromPlayableKey(currentPlayable.key);
};

export const getListenableKeyFromPlayableKey = (key: string) => {
  const m = [key, "-playable-message"].join("-");
  return m;
};

declare global {
  interface GlobalEventHandlersEventMap {
    "request-audio-play-from-node-attribute-event": CustomEvent<AudioAttributeEventDetail>;
  }
  interface Window {
    isPlayingUninteruptableAudios: {
      [currentPage: string]: boolean;
    };
  }
}
