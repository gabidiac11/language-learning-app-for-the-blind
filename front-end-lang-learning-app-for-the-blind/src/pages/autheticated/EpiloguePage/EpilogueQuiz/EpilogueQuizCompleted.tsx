import { Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useParams } from "react-router";
import useFetchData from "../../../../api/useFetchData";
import {
  UserStory,
} from "../../../../context/contextTypes/ctxTypes";
import { QuizBlockCompletedResponse } from "../../../../context/contextTypes/quizTypes";
import ErrorBoundary from "../../../page-components/ErrorBoundary/ErrorBoundary";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import "./EpilogueQuiz.scss";
import { StoryCard } from "../../StoriesOverviewPage/StoryCard/StoryCard";

const StyleWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(3),
  },
}));

const EpilogueQuizCompleted = () => {
  const { id: epilogueProgressId, quizId } = useParams<{
    id: string;
    quizId: string;
  }>();
  const { data, loading, error, retry } =
    useFetchData<QuizBlockCompletedResponse>(
      `epilogues/${epilogueProgressId}/quiz/${quizId}/completed`
    );

  return (
    <div className="view epilgue-quiz-view">
      <ErrorBoundary error={error} onRetry={retry} loading={loading}>
        <div className="view-content quiz-view-content-complete">
          {data && (
            <StyleWrapper>
              <div className="flex-center-all flex-col">
                <span>
                  <EmojiEventsIcon
                    className="success-icon"
                    fontSize="large"
                    color="success"
                  />{" "}
                </span>
                <h2>{`Coungradulations! You finished story this story.`}</h2>
              </div>

              {data?.userStoriesUnlocked && (
                <DisplayStoryUnlockedItems stories={data.userStoriesUnlocked} />
              )}

              <Typography mt={10} align="center">
                <Link to={`/stories/${data.blockCompletedStoryRefId}`}>
                  Go to original story
                </Link>
              </Typography>
            </StyleWrapper>
          )}
        </div>
      </ErrorBoundary>
    </div>
  );
};

const DisplayStoryUnlockedItems = (props: { stories: UserStory[] }) => {
  return (
    <div>
      <Divider>
        <Chip label="Stories unlocked" />
      </Divider>
      <div
        // TOOD: test if still looks good
        className="view-items-section"
      >
        {props.stories.map((userStory: UserStory) => (
          <StoryCard key={userStory.id} userStory={userStory} />
        ))}
      </div>
    </div>
  );
};

export default EpilogueQuizCompleted;
