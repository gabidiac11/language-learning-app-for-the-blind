export const audioPlayEvents = {
  PlayingStateChange: "playing-state-change",
  PlayableFinished: "playable-finished",
};

export const eventNamePrematureStopAudio = "prematurelyStopPlayableMessages";

declare global {
  interface Window {
    isPlayingUninteruptableAudios: {
      [currentPage: string]: boolean;
    };
  }
}
