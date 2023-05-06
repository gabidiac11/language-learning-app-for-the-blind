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
import BlockIntroduction from "../pages/autheticated/BlockPage/BlockIntroduction/BlockIntroduction";
import BlockStartPage from "../pages/autheticated/BlockPage/BlockStartPage";
import BlockQuiz from "../pages/autheticated/BlockPage/BlockQuiz/BlockQuiz";
import BlockQuizCompleted from "../pages/autheticated/BlockPage/BlockQuiz/BlockQuizCompleted";
import EpilogueStartPage from "../pages/autheticated/EpiloguePage/EpilogueStartPage";
import EpilogueQuiz from "../pages/autheticated/EpiloguePage/EpilogueQuiz/EpilogueQuiz";
import EpilogueQuizCompleted from "../pages/autheticated/EpiloguePage/EpilogueQuiz/EpilogueQuizCompleted";


// TODO: on-off button for voice navigation

const App = () => {
  const { user, isLoading, token } = useAuthInit();

  if (isLoading || !token) {
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
              <Route path="/stories/:id" element={<StoryPage />} />

              {/* // TODO: all these pages should inform the user for a time what each page does and what should they do vacally and what not */}
              <Route path="/blocks/:id/quiz" element={<BlockQuiz />} />
              <Route path="/blocks/:id/introduction" element={<BlockIntroduction />} />
              <Route path="/blocks/:id/quiz/:quizId/completed" element={<BlockQuizCompleted />} />
              <Route path="/blocks/:id" element={<BlockStartPage />} />

              <Route path="/epilogue/:id/quiz" element={<EpilogueQuiz />} />
              <Route path="/epilogue/:id/quiz/:quizId/completed" element={<EpilogueQuizCompleted />} />
              <Route path="/epilogue/:id" element={<EpilogueStartPage />} />
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
