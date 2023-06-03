import { Typography } from "@mui/material";
import useFetchData, {
  UseFetchDataOptions,
} from "../../../../api/useFetchData";
import { BuildingBlockProgress } from "../../../../context";
import ErrorBoundary from "../../../page-components/ErrorBoundary/ErrorBoundary";
import ButtonContinueToBlockQuiz from "../ButtonContinueToBlockQuiz";

const fetchOptioons: UseFetchDataOptions = {
  method: "POST",
};

const BlockWordsSummariesCompleted = (props: {
  blockProgress: BuildingBlockProgress;
}) => {
  const { loading, error, retry } = useFetchData<{}>(
    `blocks/${props.blockProgress.id}/complete-summary`,
    props.blockProgress.lang,
    fetchOptioons
  );
  // TODO: review the text is not ideal for now

  return (
    <ErrorBoundary error={error} onRetry={retry} loading={loading}>
      <div aria-label="wrapper for section where you're informed you completed the word introduction">
        <Typography tabIndex={0} variant="subtitle1" aria-label={`Congratulations! You completed the words introduction, you can start the words quiz.`}>
          Completed! 🎉
          <br></br>
          You completed the words introduction, you can start the words quiz.
        </Typography>
        <ButtonContinueToBlockQuiz
          lang={props.blockProgress.lang}
          blockProgressId={props.blockProgress.id}
        />
      </div>
    </ErrorBoundary>
  );
};

export default BlockWordsSummariesCompleted;
