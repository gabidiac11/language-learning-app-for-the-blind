import { Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useParams } from "react-router";
import useFetchData from "../../../../api/useFetchData";
import {
  BuildingBlockProgress,
  EpilogueProgress,
} from "../../../../context/contextTypes/ctxTypes";
import { QuizBlockCompletedResponse } from "../../../../context/contextTypes/quizTypes";
import ErrorBoundary from "../../../page-components/ErrorBoundary/ErrorBoundary";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import BuildingBlockItem from "../../StoryPage/BuildingBlockItem";
import EpilogueBlockItem from "../../StoryPage/EpilogueBlockItem";

const StyleWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(3),
  },
}));

const BlockQuizCompleted = () => {
  const { id: blockProgressId, quizId } = useParams<{
    id: string;
    quizId: string;
  }>();
  const { data, loading, error, retry } =
    useFetchData<QuizBlockCompletedResponse>(
      `blocks/${blockProgressId}/quiz/${quizId}/completed`
    );

  return (
    <div className="view quiz-view">
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
                <h2 style={{ textAlign: "center" }}>
                  {`Coungradulations!`}
                  <br></br>
                  {`You finished block '${data.blockCompleted?.block.name}'.`}
                </h2>
              </div>
              {!!data?.blockProgressUnlockedItems?.length && (
                <DisplayBlockProgressUnlockedItems
                  blocks={data.blockProgressUnlockedItems}
                />
              )}
              {data?.epilogueProgressUnlocked && (
                <DisplayBlockEpilogueUnlocked
                  epilogue={data.epilogueProgressUnlocked}
                />
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
const DisplayBlockProgressUnlockedItems = (props: {
  blocks: BuildingBlockProgress[];
}) => {
  return (
    <div>
      <Divider>
        <Chip label="Blocks unlocked" />
      </Divider>
      <div className="view-items-section">
        {props.blocks.map((blockProgress: BuildingBlockProgress) => (
          <BuildingBlockItem
            key={blockProgress.id}
            blockProgress={blockProgress}
          />
        ))}
      </div>
    </div>
  );
};
const DisplayBlockEpilogueUnlocked = (props: {
  epilogue: EpilogueProgress;
}) => {
  return (
    <div>
      <Divider>
        <Chip label="Epilogue unlocked" />
      </Divider>
      <div className="view-items-section">
        <EpilogueBlockItem
          epilogueProgress={props.epilogue}
          // TODO:
          storyImgUrl="https://images.pexels.com/photos/3807395/pexels-photo-3807395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </div>
    </div>
  );
};

export default BlockQuizCompleted;