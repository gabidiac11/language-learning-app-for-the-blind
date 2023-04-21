import { useParams } from "react-router";
import useFetchData from "../../../app-hooks/useFetchData";
import { BuildingBlockProgress, UserStory } from "../../../context";
import ErrorBoundary from "../../page-components/ErrorBoundary/ErrorBoundary";
import { Loader } from "../../page-components/Loader";
import BuildingBlockItem from "../StoryPage/BuildingBlockItem";

const BlockPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error, retry } = useFetchData<BuildingBlockProgress>(
    `blocks/${id}`
  );

  return (
    <div className="view story-page-wrapper">
      <ErrorBoundary error={error} onRetry={retry}>
        {loading && <Loader />}
        {!error && data && (
          <div className="view-content">
            <ul>
              {data.block.words.map((w) => (
                <li key={w.id}>{`${w.text} -> ${w.shortTranslation}`}</li>
              ))}
            </ul>
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default BlockPage;
