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
import { lessonLanguageHeader } from "../../../constants";
import { WithFocusControls } from "../../../accessibility/WithFocusControls";

const EpilogueStartPage = () => {
  //TODO: should have something explaining what this page is (later)
  const { id: epilogueProgressId, lang } = useParams<{
    id: string;
    lang: string;
  }>();
  const { data, loading, error, retry } = useFetchData<EpilogueProgress>(
    `epilogues/${epilogueProgressId}`,
    lang
  );

  useEffect(() => {}, []);

  return (
    <div
      className="view epilogue-summary-view"
      aria-label="page wrapper for epilogue short story"
    >
      <ErrorBoundary error={error} onRetry={retry} loading={loading}>
        {!error && data && epilogueProgressId && (
          <WithFocusControls
            direction="vertical"
            customMessage="Press arrow up or arrow down to switch between page information"
          >
            <div
              className="view-content"
              aria-label="inner wrapper for epilogue short story"
            >
              <h1
                tabIndex={0}
                aria-label={`Title epilogue: ${data.epilogue.name}`}
              >
                Epilogue: {data.epilogue.name}
              </h1>

              {/* TODO: implement reading of story */}
              <p
                className="epilogue-txt"
                tabIndex={0}
                aria-label={`Short story content: ${data.epilogue.textStoryTale}`}
              >
                {data.epilogue.textStoryTale}
              </p>

              <StoryListener epilogueProgress={data} reload={retry} />

              {data.timeSummaryCompleted && (
                <ButtonContinueToEpilogueQuiz
                  lang={data.lang}
                  epilogueProgressId={data.id}
                />
              )}
            </div>
          </WithFocusControls>
        )}
      </ErrorBoundary>
    </div>
  );
};

const StoryListener = (props: {
  epilogueProgress: EpilogueProgress;
  reload: () => void;
}) => {
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
    if (props.epilogueProgress.timeSummaryCompleted) {
      return;
    }
    setError(undefined);
    setLoading(true);
    try {
      const config = {
        headers: {
          [lessonLanguageHeader]: props.epilogueProgress.lang,
        },
      };

      await axiosInstance.post(
        `epilogues/${props.epilogueProgress.id}/complete-summary`,
        {},
        config
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
          tabIndex={0}
          onClick={listenStory}
          variant="contained"
          color={isListening ? "secondary" : "primary"}
          startIcon={<VolumeUpIcon aria-hidden="true" />}
        >
          Play story
        </Button>
      </div>
    </ErrorBoundary>
  );
};

export default EpilogueStartPage;
