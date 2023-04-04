import "./App.scss";
import { PropsWithChildren, useEffect, useRef } from "react";
import { firebaseAuth } from "./../auth/firebase-auth";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthenticatedRoutes = (props:PropsWithChildren) => {
  const timeOutAuth = useRef<NodeJS.Timer>();
  const [user] = useAuthState(firebaseAuth);

  useEffect(() => {
    user && user.getIdToken(true);
    //firebase token invalidates in the background if a refresh page is not done in ~30 minutes
    timeOutAuth.current = setInterval(() => {
      user && user.getIdToken(true);
    }, 1000 * 60 * 5);

    return () => {
      clearInterval(timeOutAuth.current);
    };
  }, []);

  return <>{props.children}</>;
};

export default AuthenticatedRoutes;