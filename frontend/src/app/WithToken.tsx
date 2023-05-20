import "./App.scss";
import { PropsWithChildren, useEffect, useState } from "react";
import { firebaseAuth, logout } from "./../auth/firebase-auth";
import { useAuthState } from "react-firebase-hooks/auth";
import axiosInstance from "../axiosInstance";
import { Loader } from "../pages/page-components/Loader";

const WithToken = (props: PropsWithChildren) => {
  const [user] = useAuthState(firebaseAuth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      return;
    }
    (async () => {
      const token = await user?.getIdToken(true);
      if (!token) {
        axiosInstance.defaults.headers.common["Authorization"] = "";
        logout();
        return;
      }
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      setIsLoading(false);
    })();
  }, [user]);

  if (isLoading) {
    return (
      <div className="view loading-auth">
        <Loader />
      </div>
    );
  }

  return <>{props.children}</>;
};

export default WithToken;
