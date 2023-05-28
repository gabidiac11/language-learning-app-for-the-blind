import { Link } from "react-router-dom";

const ButtonContinueToEpilogueQuiz = (props: { epilogueProgressId: string, lang: string }) => {
  return (
    <div style={{ margin: "20px 0" }}>
      <Link to={`/epilogues/${props.lang}/${props.epilogueProgressId}/quiz`}>Continue to quiz</Link>
    </div>
  );
};

export default ButtonContinueToEpilogueQuiz;
