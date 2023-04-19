import "./App.scss";
import { Login, Register } from "./../pages/auth-pages";
import { StoriesOverviewPage } from "./../pages/autheticated";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import Header from "../pages/page-components/Header";
import AuthenticatedRoutesWrapper from "./AuthenticatedRoutesWrapper";
import { StoryPage } from "../pages/autheticated/StoryPage/StoryPage";
import { Loader } from "../pages/page-components/Loader";
import { useAuthInit } from "../auth/authHooks";

const App = () => {
  const { user, isLoading } = useAuthInit();

  if (isLoading) {
    return (
      <div className="view">
        <Loader />
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
              <Route path="/stories" element={<StoriesOverviewPage />} />
              {/* TODO: add route for story page */}
              <Route path="/stories/:id" element={<StoryPage />} />
              <Route path="*" element={<DefaultRouteRedirection isAuth />} />
            </Routes>
          </AuthenticatedRoutesWrapper>
        )}
      </BrowserRouter>
    </div>
  );
};

const DefaultRouteRedirection = (props: { isAuth?: boolean }) => {
  const navigate = useNavigate();

  useEffect(() => {
    props.isAuth && navigate("/stories", { replace: true });
    !props.isAuth && navigate("/login", { replace: true });
  }, [props.isAuth]);

  return <>Loading...</>;
};

export default App;
