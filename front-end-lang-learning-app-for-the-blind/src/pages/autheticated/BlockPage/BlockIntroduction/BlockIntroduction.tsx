import { fontStyle } from "@mui/system";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useFetchData from "../../../../api/useFetchData";
import { BuildingBlockProgress, Word } from "../../../../context";
import { getShuffledArray } from "../../../../utils";
import ErrorBoundary from "../../../page-components/ErrorBoundary/ErrorBoundary";
import { Loader } from "../../../page-components/Loader";
import "./BlockIntroduction.scss";
import BlockWordsSummariesCompleted from "./BlockWordsSummariesCompleted";
import ButtonContinueToQuiz from "./ButtonContinueToQuiz";

const BlockIntroduction = () => {
  //TODO: should have something explaining what this page is (later)
  const { id: blockProgressId } = useParams<{ id: string }>();
  const { data, loading, error, retry } = useFetchData<BuildingBlockProgress>(
    `blocks/${blockProgressId}`
  );
  const [indexWord, setIndexWord] = useState<number>();
  const [learningSitCompleted, setLearningSitCompleted] = useState(false);

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

  return (
    <div className="view block-summary-view">
      <ErrorBoundary error={error} onRetry={retry} loading={loading}>
        {!error && data && blockProgressId && (
          <div className="view-content">
            <h1> {data.block.name} </h1>
            {!learningSitCompleted && indexWord !== undefined && (
              <BlockWordSummary
                key={data.block.words[indexWord].id}
                word={data.block.words[indexWord]}
                next={next}
              />
            )}
            {learningSitCompleted && (
              <BlockWordsSummariesCompleted block={data} />
            )}
            {data.timeSummaryCompleted && (
              <ButtonContinueToQuiz blockProgressId={data.id} />
            )}
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

const BlockWordSummary: React.FC<{ word: Word; next: () => void }> = (
  props
) => {
  //TODO: read and display translations
  //TODO: read notes and do the flow
  return (
    <div>
      <h2> {props.word.text}</h2>
      <p>
        {props.word.shortTranslation} - {props.word.longTranslation}
      </p>
      {/* TODO: delete temporar next btn */}
      <div>
        <button onClick={props.next}>next</button>
      </div>
    </div>
  );
};

export default BlockIntroduction;
