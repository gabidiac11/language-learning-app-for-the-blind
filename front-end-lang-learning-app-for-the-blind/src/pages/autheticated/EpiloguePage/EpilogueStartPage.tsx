import { Button } from "@mui/material";
import { useParams } from "react-router";
import useFetchData, { UseFetchDataOptions } from "../../../api/useFetchData";
import { EpilogueProgress } from "../../../context";
import ErrorBoundary from "../../page-components/ErrorBoundary/ErrorBoundary";
import ButtonContinueToEpilogueQuiz from "./EpilogueQuiz/ButtonContinueToEpilogueQuiz";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import "./EpiloguePage.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import axiosInstance from "../../../axiosInstance";

const EpilogueStartPage = () => {
  //TODO: should have something explaining what this page is (later)
  const { id: epilogueProgressId } = useParams<{ id: string }>();
  const { data, loading, error, retry } = useFetchData<EpilogueProgress>(
    `epilogues/${epilogueProgressId}`
  );

  useEffect(() => {}, []);

  return (
    <div className="view epilogue-summary-view">
      <ErrorBoundary error={error} onRetry={retry} loading={loading}>
        {!error && data && epilogueProgressId && (
          <div className="view-content">
            <h1> Epilogue: {data.epilogue.name} </h1>

            {/* TODO: implement reading of story */}
            <p className="epilogue-txt"> {data.epilogue.textStoryTale} </p>

            <StoryListener epilogueProgress={data} reload={retry}/>

            {data.timeSummaryCompleted && (
              <ButtonContinueToEpilogueQuiz epilogueProgressId={data.id} />
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
    if(props.epilogueProgress.timeSummaryCompleted) {
      return;
    }
    setError(undefined);
    setLoading(true);
    try {
      await axiosInstance.post(
        `epilogues/${props.epilogueProgress.id}/complete-summary`
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

export default EpilogueStartPage;
