import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "./firebase-auth";
import axiosInstance from "../axiosInstance";

export const useAuthInit = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, isVerifying] = useAuthState(firebaseAuth);

  useEffect(() => {
    axiosInstance.defaults.headers.common["Authorization"] = `Basic ${
      user?.refreshToken || ""
    }`;

    console.log({ user });

    setIsLoading(isVerifying);
  }, [user, isVerifying]);

  return {
    isLoading,
    user,
    isVerifying,
  };
};

export const useAppUser = () => {
  const [user] = useAuthState(firebaseAuth);
  return { user };
};
