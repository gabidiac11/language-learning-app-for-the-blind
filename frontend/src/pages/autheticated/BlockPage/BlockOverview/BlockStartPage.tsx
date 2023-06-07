import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { WithFocusControls } from "../../../../accessibility/WithFocusControls";
import useFetchData from "../../../../api/useFetchData";
import { BuildingBlockProgress } from "../../../../context";
import ErrorBoundary from "../../../page-components/ErrorBoundary/ErrorBoundary";
import { usePageAudioFeedback, usePreappendLoadedData } from "../../../../accessibility/usePageAudioFeedback";
import { blockStartPageMessages } from "./appMessages";
import explanations from "../explanations";

const BlockStartPage = () => {
  const { id: blockProgressId, lang } = useParams<{
    id: string;
    lang: string;
  }>();
  const { data, loading, error, retry } = useFetchData<BuildingBlockProgress>(
    `blocks/${blockProgressId}`,
    lang
  );

  const pageDataLoadedMessage = usePreappendLoadedData(
    blockStartPageMessages.loadedBlockStart,
    data?.block?.name,
    data?.block?.audioFile,
  );

  usePageAudioFeedback({
    error,
    loading,
    pageGreeting: blockStartPageMessages.greetingPageBlockStart,
    pageDataLoadingMessage: blockStartPageMessages.loadingBlockStart,
    pageDataLoadedMessage,
  });

  return (
    <div
      className="view"
      aria-label={`wrapper for page menu of building block lesson ${
        data?.block?.name ?? ""
      }`}
    >
      <ErrorBoundary error={error} onRetry={retry} loading={loading}>
        {!error && data && blockProgressId && (
          <WithFocusControls
            direction="vertical"
            customMessage="Press arrow up or arrow down to switch between available menu options"
          >
            <div
              className="view-content"
              aria-label={`inner wrapper for page menu of building block lesson ${
                data?.block?.name ?? ""
              }`}
            >
              <h1
                tabIndex={0}
                aria-label={`Title ${
                  data?.block.name ?? ""
                } - this is menu page title for a building block`}
              >
                {" "}
                {data.block.name}{" "}
              </h1>
              <h3>
                <Link
                  to={`/blocks/${lang}/${blockProgressId}/introduction`}
                  aria-label={`Block's words introduction and practice - ${
                    !!data.timeSummaryCompleted
                      ? "completed"
                      : "not completed. Please complete it to start it to unlock the words quiz"
                  }. ${explanations.summaryBlock}`}
                  tabIndex={0}
                >
                  Word introduction and practice{" "}
                  {!!data.timeSummaryCompleted && "✔️"}
                </Link>
              </h3>
              <h3>
                {!!data.timeSummaryCompleted && (
                  <Link
                    to={`/blocks/${lang}/${blockProgressId}/quiz`}
                    aria-label={`Quiz for words ${
                      !!data.timeCompleted
                        ? "completed"
                        : "unlocked, but not completed. Press enter to start or continue."
                    }. ${explanations.quizBlock}`}
                    tabIndex={0}
                  >
                    Quiz {!!data.timeCompleted && "✔️"}
                  </Link>
                )}
                {!data.timeSummaryCompleted && (
                  <span
                    tabIndex={0}
                    aria-label={`Quiz for words locked. Please complete introduction and summary to unlock. ${explanations.quizBlock}`}
                  >
                    Quiz 🔒 - complete words introduction to start
                  </span>
                )}
              </h3>
            </div>
          </WithFocusControls>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default BlockStartPage;
