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
  selected?: QuizOption
}) => {

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
          <Button
            tabIndex={0}
            aria-label={`option ${index + 1}: ${option.text.replace("->", "")}`}

            variant="contained"
            className="quiz-question-option"
            disabled={!!props.selected}
            onClick={() => props.onChoose(option)}
          >
            {(() => {
              if (!props.selected || !props.correctOptionId) {
                return "";
              }
              if (option.id === props.correctOptionId) {
                return <Typography className="mark">✔️</Typography>;
              }
              if (option.id === props.selected.id) {
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
