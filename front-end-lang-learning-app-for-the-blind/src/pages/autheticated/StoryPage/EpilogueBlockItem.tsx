import { CardHeader, CardMedia } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { BuildingBlockProgress, EpilogueProgress } from "../../../context";
import CardBlock from "../../page-components/CardBlock/CardBlock";
import { ItemProgressSummary } from "../../page-components/ItemProgressSummary";
import "./StoryPage.scss";

const EpilogueBlockItem = (props: {
  epilogueProgress: EpilogueProgress;
  storyImgUrl: string;
}) => {
  const { epilogueProgress } = props;
  const navigate = useNavigate();
  const disabled = !epilogueProgress.timeUnlocked;

  const navigateToStory = useCallback(() => {
    if (disabled) {
      //TODO: add audio saying it's diabled because it's locked
      return;
    }
    navigate(`/epilogue/${epilogueProgress.id}`);
  }, [epilogueProgress, disabled]);

  return (
    <CardBlock disabled={disabled} onClick={navigateToStory}>
      <CardHeader
        title={epilogueProgress.epilogue.name}
        subheader={
          <ItemProgressSummary
            dependentNames={["all building blocks"]}
            item={epilogueProgress}
          />
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={props.storyImgUrl}
        // TODO: add alt to this card
        alt="Russian family"
      />
    </CardBlock>
  );
};

export default EpilogueBlockItem;
