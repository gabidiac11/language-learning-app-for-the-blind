import { Button } from "@mui/material";
import { useParams } from "react-router";
import useFetchData from "../../../api/useFetchData";
import { EpilogueProgress } from "../../../context";
import ErrorBoundary from "../../page-components/ErrorBoundary/ErrorBoundary";
import ButtonContinueToEpilogueQuiz from "./EpilogueQuiz/ButtonContinueToEpilogueQuiz";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import "./EpiloguePage.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { lessonLanguageHeader } from "../../../constants";
import { WithFocusControls } from "../../page-components/accessibility/WithFocusControls";
import { PlayableError } from "../../../accessibility/types/playableMessage.type";
import { getPlayableErrorFromUnknown } from "../../../accessibility/api/getPlayableErrorFromUnknown";
import { usePageAudioFeedback } from "../../../accessibility/usePageAudioFeedback";
import { epilogueOverviewPageMessages } from "./appMessages";
import { useIsPlayingAudioMessage } from "../../../accessibility/useIsPlayingAudioMessage";
import { useFeedbackAudioQueue } from "../../../context/hooks/useFeedbackAudiQueue";
import { StopCircle as StopIcon } from "@mui/icons-material";

const EpilogueStartPage = () => {
  const { id: epilogueProgressId, lang } = useParams<{
    id: string;
    lang: string;
  }>();
  const { data, loading, error, retry } = useFetchData<EpilogueProgress>(
    `epilogues/${epilogueProgressId}`,
    lang
  );

  usePageAudioFeedback({
    error,
    loading,
    pageGreeting: epilogueOverviewPageMessages.greetingPageEpilogueOverview,
    pageDataLoadingMessage:
      epilogueOverviewPageMessages.loadingEpilogueOverview,
    pageDataLoadedMessage: epilogueOverviewPageMessages.loadedEpilogueOverview,
  });

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
                aria-label={`Short story content - use arrow down to navigate to the play button to listen this text.`}
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
  const isListening = useIsPlayingAudioMessage(
    props.epilogueProgress.epilogue.audioFile
  );

  const [error, setError] = useState<PlayableError>();
  const loadingRef = useRef(false);
  const [, _setLoading] = useState(loadingRef.current);
  const setLoading = (value: boolean) => {
    loadingRef.current = value;
    _setLoading(value);
  };

  const { singleEnque, dequePlayableMessage } =
    useFeedbackAudioQueue();

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
      const playableError = getPlayableErrorFromUnknown(error);
      setError(playableError);
    } finally {
      setLoading(false);
    }
  }, [props.epilogueProgress]);

  const listenStory = useCallback(() => {
    if (isListening) {
        dequePlayableMessage(props.epilogueProgress.epilogue.audioFile);
      return;
    }
    singleEnque({
      key: props.epilogueProgress.epilogue.audioFile,
      messages: [
        {
          filePath: props.epilogueProgress.epilogue.audioFile,
          text: props.epilogueProgress.epilogue.textStoryTale,
          uniqueName: props.epilogueProgress.epilogue.audioFile,
        },
      ],
    });
  }, [singleEnque, isListening]);

  useEffect(() => {
    if (isListening === false) {
      markEpilogueAsListened();
    }
  }, [isListening]);

  return (
    <ErrorBoundary
      error={error}
      onRetry={markEpilogueAsListened}
      loading={loadingRef.current}
    >
      <div>
        <Button
          tabIndex={0}
          onClick={(event) => {
            event.stopPropagation();
            listenStory();
          }}
          variant="contained"
          aria-hidden={isListening ? "true" : "false"}
          aria-label="Play short story button"
          color={isListening ? "secondary" : "primary"}
          startIcon={isListening ? <StopIcon /> : <VolumeUpIcon />}

          // prevent prematurelyStopPlayableMessages if the previous focused element has the same playing-key 
          playing-key={props.epilogueProgress.epilogue.audioFile}
        >
          {isListening ? "Playing..." : "Play story"}
        </Button>
      </div>
    </ErrorBoundary>
  );
};

export default EpilogueStartPage;
