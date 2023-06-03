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
import { WithFocusControls } from "../../../../accessibility/WithFocusControls";

const StyleWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(3),
  },
}));

const BlockQuizCompleted = () => {
  const {
    id: blockProgressId,
    quizId,
    lang,
  } = useParams<{
    id: string;
    quizId: string;
    lang: string;
  }>();
  const { data, loading, error, retry } =
    useFetchData<QuizBlockCompletedResponse>(
      `blocks/${blockProgressId}/quiz/${quizId}/completed`,
      lang
    );

  return (
    <div
      className="view quiz-view"
      aria-label="wrapper for block quiz success page"
    >
      <WithFocusControls
        direction="vertical"
        customMessage="Press arrow up or arrow down to switch between page information"
      >
        <ErrorBoundary error={error} onRetry={retry} loading={loading}>
          <div
            className="view-content quiz-view-content-complete"
            aria-label="inner wrapper for block quiz success page"
          >
            {data && (
              <StyleWrapper>
                <div
                  className="flex-center-all flex-col"
                  aria-label="greeting wrapper for block quiz success page"
                >
                  <span aria-hidden="true">
                    <EmojiEventsIcon
                      className="success-icon"
                      fontSize="large"
                      color="success"
                      aria-hidden="true"
                    />
                  </span>
                  <h2 tabIndex={0} style={{ textAlign: "center" }}>
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
      </WithFocusControls>
    </div>
  );
};
const DisplayBlockProgressUnlockedItems = (props: {
  blocks: BuildingBlockProgress[];
}) => {
  return (
    <div aria-label="wrapper for unlocked blocks achieved">
      <Divider aria-label="list of unlocked building blocks">
        <Chip
          tabIndex={0}
          aria-label="Building blocks unlocked"
          label="Blocks unlocked"
        />
      </Divider>
      <div
        className="view-items-section"
        aria-label="wrapper for unlocked blocks section"
      >
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
    <div aria-label="wrapper for unlocked epilogue achieved">
      <Divider aria-label="divider unlocked epilogue block">
        <Chip
          label="Epilogue unlocked"
          tabIndex={0}
          aria-label="epilogue unlocked"
        />
      </Divider>
      <div
        className="view-items-section"
        aria-label="wrapper for unlocked epilogue section"
      >
        <EpilogueBlockItem
          epilogueProgress={props.epilogue}
          // TODO:
          storyImgUrl={props.epilogue.epilogue.imageUrl}
          storyImgAlt={props.epilogue.epilogue.imageAlt}
        />
      </div>
    </div>
  );
};

export default BlockQuizCompleted;
