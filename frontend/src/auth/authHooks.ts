import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "./firebase-auth";

export const useAuthInit = () => {
  const [user, isVerifying] = useAuthState(firebaseAuth);

  return {
    isVerifying,
    user,
  };
};

export const useAppUser = () => {
  const [user] = useAuthState(firebaseAuth);
  return { user };
};
