import React, { createContext, PropsWithChildren, useReducer } from "react";
import { StateType } from "./contextTypes/ctxTypes";
import initialState from "./initialState";
import mainReducer from "./reducers";

const AppContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => {},
});

const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <>{children}</>
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };