export type AudioAttributeEventDetail = {
  audioPath: string;
  audioText: string;
};

export const eventNameAudioAttribute =
  "request-audio-play-from-node-attribute-event";

declare global {
  interface GlobalEventHandlersEventMap {
    [eventNameAudioAttribute]: CustomEvent<AudioAttributeEventDetail>;
  }
}

export function emitEventPlayNodeAttribute(htmlElement: HTMLElement) {
  const event = new CustomEvent<AudioAttributeEventDetail>(
    eventNameAudioAttribute,
    {
      detail: {
        audioPath: htmlElement.getAttribute("audio-player-path"),
        audioText: htmlElement.getAttribute("audio-player-text"),
      } as AudioAttributeEventDetail,
    }
  );
  window.dispatchEvent(event);
}
