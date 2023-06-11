import {
  StateAction,
  StateActionType,
  StateType,
} from "./contextTypes/ctxTypes";
import initialState from "./initialState";

export default (state: StateType, action: StateAction): StateType => {
  switch (action.type) {
    case StateActionType.Init:
      return JSON.parse(JSON.stringify(initialState));

    case StateActionType.EnqueuePlayableMessage:
      return {
        ...state,
        playableAudiosQueue: [
          ...state.playableAudiosQueue.filter(
            (i) => i.key !== action.payload.key
          ),
          action.payload,
        ],
      };
    case StateActionType.SingleEnquePlayableMessages:
      return {
        ...state,
        playableAudiosQueue: [action.payload],
      };

    case StateActionType.DequePlayableMessages:
      return {
        ...state,
        playableAudiosQueue: state.playableAudiosQueue.filter(
          (i) => i.key !== action.payload.playableKey
        ),
      };
    case StateActionType.EmptyAudioQueue:
      return {
        ...state,
        playableAudiosQueue: [],
      };
    case StateActionType.PrematurelyStopPlayableMessages:
      return {
        ...state,
        playableAudiosQueue: state.playableAudiosQueue.filter(
          (i) => !action.payload.playableKeys.some((pk) => pk === i.key)
        ),
      };

    case StateActionType.SetLanguage:
      return {
        ...state,
        language: action.payload,
      };

    case StateActionType.SetIsAudioInteractionOn:
      return {
        ...state,
        isAudioInteractionOn: action.payload,
      };

    // voice commands:
    case StateActionType.SingleEnqueVoiceCommand:
      return {
        ...state,
        voiceCommandsQueue: [action.payload],
      };
    case StateActionType.DequeueVoiceCommand:
      return {
        ...state,
        voiceCommandsQueue: state.voiceCommandsQueue.filter(
          (i) => i.key !== action.payload.key
        ),
      };
    case StateActionType.AddActiveVoiceHandler:
      return {
        ...state,
        voiceHandlers: [...state.voiceHandlers, action.payload],
      };

    case StateActionType.RemoveActiveVoiceHandler:
      return {
        ...state,
        voiceHandlers: state.voiceHandlers.filter(
          (i) => i.key !== action.payload.key
        ),
      };
    default:
      return state;
  }
};
