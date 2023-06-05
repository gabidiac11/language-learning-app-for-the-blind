import { useCallback, useContext } from "react";
import { AppContext } from "../AppContext";
import { Language, StateActionType } from "../contextTypes/ctxTypes";


export const useContextActions = () => {
  const { dispatch } = useContext(AppContext);

  const updateLanguage = useCallback((language?: Language) => {
    dispatch({
      type: StateActionType.SetLanguage,
      payload: language,
    });
  }, []);

  const setIsAudioInteractionOn = useCallback((isAudioInteractionOn?: boolean) => {
    dispatch({
      type: StateActionType.SetIsAudioInteractionOn,
      payload: isAudioInteractionOn,
    });
  }, []);

  return {
    updateLanguage,
    setIsAudioInteractionOn
  };
};