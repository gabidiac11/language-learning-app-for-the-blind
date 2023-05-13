import { CardHeader, CardMedia } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { BuildingBlockProgress } from "../../../context";
import CardBlock from "../../page-components/CardBlock/CardBlock";
import { ItemProgressSummary } from "../../page-components/ItemProgressSummary";
import "./StoryPage.scss";

const BuildingBlockItem = (props: {
  blockProgress: BuildingBlockProgress;
}) => {
  const { blockProgress } = props;
  const navigate = useNavigate();
  const disabled = !blockProgress.timeUnlocked;

  const navigateToStory = useCallback(() => {
    if (disabled) {
      //TODO: add audio saying it's diabled because it's locked
      return;
    }
    navigate(`/blocks/${blockProgress.id}`);
  }, [blockProgress, disabled]);

  return (
    <CardBlock disabled={disabled} onClick={navigateToStory}>
      <CardHeader
        title={blockProgress.block.name}
        subheader={
          <ItemProgressSummary
            isDependentOnNames={props.blockProgress.isDependentOnNames}
            item={blockProgress}
          />
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={blockProgress.block.imageUrl}
        // TODO: add alt to this card
        alt="Russian family"
      />
    </CardBlock>
  );
};

export default BuildingBlockItem;
