import { StoryCard } from "./StoryCard/StoryCard";
import "./StoriesOverviewPage.scss";
import useFetchData from "../../../api/useFetchData";
import { UserStory } from "../../../context";
import ErrorBoundary from "../../page-components/ErrorBoundary/ErrorBoundary";
import { useParams } from "react-router";
import { Typography } from "@mui/material";
import { WithFocusControls } from "../../../accessibility/WithFocusControls";
import { storiesOverviewPageMessages } from "./appMessages";
import { usePageAudioFeedback } from "../../page-components/usePageAudioFeedback";

export const StoriesOverviewPage = () => {
  const { lang } = useParams<{ lang: string }>();
  const { data, loading, error, retry } = useFetchData<UserStory[]>(
    `userStories`,
    lang
  );
  
  usePageAudioFeedback({
    error,
    loading,
    pageGreeting: storiesOverviewPageMessages.greetingPageStoriesOverview,
    pageDataLoadingMessage: storiesOverviewPageMessages.loadingStoriesOverview,
    pageDataLoadedMessage: storiesOverviewPageMessages.loadedStoriesOverview,
  });

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
              <Typography variant="h5" tabIndex={0} aria-label="No lessons available.">
                No lessons.
              </Typography>
            )}
          </div>
        </ErrorBoundary>
      </WithFocusControls>
    </div>
  );
};
