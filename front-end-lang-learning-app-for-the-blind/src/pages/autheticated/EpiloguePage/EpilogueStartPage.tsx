import { useParams } from "react-router";
import useFetchData from "../../../api/useFetchData";
import { EpilogueProgress } from "../../../context";
import ErrorBoundary from "../../page-components/ErrorBoundary/ErrorBoundary";
import ButtonContinueToQuiz from "../BlockPage/BlockIntroduction/ButtonContinueToQuiz";

const EpilogueStartPage = () => {
  //TODO: should have something explaining what this page is (later)
  const { id: epilogueId } = useParams<{ id: string }>();
  const { data, loading, error, retry } = useFetchData<EpilogueProgress>(
    `epilogue/${epilogueId}`
  );

  return (
    <div className="view epilogue-summary-view">
      <ErrorBoundary error={error} onRetry={retry} loading={loading}>
        {!error && data && epilogueId && (
          <div className="view-content">
            <h1> Epilogue: {data.epilogue.name} </h1>
            <h5> {data.epilogue.textStoryTale} </h5>
            {data.timeSummaryCompleted && (
              <ButtonContinueToQuiz blockProgressId={data.id} />
            )}
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default EpilogueStartPage;
