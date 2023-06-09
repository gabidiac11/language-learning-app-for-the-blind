import { Button, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { WithFocusControls } from "../../../page-components/accessibility/WithFocusControls";
import {
  QuizOption,
  QuizResponse,
} from "../../../../context/contextTypes/quizTypes";
import AppTimerDisplay from "../../../page-components/AppTimerDisplay";
import "./EpilogueQuiz.scss";

const EpilogueQuizQuestion = (props: {
  currentQuestion: QuizResponse;
  correctOptionId?: string;
  onNext: () => void;
  onChoose: (option: QuizOption) => void;
}) => {
  const [selected, setSelected] = useState<QuizOption>();

  const onChoose = useCallback(
    (option: QuizOption) => {
      setSelected(option);
      props.onChoose(option);
    },
    [props.onChoose]
  );

  const pauseLoadingNextQuestionTimeSeconds = 3;

  return (
    <WithFocusControls direction="vertical">
      <Typography
        tabIndex={0}
        aria-label={`question: ${props.currentQuestion.questionText}`}
        variant="h5"
        mb={5}
        align="center"
      >
        {props.currentQuestion.questionText}
      </Typography>
      {props.currentQuestion.options.map((option, index) => (
        <div key={option.id} aria-label="question's options wrapper">
          {/* TODO: see how you wrap the text */}
          <Button
            tabIndex={0}
            aria-label={`option ${index + 1}: ${option.text.replace("->", "")}`}

            variant="contained"
            className="quiz-question-option"
            disabled={!!selected}
            onClick={() => onChoose(option)}
          >
            {(() => {
              if (!selected || !props.correctOptionId) {
                return "";
              }
              if (option.id === props.correctOptionId) {
                return <Typography className="mark">✔️</Typography>;
              }
              if (option.id === selected.id) {
                return <Typography className="mark">❌</Typography>;
              }
            })()}
            <Typography variant="body1">{option.text}</Typography>
          </Button>
        </div>
      ))}
      {props.correctOptionId && (
        <div  aria-label={`Indication: Loading next question in ${pauseLoadingNextQuestionTimeSeconds} seconds.`}>
          <Typography fontSize={16} mt={2} variant="caption" paragraph={true}>
            Loading next question in{" "}
            <AppTimerDisplay limit={pauseLoadingNextQuestionTimeSeconds} onTimeOut={props.onNext} />
          </Typography>
        </div>
      )}
    </WithFocusControls>
  );
};

export default EpilogueQuizQuestion;
