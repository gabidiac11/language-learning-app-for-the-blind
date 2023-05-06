import "./App.scss";
import { PropsWithChildren, useEffect, useRef } from "react";
import { firebaseAuth } from "./../auth/firebase-auth";
import { useAuthState } from "react-firebase-hooks/auth";
import axiosInstance from "../axiosInstance";

const AuthenticatedRoutes = (props: PropsWithChildren) => {
  const timeOutAuth = useRef<NodeJS.Timer>();
  const [user] = useAuthState(firebaseAuth);

  // TODO: test if this works!
  useEffect(() => {
    const updateToken = async () => {
      if (user) {
        // TODO: see how you can get this better
        const token = await user?.getIdToken(true);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        axiosInstance.defaults.headers.common["user-id"] = user?.uid;
      }
    };
    updateToken();

    //firebase token invalidates in the background if a refresh page is not done in ~30 minutes
    timeOutAuth.current = setInterval(async () => {
      await updateToken();
    }, 1000 * 60 * 5);

    return () => {
      clearInterval(timeOutAuth.current);
    };
  }, [user]);

  return <>{props.children}</>;
};

export default AuthenticatedRoutes;
