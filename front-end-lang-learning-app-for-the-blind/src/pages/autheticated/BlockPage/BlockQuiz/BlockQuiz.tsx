import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import useFetchData from "../../../../api/useFetchData";
import {
  UseFetchDataOptionsQuizRequest,
  QuizResponse,
  QuizOption,
  QuizRequestBodyAnswer,
  QuizRequestBodyIntialQuestion,
  QuizResponseNextQuestion,
  QuizResponseComplete,
} from "../../../../context/contextTypes/quizTypes";
import ErrorBoundary from "../../../page-components/ErrorBoundary/ErrorBoundary";
import BlockQuizCompleted from "./BlockQuizCompleted";
import BlockQuizQuestion from "./BlockQuizQuestion";
import "./BlockQuiz.scss";

const requestIntialQuestionFetchOption: UseFetchDataOptionsQuizRequest = {
  method: "POST",
  body: {
    questionRequested: true,
  },
};

const BlockQuiz = () => {
  const { id: blockProgressId } = useParams<{ id: string }>();
  const [fetchOptions, setFetchOptions] =
    useState<UseFetchDataOptionsQuizRequest>(requestIntialQuestionFetchOption);
  const {
    dataWithHttpResponse: response,
    loading,
    error,
    retry,
  } = useFetchData<QuizResponse>(
    `blocks/${blockProgressId}/quiz`,
    fetchOptions
  );
  const [currentQuestion, setCurrentQuestion] =
    useState<QuizResponseNextQuestion>();
  const [nextQuestion, setNextQuestion] = useState<QuizResponseNextQuestion>();
  const [quizCompleted, setQuizCompleted] = useState<boolean>();
  const [preserveChildren, setPreserveChildren] = useState<boolean>();

  const onChoose = useCallback(
    (option: QuizOption) => {
      if (!currentQuestion) {
        throw new Error(
          "Contact admin: this should not happen - current question is null."
        ); // TODO: do to make this more accesibile and manageable for the user
      }

      // new request is triggered by changing these fetch options
      const body: QuizRequestBodyAnswer = {
        optionId: option.id,
        questionId: currentQuestion.questionId,
      };
      setFetchOptions({ method: "POST", body: body });
    },
    [currentQuestion]
  );

  const getToNextQuestion = useCallback(() => {
    setCurrentQuestion(nextQuestion);
    setNextQuestion(undefined);
  }, [nextQuestion, currentQuestion]);

  useEffect(() => {
    if (!response?.data) {
      return;
    }

    if ((response.data as QuizResponseComplete)?.quizCompleted) {
      setQuizCompleted(true);
      return;
    }

    const nextQuestionResponseData = response.data as QuizResponseNextQuestion;
    const intialQuestionRequest_WasMade = (
      response.httpInfo?.options?.body as QuizRequestBodyIntialQuestion
    )?.questionRequested;
    if (intialQuestionRequest_WasMade) {
      setCurrentQuestion(nextQuestionResponseData);
      setPreserveChildren(true);
      return;
    }
    setNextQuestion(nextQuestionResponseData);
  }, [response]);

  return (
    <div className="view quiz-view">
      <ErrorBoundary error={error} onRetry={retry} loading={loading} preserveChildren={preserveChildren}>
        <div className="view-content">
          {!quizCompleted && currentQuestion && (
            <BlockQuizQuestion
              key={currentQuestion.questionId}
              currentQuestion={currentQuestion}
              correctOptionId={nextQuestion?.previouslyQuestion_CorrectOptionId}
              onChoose={onChoose}
              onNext={getToNextQuestion}
            />
          )}
          {quizCompleted && <BlockQuizCompleted />}
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default BlockQuiz;

//TODO: restrict page if introduction not finished
//TODO: start a session in the backend
//TODO: stop watch for fairly long time
//TODO: lower or increase score for a word when answered
//TODO: add inc/dec factor settings, stop-watch settings
//TODO: complete a block -> emit event completion only if it was alreay completed! -> unblock other blocks -> unlock epiloque (if all blocks finished)
//      if already completed only change the scores, if it gets through without mistake pass don't repeat questions, otherwise do it untill all are score 100
//
//TODO: make question wrongly answer more frequent than the others -> need to do a call to server to calculate that

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
