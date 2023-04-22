import { useParams } from "react-router";
import useFetchData from "../../../api/useFetchData";
import { BuildingBlockProgress, UserStory } from "../../../context";
import ErrorBoundary from "../../page-components/ErrorBoundary/ErrorBoundary";
import BuildingBlockItem from "./BuildingBlockItem";

export const StoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error, retry } = useFetchData<UserStory>(
    `userStories/${id}`
  );

  return (
    <div className="view story-page-wrapper">
      <ErrorBoundary error={error} onRetry={retry} loading={loading}>
        {!error && data && (
          <div className="view-content view-items">
            {data.buildingBlocksProgressItems.map(
              (blockProgress: BuildingBlockProgress) => (
                <BuildingBlockItem key={blockProgress.id} {...blockProgress} />
              )
            )}
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};
