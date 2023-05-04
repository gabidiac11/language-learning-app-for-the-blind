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
            {/* TODO: implement reading of story */}
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

/**
 * TODO:
 * 0.1 implement initial stories with epilogue summary started??
 * 0.1 implement start page with start summary and start/continue quiz (locked or what not)
 * 1. implement GET id -> check if epilogue unlocked
 * 2. implement POST id -> mark summary completed
 * 3. extract logic for choosing questions by probabilities to a separate service to be shared with building block
 *    MAKE SURE - to provide different parameters for building blocks separate from epilogue
 *    MAKE SURE - maybe provide diffrent parameters based on number of words of a block 
 * 4. retest buidling block 
 * 5. start working 
 */

export default EpilogueStartPage;
