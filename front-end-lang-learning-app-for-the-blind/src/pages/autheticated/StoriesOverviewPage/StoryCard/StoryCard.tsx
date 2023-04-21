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

export const StoryCard = (props: { userStory: UserStory }) => {
  const navigate = useNavigate();
  const { userStory } = props;
  const disabled = !userStory.timeUnlocked;
  
  const navigateToStory = useCallback(() => {
    if (disabled) {
      //TODO: add audio saying it's diabled because it's locked
      return;
    }
    navigate(`/stories/${userStory.id}`);
  }, [userStory, disabled]);

  return (
    <CardBlock disabled={disabled} onClick={navigateToStory}>
      <CardHeader
        title={props.userStory.name}
        subheader={<ItemProgressSummary {...props.userStory} />}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.userStory.imageUrl}
        // TODO: what alt to use here -> should devine some property for this one
        alt="Russian family"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`${userStory.numOfBlocksCompleted} completed out of ${userStory.numOfTotalBlocks} building blocks.`}
          <br></br>
          {`${userStory.numOfStoryQuestionsCompleted} completed out of ${userStory.numOfTotalStoryQuestions} story questions.`}
        </Typography>
      </CardContent>
    </CardBlock>
  );
};
