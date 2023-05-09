import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth, logout } from "./firebase-auth";
import axiosInstance from "../axiosInstance";

function updateAxiosInstanceHeader(token?: string, uid?: string) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axiosInstance.defaults.headers.common["user-id"] = uid;
}

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
        if(!token) {
          console.log("Something went wrong.")
          logout();
        }
        updateAxiosInstanceHeader(token, user?.uid);
        setToken(token);
      })();
    }
  }, [user, token]);

  useEffect(() => {
    updateAxiosInstanceHeader(token, user?.uid);
  }, [token, user]);

  // TODO: test if it's possible that any startup request can be made without token
  return {
    isLoading: isLoading || !token,
    token,
    user,
    isVerifying,
  };
};

export const useAppUser = () => {
  const [user] = useAuthState(firebaseAuth);
  return { user };
};
