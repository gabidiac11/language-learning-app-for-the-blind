import { StoryCard } from "./StoryCard/StoryCard";
import "./StoriesOverviewPage.scss";
import useFetchData from "../../../api/useFetchData";
import { UserStory } from "../../../context";
import ErrorBoundary from "../../page-components/ErrorBoundary/ErrorBoundary";
import { useState, useEffect } from "react";

export const StoriesOverviewPage = () => {
  const { data, loading, error, retry } =
    useFetchData<UserStory[]>("userStories");
  const [dependent, setDependent] = useState<{
    [storyId: number]: string[];
  }>({});

  useEffect(() => {
    if (data) {
      const ids: {
        [storyId: number]: string[];
      } = {};
      const _dependentBlocks = data.reduce((prev, story) => {
        const parentStory = data.filter((bpParent) =>
          bpParent.dependentOnIds?.some((id) => id === story.id)
        );
        const names = parentStory.map((storyItem) => storyItem.name);
        prev[story.id] = names;
        return prev;
      }, ids);
      setDependent(_dependentBlocks);
    }
  }, [data]);
  return (
    <div className="view dashboard-page-wrapper">
      <ErrorBoundary error={error} onRetry={retry} loading={loading}>
        <div className="view-content view-items">
          {!error &&
            data &&
            data.map((userStory) => (
              <StoryCard
                dependentNames={dependent[userStory.id]}
                key={userStory.id}
                userStory={userStory}
              />
            ))}
        </div>
      </ErrorBoundary>
    </div>
  );
};
