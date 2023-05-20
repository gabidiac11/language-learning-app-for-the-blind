import { StoryCard } from "./StoryCard/StoryCard";
import "./StoriesOverviewPage.scss";
import useFetchData from "../../../api/useFetchData";
import { UserStory } from "../../../context";
import ErrorBoundary from "../../page-components/ErrorBoundary/ErrorBoundary";

export const StoriesOverviewPage = () => {
  const { data, loading, error, retry } =
    useFetchData<UserStory[]>("userStories");

  return (
    <div className="view dashboard-page-wrapper">
      <ErrorBoundary error={error} onRetry={retry} loading={loading}>
        <div className="view-content view-items">
          {!error &&
            data &&
            data.map((userStory) => (
              <StoryCard
                key={userStory.id}
                userStory={userStory}
              />
            ))}
        </div>
      </ErrorBoundary>
    </div>
  );
};
