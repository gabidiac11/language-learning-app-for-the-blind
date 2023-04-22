import { Link } from "react-router-dom";

const ButtonContinueToQuiz = (props: { blockProgressId: number }) => {
  return (
    <div>
      <Link to={`/blocks/${props.blockProgressId}/quiz`}>Continue to quiz</Link>
    </div>
  );
};

export default ButtonContinueToQuiz;
