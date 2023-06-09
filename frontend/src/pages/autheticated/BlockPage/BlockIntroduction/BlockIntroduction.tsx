import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router";
import useFetchData from "../../../../api/useFetchData";
import { BuildingBlockProgress } from "../../../../context";
import { getShuffledArray } from "../../../../utils";
import ErrorBoundary from "../../../page-components/ErrorBoundary/ErrorBoundary";
import ButtonContinueToBlockQuiz from "../ButtonContinueToBlockQuiz";
import "./BlockIntroduction.scss";
import BlockWordsSummariesCompleted from "./BlockWordsSummariesCompleted";
import explanations from "../explanations";
import { BlockWordSummary } from "./BlockWordSummary";
import { WithFocusControls } from "../../../page-components/accessibility/WithFocusControls";
import { blockIntroductionPageMessages } from "./appMessages";
import { screenReader } from "../../../../accessibility/appReaders";
import { usePageAudioFeedback } from "../../../../accessibility/audioSpeaker/hooks/usePageAudioFeedback";

const BlockIntroduction = () => {
  const { id: blockProgressId, lang } = useParams<{
    id: string;
    lang: string;
  }>();
  const { data, loading, error, retry } = useFetchData<BuildingBlockProgress>(
    `blocks/${blockProgressId}`,
    lang
  );
  const [indexWord, setIndexWord] = useState<number>();
  const [learningSitCompleted, setLearningSitCompleted] = useState(false);

  usePageAudioFeedback({
    error,
    loading,
    pageGreeting: blockIntroductionPageMessages.greetingPageBlockIntroduction,
    pageDataLoadingMessage:
      blockIntroductionPageMessages.loadingBlockIntroduction,
    pageDataLoadedMessage:
      blockIntroductionPageMessages.loadedBlockIntroduction,
  });

  const completeSession = useCallback(() => {
    setLearningSitCompleted(true);
  }, []);

  const next = useCallback(() => {
    const indexWord_ = indexWord ?? 0;
    if (indexWord_ + 1 >= (data?.block.words.length ?? 0)) {
      completeSession();
      return;
    }
    setIndexWord(indexWord_ + 1);
  }, [indexWord, data]);

  useLayoutEffect(() => {
    if (data) {
      data.block.words = getShuffledArray(data.block.words);
      setIndexWord(0);
    }
  }, [data]);

  useEffect(() => {
    return () => {
      screenReader.stopIfPlaying();
    };
  }, []);

  return (
    <div
      className="view block-summary-view"
      aria-label={`wrapper for summary introduction of building block ${
        data?.block?.name ?? ""
      }`}
    >
      <ErrorBoundary error={error} onRetry={retry} loading={loading}>
        {!error && data && blockProgressId && (
          <div
            className="view-content"
            aria-label={`inner wrapper for summary introduction of building block ${
              data?.block?.name ?? ""
            }. ${explanations.summaryBlock}`}
          >
            <h1
              tabIndex={0}
              aria-label={`Summary page title of building block ${
                data?.block.name ?? ""
              }. ${explanations.summaryBlock}`}
            >
              {data.block.name} - building block
            </h1>
            <WithFocusControls
              direction="vertical"
              customMessage="Press arrow up or arrow down to switch between available menu options"
            >
              <>
                {!learningSitCompleted && indexWord !== undefined && (
                  <BlockWordSummary
                    isFirst={indexWord === 0}
                    key={data.block.words[indexWord].id}
                    word={data.block.words[indexWord]}
                    next={next}
                  />
                )}
                {learningSitCompleted && (
                  <BlockWordsSummariesCompleted blockProgress={data} />
                )}
                {!learningSitCompleted && data.timeSummaryCompleted && (
                  <ButtonContinueToBlockQuiz
                    lang={data.lang}
                    blockProgressId={data.id}
                  />
                )}
              </>
            </WithFocusControls>
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default BlockIntroduction;
