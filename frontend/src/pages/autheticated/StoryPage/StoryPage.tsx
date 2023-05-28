import { Divider, Chip, Typography, Container } from "@mui/material";
import { useParams } from "react-router";
import useFetchData from "../../../api/useFetchData";
import { BuildingBlockProgress, UserStory } from "../../../context";
import ErrorBoundary from "../../page-components/ErrorBoundary/ErrorBoundary";
import BuildingBlockItem from "./BuildingBlockItem";
import EpilogueBlockItem from "./EpilogueBlockItem";

export const StoryPage = () => {
  const { id, lang } = useParams<{ id: string, lang: string }>();
  const { data, loading, error, retry } = useFetchData<UserStory>(
    `userStories/${id}`,
    lang
  );
  
  return (
    <div className="view story-page-wrapper">
      <ErrorBoundary error={error} onRetry={retry} loading={loading}>
        {!error && data && (
          <div className="view-content">
            <div>
              <Typography variant="h5" mb={7} align="center">
                {data.name}
              </Typography>
            </div>

            {/* BUILDING BLOCKS */}
            <Divider>
              <Chip label="Building blocks" />
            </Divider>
            <div className="view-items-section">
              {data.buildingBlocksProgressItems.map(
                (blockProgress: BuildingBlockProgress) => (
                  <BuildingBlockItem
                    key={blockProgress.id}
                    blockProgress={blockProgress}
                  />
                )
              )}
            </div>

            {/* EPILOGUE BLOCKS */}
            <Container maxWidth="sm" />
            <Divider>
              <Chip label="Epilogue block" />
            </Divider>
            <div className="view-items-section">
              <EpilogueBlockItem
                storyImgUrl={data.imageUrl}
                epilogueProgress={data.epilogueProgress}
                key={data.epilogueProgress.id}
              />
            </div>
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};
