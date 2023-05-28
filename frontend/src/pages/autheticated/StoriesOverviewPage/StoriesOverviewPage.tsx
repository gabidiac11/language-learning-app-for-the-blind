import { StoryCard } from "./StoryCard/StoryCard";
import "./StoriesOverviewPage.scss";
import useFetchData from "../../../api/useFetchData";
import { UserStory } from "../../../context";
import ErrorBoundary from "../../page-components/ErrorBoundary/ErrorBoundary";
import { useParams } from "react-router";
import { Typography } from "@mui/material";

export const StoriesOverviewPage = () => {
  const { lang } = useParams<{ lang: string }>();
  const { data, loading, error, retry } = useFetchData<UserStory[]>(
    `userStories`,
    lang
  );

  return (
    <div className="view dashboard-page-wrapper">
      <ErrorBoundary error={error} onRetry={retry} loading={loading}>
        <div className="view-content view-items">
          {!error &&
            data &&
            data.map((userStory) => (
              <StoryCard key={userStory.id} userStory={userStory} />
            ))}
          {!error && data && data.length === 0 && (
            <Typography variant="h5">No lessons.</Typography>
          )}
        </div>
      </ErrorBoundary>
    </div>
  );
};
