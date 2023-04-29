import { useEffect, useState } from "react";
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
  const [dependentBlocks, setDependentBlocks] = useState<{
    [blockProgressId: number]: string[];
  }>({});

  useEffect(() => {
    if (data) {
      const ids: {
        [blockProgressId: number]: string[];
      } = {};
      const _dependentBlocks = data.buildingBlocksProgressItems.reduce(
        (prev, bp) => {
          const parentBlocks = data.buildingBlocksProgressItems.filter(
            (bpParent) =>
              bpParent.block.dependentOnIds?.some((id) => id === bp.block.id)
          );
          const names = parentBlocks.map((bp) => bp.block.name);
          prev[bp.id] = names;
          return prev;
        },
        ids
      );
      setDependentBlocks(_dependentBlocks);
    }
  }, [data]);

  return (
    <div className="view story-page-wrapper">
      <ErrorBoundary error={error} onRetry={retry} loading={loading}>
        {!error && data && (
          <div className="view-content view-items">
            {data.buildingBlocksProgressItems.map(
              (blockProgress: BuildingBlockProgress) => (
                <BuildingBlockItem
                  dependentNames={dependentBlocks[blockProgress.id]}
                  key={blockProgress.id}
                  blockProgress={blockProgress}
                />
              )
            )}
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};
