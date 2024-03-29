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
import BlockStartPage from "../pages/autheticated/BlockPage/BlockOverview/BlockStartPage";
import BlockQuiz from "../pages/autheticated/BlockPage/BlockQuiz/BlockQuiz";
import BlockQuizCompleted from "../pages/autheticated/BlockPage/BlockQuizCompleted/BlockQuizCompleted";
import EpilogueStartPage from "../pages/autheticated/EpiloguePage/EpilogueStartPage";
import EpilogueQuiz from "../pages/autheticated/EpiloguePage/EpilogueQuiz/EpilogueQuiz";
import EpilogueQuizCompleted from "../pages/autheticated/EpiloguePage/EpilogueQuiz/EpilogueQuizCompleted/EpilogueQuizCompleted";
import WithToken from "./WithToken";
import InstructionsPage from "../pages/InstructionsPage/InstructionsPage";
import { LessonLanguagesPage } from "../pages/autheticated/LessonLanguages/LessonLanguages";
import { WithLanguage } from "../pages/page-components/WithLanguage";
import { useAppStateContext } from "../context/hooks/useAppStateContext";
import { ActivateUserInteractionPage } from "./ActivateUserInteractionPage";
import { DevAllMessages } from "./DevAllMessages";

const App = () => {
  const { user, isVerifying } = useAuthInit();
  const { isAudioInteractionOn } = useAppStateContext();

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
        <Header />

        {isAudioInteractionOn && (
          <>
            {!user ? (
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<DefaultRouteRedirection />} />
              </Routes>
            ) : (
              <WithToken>
                <WithTokenRefreshInterval>
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

                    <Route path="/dev-messages" element={<DevAllMessages />} />

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
          </>
        )}

        {!isAudioInteractionOn && <ActivateUserInteractionPage />}
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
