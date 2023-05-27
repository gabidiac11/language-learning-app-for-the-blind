import { Button, Typography } from "@mui/material";
import { useCallback, useState } from "react";
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

  return (
    <>
      <Typography variant="h5" mb={5} align="center">
        {props.currentQuestion.questionText}
      </Typography>
      {props.currentQuestion.options.map((option) => (
        <div key={option.id}>
          {/* TODO: see how you wrap the text */}
          <Button
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
            <Typography variant="body1">
              {option.text}
            </Typography>
          </Button>
        </div>
      ))}
      {props.correctOptionId && (
        <div>
          <Typography fontSize={16} mt={2} variant="caption" paragraph={true}>
            Loading next question in{" "}
            <AppTimerDisplay limit={1} onTimeOut={props.onNext} />
          </Typography>
        </div>
      )}
    </>
  );
};

export default EpilogueQuizQuestion;
