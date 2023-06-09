import { Divider, Chip, Typography, Container } from "@mui/material";
import { useRef } from "react";
import { useParams } from "react-router";
import { AppMessage } from "../../../accessibility/types/appMessage.type";
import { WithFocusControls } from "../../page-components/accessibility/WithFocusControls";
import useFetchData from "../../../api/useFetchData";
import { BuildingBlockProgress, UserStory } from "../../../context";
import ErrorBoundary from "../../page-components/ErrorBoundary/ErrorBoundary";
import { usePageAudioFeedback, usePreappendLoadedData } from "../../../accessibility/usePageAudioFeedback";
import { storyPageMessages } from "./appMessages";
import BuildingBlockItem from "./BuildingBlockItem";
import EpilogueBlockItem from "./EpilogueBlockItem";

export const StoryPage = () => {
  const { id, lang } = useParams<{ id: string; lang: string }>();
  const { data, loading, error, retry } = useFetchData<UserStory>(
    `userStories/${id}`,
    lang
  );

  const pageDataLoadedMessage = usePreappendLoadedData(
    storyPageMessages.loadedStoryPage,
    data?.name,
    data?.audioFile,
    true
  );

  usePageAudioFeedback({
    error,
    loading,
    pageGreeting: storyPageMessages.greetingPageStoryPage,
    pageDataLoadingMessage: storyPageMessages.loadingStoryPage,
    pageDataLoadedMessage,
  });

  return (
    <div
      className="view story-page-wrapper"
      aria-label="page wrapper for the lesson-blocks of this lesson story"
    >
      <WithFocusControls
        direction="horizontal"
        customMessage="Press arrow left or arrow right to switch between information on this page"
      >
        <ErrorBoundary error={error} onRetry={retry} loading={loading}>
          {!error && data && (
            <div className="view-content">
              <div>
                <Typography
                  variant="h5"
                  mb={7}
                  align="center"
                  tabIndex={0}
                  aria-label={`Story title: ${data.name}`}
                >
                  {data.name}
                </Typography>
              </div>

              {/* BUILDING BLOCKS */}
              <Divider aria-label="list of building blocks">
                <Chip
                  tabIndex={0}
                  aria-label="Building blocks section"
                  label="Building blocks"
                />
              </Divider>
              <div
                className="view-items-section"
                aria-label="building blocks list wrapper"
              >
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
              <Divider aria-label="section with the epilogue block">
                <Chip
                  tabIndex={0}
                  aria-label="Epilogue block section"
                  label="Epilogue block"
                />
              </Divider>
              <div
                className="view-items-section"
                aria-label="wrapper for the epilogue block"
              >
                <EpilogueBlockItem
                  storyImgUrl={data.imageUrl}
                  storyImgAlt={`image: ${data.imageAlt}`}
                  epilogueProgress={data.epilogueProgress}
                  key={data.epilogueProgress.id}
                />
              </div>
            </div>
          )}
        </ErrorBoundary>
      </WithFocusControls>
    </div>
  );
};
