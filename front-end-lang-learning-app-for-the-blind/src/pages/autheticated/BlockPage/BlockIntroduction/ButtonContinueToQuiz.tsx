import { Link } from "react-router-dom";

const ButtonContinueToQuiz = (props: { blockProgressId: number }) => {
  return (
    <div style={{margin: "20px 0"}}>
      <Link to={`/blocks/${props.blockProgressId}/quiz`}>Continue to quiz</Link>
    </div>
  );
};

export default ButtonContinueToQuiz;
