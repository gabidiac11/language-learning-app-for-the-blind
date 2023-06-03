import { Link } from "react-router-dom";

const ButtonContinueToBlockQuiz = (props: {
  blockProgressId: string;
  lang: string;
}) => {
  return (
    <div style={{ margin: "20px 0" }}>
      <Link
        aria-label="Continue to quiz and exit summary"
        tabIndex={0}
        to={`/blocks/${props.lang}/${props.blockProgressId}/quiz`}
      >
        Go to quiz
      </Link>
    </div>
  );
};

export default ButtonContinueToBlockQuiz;
