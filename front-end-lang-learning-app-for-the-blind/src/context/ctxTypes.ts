export type StateType = {
  language: string;
};

export enum StateActionType {
  Init,
  SetLanguage,
}

export type StateAction =
  | {
      type: StateActionType.Init;
      payload: StateType;
    }
  | {
      type: StateActionType.SetLanguage;
      payload: string;
    };