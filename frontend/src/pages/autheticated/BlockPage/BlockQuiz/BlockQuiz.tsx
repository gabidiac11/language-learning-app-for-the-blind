import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useFetchData, {
  UseFetchDataOptions,
} from "../../../../api/useFetchData";
import {
  UseFetchDataOptionsQuizRequest,
  QuizResponse,
  QuizOption,
  QuizRequestBody,
} from "../../../../context/contextTypes/quizTypes";
import ErrorBoundary from "../../../page-components/ErrorBoundary/ErrorBoundary";
import BlockQuizQuestion from "./BlockQuizQuestion";
import "./BlockQuiz.scss";

const BlockQuiz = () => {
  const navigate = useNavigate();
  const { id: blockProgressId, lang } = useParams<{ id: string, lang: string; }>();
  const [fetchOptions, setFetchOptions] = useState<{
    url: string;
    options?: UseFetchDataOptionsQuizRequest | UseFetchDataOptions;
  }>({
    url: `blocks/${blockProgressId}/quiz/request-question`,
    options: {
      method: "POST",
    },
  });
  
  const {
    dataWithHttpResponse: response,
    loading,
    error,
    retry,
  } = useFetchData<QuizResponse>(
    fetchOptions.url,
    lang,
    fetchOptions.options
  );
  const [currentQuestion, setCurrentQuestion] = useState<QuizResponse>();
  const [nextQuestion, setNextQuestion] = useState<QuizResponse>();
  const [quizCompleted, setQuizCompleted] = useState<boolean>();
  const [preserveChildren, setPreserveChildren] = useState<boolean>();

  const onChoose = useCallback(
    (option: QuizOption) => {
      // TODO: play audio for this
      if (!currentQuestion) {
        throw new Error(
          "Contact admin: this should not happen - current question is null."
        );
      }

      // new request is triggered by changing these fetch options
      const body: QuizRequestBody = {
        optionId: option.id,
        questionId: currentQuestion.questionId,
      };
      setFetchOptions({
        url: `blocks/${blockProgressId}/quiz/answer-question`,
        options: { method: "POST", body: body },
      });
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

    const quizResponse = response.data as QuizResponse;
    if (quizResponse?.quizCompleted) {
      setQuizCompleted(true);
      // TODO: make sure to play audio on the completion page when is started
      navigate(
        `/blocks/${quizResponse.lang}/${blockProgressId}/quiz/${quizResponse.quizId}/completed`
      );
      return;
    }

    const initialQuestionRequestMade =
      response.httpInfo?.url?.indexOf("/request-question") > -1;
    if (initialQuestionRequestMade) {
      // TODO: make sure to play audio here
      setCurrentQuestion(quizResponse);
      setPreserveChildren(true);
      return;
    }
    setNextQuestion(quizResponse);
  }, [response]);

  return (
    <div className="view quiz-view" aria-label="wrapper for quiz page">
      <ErrorBoundary
        error={error}
        onRetry={retry}
        loading={loading || !!quizCompleted}
        preserveChildren={preserveChildren}
      >
        <div className="view-content" aria-label="inner wrapper for quiz page">
          {currentQuestion && (
            <BlockQuizQuestion
              key={currentQuestion.questionId}
              currentQuestion={currentQuestion}
              correctOptionId={nextQuestion?.previouslyQuestion_CorrectOptionId}
              onChoose={onChoose}
              onNext={getToNextQuestion}
            />
          )}
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default BlockQuiz;
