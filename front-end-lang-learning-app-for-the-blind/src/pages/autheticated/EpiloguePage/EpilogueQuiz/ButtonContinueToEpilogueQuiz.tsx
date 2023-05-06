import { Link } from "react-router-dom";

const ButtonContinueToEpilogueQuiz = (props: { epilogueProgressId: number }) => {
  return (
    <div style={{ margin: "20px 0" }}>
      <Link to={`/epilogue/${props.epilogueProgressId}/quiz`}>Continue to quiz</Link>
    </div>
  );
};

export default ButtonContinueToEpilogueQuiz;
