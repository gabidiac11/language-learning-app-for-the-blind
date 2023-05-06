import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "./firebase-auth";
import axiosInstance from "../axiosInstance";

export const useAuthInit = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, isVerifying] = useAuthState(firebaseAuth);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    setIsLoading(isVerifying);
  }, [user, token, isVerifying]);

  useEffect(() => {
    if (!user) {
      setToken(undefined);
    } else {
      (async () => {
        // TODO: see how you can get this better
        const token = await user?.getIdToken();
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        axiosInstance.defaults.headers.common["user-id"] = user?.uid;

        setToken(token);
      })();
    }
  }, [user]);

  return {
    isLoading,
    token,
    user,
    isVerifying,
  };
};

export const useAppUser = () => {
  const [user] = useAuthState(firebaseAuth);
  return { user };
};
