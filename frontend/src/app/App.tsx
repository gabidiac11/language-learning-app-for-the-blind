import "./App.scss";
import { Login, Register } from "./../pages/auth-pages";
import { StoriesOverviewPage } from "./../pages/autheticated";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import Header from "../pages/page-components/Header";
import WithTokenRefreshInterval from "./WithTokenRefreshInterval";
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
import WithToken from "./WithToken";
import InstructionsPage from "../pages/InstructionsPage/InstructionsPage";
import { LessonLanguagesPage } from "../pages/autheticated/LessonLanguages/LessonLanguages";
import { WithLanguage } from "../pages/page-components/WithLanguage";

// TODO: on-off button for voice navigation

const App = () => {
  const { user, isVerifying } = useAuthInit();

  if (isVerifying) {
    return (
      <div className="view loading-auth">
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
          <WithToken>
            <WithTokenRefreshInterval>
              {/* TODO: all these pages should inform the user for a time what each page does and what should they do vacally and what not */}

              <Routes>
                {/* ### LESSON LANGUAGES */}
                <Route
                  path="/home"
                  element={
                    <WithLanguage>
                      <LessonLanguagesPage />
                    </WithLanguage>
                  }
                />

                {/* ### STORIES PAGES: */}
                <Route
                  path="/stories/:lang"
                  element={
                    <WithLanguage>
                      <StoriesOverviewPage />
                    </WithLanguage>
                  }
                />
                <Route
                  path="/stories/:lang/:id"
                  element={
                    <WithLanguage>
                      <StoryPage />
                    </WithLanguage>
                  }
                />

                {/* ### BUILDING BLOCK PAGES: */}
                <Route
                  path="/blocks/:lang/:id/quiz"
                  element={
                    <WithLanguage>
                      <BlockQuiz />
                    </WithLanguage>
                  }
                />
                <Route
                  path="/blocks/:lang/:id/introduction"
                  element={
                    <WithLanguage>
                      <BlockIntroduction />
                    </WithLanguage>
                  }
                />
                <Route
                  path="/blocks/:lang/:id/quiz/:quizId/completed"
                  element={
                    <WithLanguage>
                      <BlockQuizCompleted />
                    </WithLanguage>
                  }
                />
                <Route
                  path="/blocks/:lang/:id"
                  element={
                    <WithLanguage>
                      <BlockStartPage />
                    </WithLanguage>
                  }
                />

                {/* ### EPILOGUE PAGES: */}
                <Route
                  path="/epilogues/:lang/:id/quiz"
                  element={
                    <WithLanguage>
                      <EpilogueQuiz />
                    </WithLanguage>
                  }
                />
                <Route
                  path="/epilogues/:lang/:id/quiz/:quizId/completed"
                  element={
                    <WithLanguage>
                      <EpilogueQuizCompleted />
                    </WithLanguage>
                  }
                />
                <Route
                  path="/epilogues/:lang/:id"
                  element={
                    <WithLanguage>
                      <EpilogueStartPage />
                    </WithLanguage>
                  }
                />

                {/* ### INSTRUCTIONS: */}
                <Route
                  path="/instructions"
                  element={
                    <WithLanguage>
                      <InstructionsPage />
                    </WithLanguage>
                  }
                />

                {/* ### FALLBACK PAGE: */}
                <Route
                  path="*"
                  element={
                    <WithLanguage>
                      <DefaultRouteRedirection isAuth />
                    </WithLanguage>
                  }
                />
              </Routes>
            </WithTokenRefreshInterval>
          </WithToken>
        )}
      </BrowserRouter>
    </div>
  );
};

const DefaultRouteRedirection = (props: { isAuth?: boolean }) => {
  const navigate = useNavigate();

  useEffect(() => {
    props.isAuth && navigate("/home", { replace: true });
    !props.isAuth && navigate("/login", { replace: true });
  }, [props.isAuth]);

  return <>Loading...</>;
};

export default App;
