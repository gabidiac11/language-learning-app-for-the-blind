import useFetchData, {
  UseFetchDataOptions,
} from "../../../../api/useFetchData";
import { BuildingBlockProgress } from "../../../../context";
import ErrorBoundary from "../../../page-components/ErrorBoundary/ErrorBoundary";
import ButtonContinueToQuiz from "../../EpiloguePage/ButtonContinueToQuiz";

const fetchOptioons: UseFetchDataOptions = {
  method: "POST",
};

const BlockWordsSummariesCompleted = (props: {
  block: BuildingBlockProgress;
}) => {
  const { loading, error, retry } = useFetchData<{}>(
    `blocks/${props.block.id}/complete-summary`,
    fetchOptioons
  );
  // TODO: review the text is not ideal for now
  return (
    <ErrorBoundary error={error} onRetry={retry} loading={loading}>
      <div>
        Completed!🎉
        <br></br>
        {props.block.timeSummaryCompleted
          ? "You again completed the words introduction"
          : "You completed the words introduction. You can now start the word practice quiz."}
        <ButtonContinueToQuiz epilogueProgressId={props.block.id} />
      </div>
    </ErrorBoundary>
  );
};

export default BlockWordsSummariesCompleted;
