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
    fetchOptioons
  );
  // TODO: review the text is not ideal for now
  return (
    <ErrorBoundary error={error} onRetry={retry} loading={loading}>
      <div>
        Completed!🎉
        <br></br>
        {props.blockProgress.timeSummaryCompleted
          ? "You again completed the words introduction"
          : "You completed the words introduction. You can now start the word practice quiz."}
        <ButtonContinueToBlockQuiz blockProgressId={props.blockProgress.id} />
      </div>
    </ErrorBoundary>
  );
};

export default BlockWordsSummariesCompleted;
