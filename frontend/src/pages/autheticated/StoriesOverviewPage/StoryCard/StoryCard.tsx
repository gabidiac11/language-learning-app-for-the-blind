import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { UserStory } from "../../../../context";
import { ItemProgressSummary } from "../../../page-components/ItemProgressSummary";
import { useNavigate } from "react-router";
import { useCallback } from "react";
import CardBlock from "../../../page-components/CardBlock/CardBlock";
import "./StoryCard.scss";
import { useFeedbackAudioQueue } from "../../../../context/hooks/useFeedbackAudiQueue";

export const StoryCard = (props: { userStory: UserStory }) => {
  const navigate = useNavigate();
  const { userStory } = props;
  const disabled = !userStory.timeUnlocked;

  const { enqueueCantOpenALockedItemMessage } = useFeedbackAudioQueue();

  const navigateToStory = useCallback(() => {
    if (disabled) {
      enqueueCantOpenALockedItemMessage();
      return;
    }
    navigate(`/stories/${userStory.lang}/${userStory.id}`);
  }, [userStory, disabled]);

  const cardAriaLabel = disabled
    ? `Story ${
        props.userStory.name
      }. Note that this can't be started because dependent stories ${
        props.userStory.isDependentOnNames?.join(",") ?? "some required stories"
      } are not completed`
    : `Story ${props.userStory.name}: to continue or start this lesson module press enter.`;

  return (
    <CardBlock
      ariaLabel={cardAriaLabel}
      disabled={disabled}
      onClick={navigateToStory}
    >
      <CardHeader
        aria-label={cardAriaLabel}
        title={props.userStory.name}
        subheader={
          <ItemProgressSummary
            name="Lesson story"
            isDependentOnNames={props.userStory.isDependentOnNames}
            item={props.userStory}
          />
        }
      />
      <div className="card-image-container">
        <CardMedia
          tabIndex={0}
          component="img"
          width="100%"
          height="100%"
          image={props.userStory.imageUrl}
          alt={`image: ${props.userStory.imageAlt}`}
        />
      </div>
      <CardContent>
        <Typography tabIndex={0} variant="body2" color="text.secondary">
          {`${userStory.numOfBlocksCompleted} completed out of ${userStory.numOfTotalBlocks} building blocks.`}
          {` Epilogue ${
            userStory.epilogueProgress.timeUnlocked ? "unlocked" : "locked"
          }`}
        </Typography>
      </CardContent>
    </CardBlock>
  );
};
