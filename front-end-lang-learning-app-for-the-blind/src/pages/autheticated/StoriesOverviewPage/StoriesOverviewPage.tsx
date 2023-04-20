import { StoryCard } from "./StoryCard/StoryCard";
import "./StoriesOverviewPage.scss";
import useFetchData from "../../../app-hooks/useFetchData";
import { UserStory } from "../../../context";
import ErrorBoundary from "../../page-components/ErrorBoundary/ErrorBoundary";
import { Loader } from "../../page-components/Loader";

export const StoriesOverviewPage = () => {
  const { data, loading, error, retry } =
    useFetchData<UserStory[]>("userStories");

  return (
    <div className="view dashboard-page-wrapper">
      <ErrorBoundary error={error} onRetry={retry}>
        <div className="view-content">
          {loading && <Loader />}
          {!error &&
            data &&
            data.map((userStory) => <StoryCard key={userStory.id} userStory={userStory} />)}
        </div>
      </ErrorBoundary>
    </div>
  );
};
