import { CardHeader, CardMedia } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { EpilogueProgress } from "../../../context";
import CardBlock from "../../page-components/CardBlock/CardBlock";
import { ItemProgressSummary } from "../../page-components/ItemProgressSummary";
import "./StoryPage.scss";

const EpilogueBlockItem = (props: {
  epilogueProgress: EpilogueProgress;
  storyImgUrl: string;
  storyImgAlt: string;
}) => {
  const { epilogueProgress } = props;
  const navigate = useNavigate();
  const disabled = !epilogueProgress.timeUnlocked;

  const navigateToStory = useCallback(() => {
    if (disabled) {
      //TODO: add audio saying it's diabled because it's locked
      return;
    }
    navigate(`/epilogues/${epilogueProgress.lang}/${epilogueProgress.id}`);
  }, [epilogueProgress, disabled]);

  const cardAriaLabel = disabled
    ? `Epilogue ${props.epilogueProgress.epilogue.name}. Note that this can't be started because not all building blocks are completed`
    : `Epilogue ${props.epilogueProgress.epilogue.name}: to go to this lesson block press enter.`;

  return (
    <CardBlock
      ariaLabel={cardAriaLabel}
      disabled={disabled}
      onClick={navigateToStory}
    >
      <CardHeader
        tabIndex={0}
        ariaLabel={`Epilgoue title: ${epilogueProgress.epilogue.name}`}
        title={epilogueProgress.epilogue.name}
        subheader={
          <ItemProgressSummary
            name="Epilogue"
            isDependentOnNames={["all building blocks"]}
            item={epilogueProgress}
          />
        }
      />
      <CardMedia
        tabIndex={0}
        component="img"
        width="100%"
        image={props.storyImgUrl}
        alt={props.storyImgAlt}
      />
    </CardBlock>
  );
};

export default EpilogueBlockItem;
