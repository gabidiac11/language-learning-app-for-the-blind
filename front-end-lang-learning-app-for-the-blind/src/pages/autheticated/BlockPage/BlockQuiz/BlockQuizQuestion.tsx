import { Button } from "@mui/material";
import { useCallback } from "react";
import {
  QuizOption,
  QuizResponseNextQuestion,
} from "../../../../context/contextTypes/quizTypes";
import AppTimerDisplay from "../../../page-components/AppTimerDisplay";

const BlockQuizQuestion = (props: {
  currentQuestion: QuizResponseNextQuestion;
  correctOptionId?: number;
  onNext: () => void;
  onChoose: (option: QuizOption) => void;
}) => {
  const getCorrectOptionTxt = useCallback(() => {
    const correctOption = props.currentQuestion.options.find(
      (i) => i.id === props.correctOptionId
    );
    if (correctOption) {
      return correctOption.text;
    }
    return "error";
  }, [props.correctOptionId, props.currentQuestion]);

  return (
    <>
      <h3>{props.currentQuestion.questionText}</h3>
      {props.currentQuestion.options.map((option) => (
        <div key={option.id}>
          {/* TODO: see how you wrap the text */}
          <Button
            variant="contained"
            style={{ minWidth: "70vw", margin: "10px 0", textAlign: "left" }}
            onClick={() => props.onChoose(option)}
          >
            <span>{option.text}</span>
          </Button>
        </div>
      ))}
      {props.correctOptionId && (
        <div>
          Correct answer is '{getCorrectOptionTxt()}'. Loading next question in{" "}
          <AppTimerDisplay limit={5} onTimeOut={props.onNext} />
        </div>
      )}
    </>
  );
};

export default BlockQuizQuestion;
