import { Link } from "react-router-dom";

const ButtonContinueToBlockQuiz = (props: { blockProgressId: string, lang: string }) => {
  return (
    <div style={{ margin: "20px 0" }}>
      <Link to={`/blocks/${props.lang}/${props.blockProgressId}/quiz`}>Continue to quiz</Link>
    </div>
  );
};

export default ButtonContinueToBlockQuiz;
