import { StoryCard } from "./StoryCard/StoryCard";
import "./StoriesOverviewPage.scss";
import useFetchData from "../../../api/useFetchData";
import { LanguageDataItem, UserStory } from "../../../context";
import ErrorBoundary from "../../page-components/ErrorBoundary/ErrorBoundary";
import { useLocation, useParams, Location } from "react-router";
import { Typography } from "@mui/material";
import { WithFocusControls } from "../../page-components/accessibility/WithFocusControls";
import { storiesOverviewPageMessages } from "./appMessages";
import { usePageAudioFeedback } from "../../../accessibility/audioSpeaker/hooks/usePageAudioFeedback";
import { useHandleVoicePageStoriesOverview } from "./useHandleVoicePageStoriesOverview";
import { useState } from "react";
import { LanguageNavigateToStoriesState } from "../LessonLanguages/LanguageNavigateToStoriesState";
import { AppMessage } from "../../../accessibility/types/appMessage.type";
import { genKey } from "../../../constants";

export const StoriesOverviewPage = () => {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const [languageAppMessage] = useState<AppMessage | undefined>(
    getLanguageAppMessage(location)
  );
  const { data, loading, error, retry } = useFetchData<UserStory[]>(
    `userStories`,
    lang
  );

  usePageAudioFeedback({
    error,
    loading,
    pageGreetingAppend: languageAppMessage ? [languageAppMessage] : undefined,
    pageGreeting: storiesOverviewPageMessages.greetingPageStoriesOverview,
    pageDataLoadingMessage: storiesOverviewPageMessages.loadingStoriesOverview,
    pageDataLoadedMessage: storiesOverviewPageMessages.loadedStoriesOverview,
  });

  useHandleVoicePageStoriesOverview(data);

  return (
    <div
      className="view dashboard-page-wrapper"
      aria-label="wrapper for list of lesson stories"
    >
      <WithFocusControls
        direction="horizontal"
        customMessage="Press arrow left or arrow right to switch between story cards and inner information of a story card"
      >
        <ErrorBoundary error={error} onRetry={retry} loading={loading}>
          <div
            className="view-content view-items"
            aria-label="inner wrapper for lesson stories."
          >
            {!error &&
              data &&
              data.map((userStory) => (
                <StoryCard key={userStory.id} userStory={userStory} />
              ))}
            {!error && data && data.length === 0 && (
              <Typography
                variant="h5"
                tabIndex={0}
                aria-label="No lessons available."
              >
                No lessons.
              </Typography>
            )}
          </div>
        </ErrorBoundary>
      </WithFocusControls>
    </div>
  );
};
function getLanguageAppMessage(location: Location): AppMessage | undefined {
  if (!location.state) {
    return undefined;
  }

  const languageParamsState = location.state as LanguageNavigateToStoriesState;
  if (languageParamsState.lessonLanguage) {
    return {
      uniqueName: genKey(),
      filePath: languageParamsState.lessonLanguage.audioFile,
      text: languageParamsState.lessonLanguage.name,
    };
  }

  return undefined;
}
