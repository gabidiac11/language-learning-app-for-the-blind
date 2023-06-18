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
import EpilogueQuizQuestion from "./EpilogueQuizQuestion";
import "./EpilogueQuiz.scss";
import { AppMessage } from "../../../../accessibility/types/appMessage.type";
import { usePageAudioFeedback } from "../../../../accessibility/audioSpeaker/hooks/usePageAudioFeedback";
import { epilogueQuizPageMessages } from "./appMessages";
import { useHandleVoicePageQuiz } from "../../../../accessibility/voiceHandlers/quizPageHandlers/useHandleVoicePageQuiz";
import { useFeedbackAudioQueue } from "../../../../context/hooks/useFeedbackAudiQueue";

const EpilogueQuiz = () => {
  const navigate = useNavigate();
  const { id: epilogueProgressId, lang } = useParams<{
    id: string;
    lang: string;
  }>();
  const [fetchOptions, setFetchOptions] = useState<{
    url: string;
    options?: UseFetchDataOptionsQuizRequest | UseFetchDataOptions;
  }>({
    url: `epilogues/${epilogueProgressId}/quiz/request-question`,
    options: {
      method: "POST",
    },
  });
  const {
    dataWithHttpResponse: response,
    loading,
    error,
    retry,
  } = useFetchData<QuizResponse>(fetchOptions.url, lang, fetchOptions.options);
  const [currentQuestion, setCurrentQuestion] = useState<QuizResponse>();
  const [nextQuestion, setNextQuestion] = useState<QuizResponse>();
  const [quizCompleted, setQuizCompleted] = useState<boolean>();
  const [preserveChildren, setPreserveChildren] = useState<boolean>();

  const [pageDataLoadedMessage, setPageDataLoadedMessage] = useState<
    AppMessage[]
  >([]);

  const { emptyQueue } = useFeedbackAudioQueue();

  const [selected, setSelected] = useState<QuizOption>();

  usePageAudioFeedback({
    error,
    loading: !pageDataLoadedMessage.length,
    pageGreeting: epilogueQuizPageMessages.loadedRequestQuestionEpiloue,
    pageDataLoadedMessage,
  });

  const onChoose = useCallback(
    (option: QuizOption) => {
      if (!currentQuestion) {
        throw new Error(
          "Contact admin: this should not happen - current question is null."
        );
      }

      setSelected(option);

      // new request is triggered by changing these fetch options
      const body: QuizRequestBody = {
        optionId: option.id,
        questionId: currentQuestion.questionId,
      };

      setPageDataLoadedMessage([]);
      setFetchOptions({
        url: `epilogues/${epilogueProgressId}/quiz/answer-question`,
        options: { method: "POST", body: body },
      });
    },
    [currentQuestion]
  );

  useHandleVoicePageQuiz(
    pageDataLoadedMessage.length === 0
      ? epilogueQuizPageMessages.loadedRequestQuestionEpiloue
      : pageDataLoadedMessage,
    epilogueQuizPageMessages.instructionsQuizepilogueQuestion,
    currentQuestion,
    onChoose
  );

  const getToNextQuestion = useCallback(() => {
    setCurrentQuestion(nextQuestion);
    setNextQuestion(undefined);
    setSelected(undefined);
  }, [nextQuestion, currentQuestion]);

  useEffect(() => {
    if (!response?.data) {
      return;
    }

    const quizResponse = response.data as QuizResponse;
    if (quizResponse?.quizCompleted) {
      setQuizCompleted(true);
      navigate(
        `/epilogues/${quizResponse.lang}/${epilogueProgressId}/quiz/${quizResponse.quizId}/completed`
      );
      return;
    }

    const initialQuestionRequestMade =
      response.httpInfo?.url?.indexOf("/request-question") > -1;

    emptyQueue();
    const audioMessage = computeAudioMessageFromResponse(
      quizResponse,
      initialQuestionRequestMade
    );
    setPageDataLoadedMessage(audioMessage);

    if (initialQuestionRequestMade) {
      setCurrentQuestion(quizResponse);
      setPreserveChildren(true);
      return;
    }
    setNextQuestion(quizResponse);
  }, [response]);

  return (
    <div className="view epilgue-quiz-view" aria-label="wrapper for quiz page">
      <ErrorBoundary
        error={error}
        onRetry={retry}
        loading={loading || !!quizCompleted}
        preserveChildren={preserveChildren}
      >
        <div className="view-content" aria-label="inner wrapper for quiz page">
          {currentQuestion && (
            <EpilogueQuizQuestion
              key={currentQuestion.questionId}
              currentQuestion={currentQuestion}
              correctOptionId={nextQuestion?.previouslyQuestion_CorrectOptionId}
              onChoose={onChoose}
              onNext={getToNextQuestion}
              selected={selected}
            />
          )}
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default EpilogueQuiz;

function computeAudioMessageFromResponse(
  quizResponse: QuizResponse,
  isInitial: boolean
) {
  const responsePlayables = quizResponse.playableApiMessages ?? [];
  const rightOrWrongMessages =
    quizResponse.previousQuestionOutcomePlaybaleMessages ?? [];
  const messages = [...rightOrWrongMessages, ...responsePlayables];

  messages.forEach((message) => {
    // message.preventForcedStopOnCurrentPage = true;
  });

  isInitial &&
    messages.push(epilogueQuizPageMessages.instructionsQuizepilogueQuestion);

  console.log({ messages });
  return messages;
}
