import { StateAction, StateActionType, StateType } from "./contextTypes/ctxTypes";
import initialState from "./initialState";

export default (state: StateType, action: StateAction): StateType => {
  switch (action.type) {
    case StateActionType.Init:
      return JSON.parse(JSON.stringify(initialState));
    case StateActionType.SetLanguage:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};
