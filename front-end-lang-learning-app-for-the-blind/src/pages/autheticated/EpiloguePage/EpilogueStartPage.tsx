import { Button } from "@mui/material";
import { useParams } from "react-router";
import useFetchData, { UseFetchDataOptions } from "../../../api/useFetchData";
import { EpilogueProgress } from "../../../context";
import ErrorBoundary from "../../page-components/ErrorBoundary/ErrorBoundary";
import ButtonContinueToQuiz from "./ButtonContinueToQuiz";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import "./EpiloguePage.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import axiosInstance from "../../../axiosInstance";

const EpilogueStartPage = () => {
  //TODO: should have something explaining what this page is (later)
  const { id: epilogueId } = useParams<{ id: string }>();
  const { data, loading, error, retry } = useFetchData<EpilogueProgress>(
    `epilogue/${epilogueId}`
  );

  useEffect(() => {}, []);

  return (
    <div className="view epilogue-summary-view">
      <ErrorBoundary error={error} onRetry={retry} loading={loading}>
        {!error && data && epilogueId && (
          <div className="view-content">
            <h1> Epilogue: {data.epilogue.name} </h1>

            {/* TODO: implement reading of story */}
            <p className="epilogue-txt"> {data.epilogue.textStoryTale} </p>

            <StoryListener epilogueProgress={data} reload={retry}/>

            {data.timeSummaryCompleted && (
              <ButtonContinueToQuiz epilogueProgressId={data.id} />
            )}
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

const StoryListener = (props: { epilogueProgress: EpilogueProgress, reload:() => void }) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const [error, setError] = useState<unknown>();
  const loadingRef = useRef(false);
  const [, _setLoading] = useState(loadingRef.current);
  const setLoading = (value: boolean) => {
    loadingRef.current = value;
    _setLoading(value);
  };

  const [isListening, setIsListening] = useState(false);

  const markEpilogueAsListened = useCallback(async () => {
    setError(undefined);
    setLoading(true);
    try {
      await axiosInstance.post(
        `epilogue/${props.epilogueProgress.id}/complete-summary`
      );
      props.reload();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [props.epilogueProgress]);

  const listenStory = useCallback(() => {
    setIsListening(true);

    // TODO: only make the request if summary not completed
    timeoutRef.current = setTimeout(() => {
      setIsListening(false);
      markEpilogueAsListened();
    }, 2000);
  }, [markEpilogueAsListened]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <ErrorBoundary
      error={error}
      onRetry={markEpilogueAsListened}
      loading={loadingRef.current}
    >
      <div>
        {/* TODO:  */}
        <Button
          onClick={listenStory}
          variant="contained"
          color={isListening ? "secondary" : "primary"}
          startIcon={<VolumeUpIcon />}
        >
          Read story
        </Button>
      </div>
    </ErrorBoundary>
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
