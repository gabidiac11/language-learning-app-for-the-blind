import { StateAction, StateActionType, StateType } from "./ctxTypes";
import initialState from "./initialState";

export default (state: StateType, action: StateAction): StateType => {
  switch (action.type) {
    case StateActionType.Init:
      return {
        ...initialState,
        ...action.payload,
      };
    case StateActionType.SetLanguage:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};