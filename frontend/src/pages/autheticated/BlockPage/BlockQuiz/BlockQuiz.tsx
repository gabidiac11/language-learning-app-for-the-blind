import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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
import BlockQuizQuestion from "./BlockQuizQuestion";
import "./BlockQuiz.scss";

const requestIntialQuestionFetchOption: UseFetchDataOptionsQuizRequest = {
  method: "POST",
  body: {
    questionRequested: true,
  },
};

const BlockQuiz = () => {
  const navigate = useNavigate();
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

    const dataAsQuizComplete = response.data as QuizResponseComplete;
    if (dataAsQuizComplete?.quizCompleted) {
      setQuizCompleted(true);
      navigate(
        `/blocks/${blockProgressId}/quiz/${dataAsQuizComplete.quizId}/completed`
      );
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
      <ErrorBoundary
        error={error}
        onRetry={retry}
        loading={loading || !!quizCompleted}
        preserveChildren={preserveChildren}
      >
        <div className="view-content">
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