import { useContext } from "react";
import { AppContext } from "../AppContext";

export const useAppContextState = () => {
  return useContext(AppContext).state;
};