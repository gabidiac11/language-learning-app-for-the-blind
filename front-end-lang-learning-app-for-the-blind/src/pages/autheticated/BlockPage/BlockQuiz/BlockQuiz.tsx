import { Button } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
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


type UseFetchDataOptionsQuizRequest = {
  proxyId: number;
}

const BlockQuiz = () => {
  const { id: blockProgressId } = useParams<{ id: string }>();
  const [fetchOptions, setFetchOptions] = useState<UseFetchDataOptions>({
    method: "POST",
  })
  const {
    data: initialResponse,
    loading,
    error,
    retry,
  } = useFetchData<QuizResponse>(
    `blocks/${blockProgressId}/start-or-continue-quiz`,
    fetchOptions
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

  const onChoose = useCallback((option: QuizOption) => {
    setFetchOptions()
    /**
     * TODO:
     * create new options and trigger new post
     * {
     *  questionId: ....
     *  proxyIdOption: ...
     * }
     * 
     * receive:
     * {
     *  proxyIdCorrect: ...
     *  ...the other stuff from QuizResponse - meaning the next question
     * }
     * 
     * POST:
     * find question
     * set status from unset to Miss/Hit
     * if all current questions were answered: 
     *  if is finale -> return isFinale in response together with the other stuff
     *  else -> safe history questions and compiled next set of questions with the probability algorithm
     * return response detailed earlier with correct id and next question
     */
  }, []);

  useEffect(() => {
    setCurrentQuestion(initialResponse);
  }, [initialResponse]);

  return (
    <div className="view">
      <ErrorBoundary error={error} onRetry={retry} loading={loading}>
        <div className="view-content">
          {currentQuestion && (
            <BlockQuizQuestion
              currentQuestion={currentQuestion}
              onChoose={onChoose}
            />
          )}
        </div>
      </ErrorBoundary>
    </div>
  );
};

const BlockQuizQuestion = (props: {
  currentQuestion: QuizResponse;
  onChoose: (option: QuizOption) => void;
}) => {
  return (
    <>
      <h3>{props.currentQuestion.question}</h3>
      {/* <h3>What does '{props.currentQuestion.question}' mean? </h3> */}
      {props.currentQuestion.options.map((option) => (
        <div key={option.proxyId}>
          {/* TODO: see how you wrap the text */}
          <Button onClick={() => props.onChoose(option)}>
            <h5>{option.text}</h5>
          </Button>
        </div>
      ))}
    </>
  );
};

export default BlockQuiz;
