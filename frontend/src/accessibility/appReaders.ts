import { PlayableMessage } from "./playableMessage";

class AppScreenReader {
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
        console.log(document.activeElement?.innerHTML);
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
    const text = getNodeText(target as Element);
    if(text) {
      this.play(text);
    }
  }

  private play(text: string) {
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

export const screenReader = new AppScreenReader();

export class AppAudioPlayer {
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
    screenReader.stopIfPlaying();
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
    return `Input text. Value: ${htmlElement.getAttribute("value") ?? "empty"}`;
  }

  if (!htmlElement.children?.length && htmlElement.innerText) {
    const label = htmlElement.innerText;
    return `${label}`;
  }

  if(htmlElement.children?.length > 0) {
    let text = "";
    for(let i = 0; i < htmlElement.children.length; i++) {
      const textItem = getNodeText(htmlElement.children[i]);
      if(textItem) {
        text += textItem;
      }
    }
    return text;
  }
  return "";
}