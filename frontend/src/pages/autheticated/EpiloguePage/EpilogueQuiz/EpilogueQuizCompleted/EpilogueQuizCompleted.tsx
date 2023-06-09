import { Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useParams } from "react-router";
import useFetchData from "../../../../../api/useFetchData";
import { UserStory } from "../../../../../context/contextTypes/ctxTypes";
import { QuizBlockCompletedResponse } from "../../../../../context/contextTypes/quizTypes";
import ErrorBoundary from "../../../../page-components/ErrorBoundary/ErrorBoundary";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import "../EpilogueQuiz.scss";
import { StoryCard } from "../../../StoriesOverviewPage/StoryCard/StoryCard";
import { WithFocusControls } from "../../../../page-components/accessibility/WithFocusControls";
import { usePageAudioFeedback } from "../../../../../accessibility/usePageAudioFeedback";
import { epiloqueQuizCompletedPageMessages } from "./appMessages";
import { useEffect, useState } from "react";
import { AppMessage } from "../../../../../accessibility/types/appMessage.type";

const StyleWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(3),
  },
}));

const EpilogueQuizCompleted = () => {
  const {
    id: epilogueProgressId,
    quizId,
    lang,
  } = useParams<{
    id: string;
    quizId: string;
    lang: string;
  }>();
  const { data, loading, error, retry } =
    useFetchData<QuizBlockCompletedResponse>(
      `epilogues/${epilogueProgressId}/quiz/${quizId}/completed`,
      lang
    );

  const [pageDataLoadedMessage, setPageDataLoadedMessage] = useState<
    AppMessage[]
  >([]);

  usePageAudioFeedback({
    error,
    loading: !pageDataLoadedMessage.length,
    pageGreeting:
      epiloqueQuizCompletedPageMessages.loadingEpilogueQuizCompleted,
    pageDataLoadedMessage,
  });

  useEffect(() => {
    if (data) {
      setPageDataLoadedMessage(computeAudioMessageFromResponse(data));
    }
  }, [data]);

  return (
    <WithFocusControls
      direction="vertical"
      customMessage="Press arrow up or arrow down to switch between page information"
    >
      <div
        className="view epilgue-quiz-view"
        aria-label="wrapper for epilogue quiz success page"
      >
        <ErrorBoundary error={error} onRetry={retry} loading={loading}>
          <div
            className="view-content quiz-view-content-complete"
            aria-label="inner wrapper for epilogue quiz success page"
          >
            {data && (
              <StyleWrapper>
                <div
                  className="flex-center-all flex-col"
                  aria-label="greeting wrapper for epilogue quiz success page"
                >
                  <span aria-hidden="true">
                    <EmojiEventsIcon
                      className="success-icon"
                      fontSize="large"
                      color="success"
                    />
                  </span>
                  <h2
                    tabIndex={0}
                  >{`Congratulations! You finished this story.`}</h2>
                </div>

                {!!data?.userStoriesUnlocked?.length && (
                  <DisplayStoryUnlockedItems
                    stories={data.userStoriesUnlocked}
                  />
                )}
                {data?.userStoriesUnlocked?.length === 0 && (
                  <div aria-label="wrapper for actions">
                    <Divider aria-label="divider for action section">
                      <Chip tabIndex={0} label="Actions" />
                    </Divider>
                  </div>
                )}

                <Typography mt={10} align="center">
                  <Link
                    tabIndex={0}
                    to={`/stories/${lang}/${data.blockCompletedStoryRefId}`}
                  >
                    Go to the original story
                  </Link>
                </Typography>
              </StyleWrapper>
            )}
          </div>
        </ErrorBoundary>
      </div>
    </WithFocusControls>
  );
};

const DisplayStoryUnlockedItems = (props: { stories: UserStory[] }) => {
  return (
    <div aria-label="wrapper for unlocked stories achieved">
      <Divider aria-label="list of unlocked stories">
        <Chip tabIndex={0} label="Stories unlocked" />
      </Divider>
      <div
        className="view-items-section"
        aria-label="wrapper for unlocked stories section"
      >
        {props.stories.map((userStory: UserStory) => (
          <StoryCard key={userStory.id} userStory={userStory} />
        ))}
      </div>
    </div>
  );
};

function computeAudioMessageFromResponse(
  quizCompletedResponse: QuizBlockCompletedResponse
) {
  const responsePlayables = quizCompletedResponse.playableApiMessages ?? [];
  const messages = [...responsePlayables];

  messages.push(epiloqueQuizCompletedPageMessages.loadedEpilogueQuizCompleted);
  return messages;
}

export default EpilogueQuizCompleted;
