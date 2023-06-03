import { CardHeader, CardMedia } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { BuildingBlockProgress } from "../../../context";
import CardBlock from "../../page-components/CardBlock/CardBlock";
import { ItemProgressSummary } from "../../page-components/ItemProgressSummary";
import "./StoryPage.scss";

const BuildingBlockItem = (props: { blockProgress: BuildingBlockProgress }) => {
  const { blockProgress } = props;
  const navigate = useNavigate();
  const disabled = !blockProgress.timeUnlocked;

  const navigateToStory = useCallback(() => {
    if (disabled) {
      //TODO: add audio saying it's diabled because it's locked
      return;
    }
    navigate(`/blocks/${blockProgress.lang}/${blockProgress.id}`);
  }, [blockProgress, disabled]);

  const cardAriaLabel = disabled
    ? `Building block ${
        props.blockProgress.block.name
      }. Note that this can't be started because blocks ${
        props.blockProgress.isDependentOnNames?.join() ?? "dependent blocks"
      } are not completed.`
    : `Building block ${props.blockProgress.block.name}: to go to this lesson block press enter.`;

  return (
    <CardBlock
      ariaLabel={cardAriaLabel}
      disabled={disabled}
      onClick={navigateToStory}
    >
      <CardHeader
        title={blockProgress.block.name}
        subheader={
          <ItemProgressSummary
            name="Building block"
            isDependentOnNames={props.blockProgress.isDependentOnNames}
            item={blockProgress}
          />
        }
      />
      <div className="card-image-container">
        <CardMedia
          component="img"
          width="100%"
          height="100%"
          image={blockProgress.block.imageUrl}
          alt={`image: ${blockProgress.block.imageAlt}`}
          tabIndex={0}
        />
      </div>
    </CardBlock>
  );
};

export default BuildingBlockItem;
