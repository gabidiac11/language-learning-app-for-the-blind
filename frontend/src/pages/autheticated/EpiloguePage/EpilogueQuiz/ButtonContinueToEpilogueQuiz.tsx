import { Link } from "react-router-dom";

const ButtonContinueToEpilogueQuiz = (props: {
  epilogueProgressId: string;
  lang: string;
}) => {
  return (
    <div style={{ margin: "20px 0" }} aria-label="wrapper to link to quiz">
      <Link
        tabIndex={0}
        to={`/epilogues/${props.lang}/${props.epilogueProgressId}/quiz`}
      >
        Go to quiz
      </Link>
    </div>
  );
};

export default ButtonContinueToEpilogueQuiz;
