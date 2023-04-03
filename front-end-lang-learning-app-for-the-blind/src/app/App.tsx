import './App.css';
import { Login, Register } from "./../pages/auth-pages";
import { DashboardPage, StoryPage } from "./../pages/autheticated";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { firebaseAuth } from "../auth/firebase-auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Header from "../pages/page-components/Header";
import axios from "axios";
import AuthenticatedRoutesWrapper from "./AuthenticatedRoutesWrapper";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, isVerifying] = useAuthState(firebaseAuth);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Basic ${
      user?.refreshToken || ""
    }`;

    console.log({ user });

    setIsLoading(isVerifying);
  }, [user, isVerifying]);

  if (isLoading) {
    return (
      <div className="view">
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      </div>
    );
  }

  return (
    <div className="main">
      <BrowserRouter>
        {user && <Header />}
        {!user ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<DefaultRouteRedirection />} />
          </Routes>
        ) : (
          <AuthenticatedRoutesWrapper>
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/book/:id" element={<StoryPage />} />
              <Route path="*" element={<DefaultRouteRedirection isAuth />} />
            </Routes>
          </AuthenticatedRoutesWrapper>
        )}
      </BrowserRouter>
    </div>
  );
};

const DefaultRouteRedirection = (props:{ isAuth?: boolean }) => {
  const navigate = useNavigate();

  useEffect(() => {
    props.isAuth && navigate("/dashboard", { replace: true });
    !props.isAuth && navigate("/login", { replace: true });
  }, [props.isAuth]);

  return <>Loading...</>;
};

export default App;
