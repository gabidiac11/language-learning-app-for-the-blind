import { useCallback, useContext } from "react";
import { AppContext } from "../AppContext";
import { StateActionType } from "../contextTypes/ctxTypes";


export const useContextActions = () => {
  const { dispatch } = useContext(AppContext);

  const updateLanguage = useCallback((language: string) => {
    dispatch({
      type: StateActionType.SetLanguage,
      payload: language,
    });
  }, []);

  return {
    updateLanguage,
  };
};