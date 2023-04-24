import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import useFetchData, {
  UseFetchDataOptions,
} from "../../../../api/useFetchData";
import {
  BuildingBlockProgress,
  QuizOption,
  QuizResponse,
  Word,
  WordProgress,
} from "../../../../context";
import { getShuffledArray } from "../../../../utils";
import ErrorBoundary from "../../../page-components/ErrorBoundary/ErrorBoundary";

const fetchOptioons: UseFetchDataOptions = {
  method: "POST",
};

const BlockQuiz = () => {
  const { id: blockProgressId } = useParams<{ id: string }>();
  const { data: initialResponse, loading, error, retry } = useFetchData<QuizResponse>(
    `blocks/${blockProgressId}/start-or-continue-quiz`
  );
  const [currentQuestion, setCurrentQuestion] = useState<QuizResponse>();

  //TODO: restrict page if introduction not finished
  //TODO: start a session in the backend
  //TODO: stop watch for fairly long time
  //TODO: lower or increase score for a word when answered
  //TODO: add inc/dec factor settings, stop-watch settings
  //TODO: complete a block -> emit event completion only if it was alreay completed! -> unblock other blocks -> unlock epiloque (if all blocks finished)
  //      if already completed only change the scores, if it gets through without mistake pass don't repeat questions, otherwise do it untill all are score 100
  //
  //TODO: make question wrongly answer more frequent than the others -> need to do a call to server to calculate that
  //TODO:

  useEffect(() => {
    setCurrentQuestion(initialResponse)
  }, [initialResponse]);

  return (
    <div className="view">
      <ErrorBoundary error={error} onRetry={retry} loading={loading}>
        {currentQuestion && <BlockQuizQuestion currentQuestion={currentQuestion} />}

      </ErrorBoundary> 
    </div>
  );
};

const BlockQuizQuestion = (props: {
  currentQuestion: QuizResponse;
  onChoose: (currentQuestion: QuizResponse, option: QuizOption) => void;
}) => {
  const { id: blockProgressId } = useParams<{ id: string }>();
  const { data, loading, error, retry } = useFetchData<QuizResponse>(
    `blocks/${blockProgressId}/start-or-continue-quiz`
  );

  const onChoose = (option: QuizOption) => on;

  return (
    <div className="view">
      <ErrorBoundary error={error} onRetry={retry} loading={loading}>
        <div className="view-content">
          <>
            <h3>What does 'props.wordProgress.word.text' mean? </h3>
            {data?.options.map((option) => (
              <div key={option.proxyId}>
                {/* TODO: see how you wrap the text */}
                <Button onClick={() => onChoose(option)}>
                  <h5>{option.text}</h5>
                </Button>
              </div>
            ))}
          </>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default BlockQuiz;
