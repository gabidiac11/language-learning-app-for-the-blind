import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useFetchData from "../../../api/useFetchData";
import { BuildingBlockProgress } from "../../../context";
import ErrorBoundary from "../../page-components/ErrorBoundary/ErrorBoundary";

const BlockStartPage = () => {
  const { id: blockProgressId } = useParams<{ id: string }>();
  const { data, loading, error, retry } = useFetchData<BuildingBlockProgress>(
    `blocks/${blockProgressId}`
  );

  return (
    <div className="view">
      <ErrorBoundary error={error} onRetry={retry} loading={loading}>
        {!error && data && blockProgressId && (
          <div className="view-content">
            <h1> {data.block.name} </h1>
            <h3>
              <Link to={`/blocks/${blockProgressId}/introduction`}>
               Word introduction and practice {!!data.timeSummaryCompleted && "✔️"}
              </Link>
            </h3>
            {/* TODO: inform why is locked - introduction needs to be started */}
            <h3>
              {!!data.timeSummaryCompleted && (
                <Link to={`/blocks/${blockProgressId}/quiz`}>
                  Quiz
                </Link>
              )}
              {!data.timeSummaryCompleted &&
                "Quiz 🔒 - complete words introduction to start"}
            </h3>
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default BlockStartPage;
