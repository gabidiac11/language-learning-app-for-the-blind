import { PlayableMessage } from "../types/playableMessage.type";

export function getListenableKeyFromPlayableKey(key: string) {
  const m = [key, "-playable-message"].join("-");
  return m;
}

export function getListenableKeyFromPlayable(currentPlayable: PlayableMessage) {
  return getListenableKeyFromPlayableKey(currentPlayable.key);
}
