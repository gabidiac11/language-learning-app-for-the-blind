import { StateType } from "./contextTypes/ctxTypes";

export default {
  language: undefined,
  playableAudiosQueue: [], 
  voiceCommandsQueue: [],
  isAudioInteractionOn: false,
  voiceHandlers: []
} as StateType;
