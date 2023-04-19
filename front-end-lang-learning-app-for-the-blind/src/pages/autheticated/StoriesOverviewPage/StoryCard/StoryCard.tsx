import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { UserStory } from "../../../../context";
import { ItemProgressSummary } from "../../../page-components/ItemProgressSummary";
import "./StoryCard.scss";

export const StoryCard = (props: { userStory: UserStory }) => {
  const { userStory } = props;

  return (
    // TODO: see what to do with this width: response stuff here?
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={props.userStory.name}
        subheader={<ItemProgressSummary {...props.userStory} />}
      />
      {/* TODO: see what to do with the card */}
      <CardMedia
        component="img"
        height="194"
        image={props.userStory.imageUrl}
        alt="Russian family"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`${userStory.numOfBlocksCompleted} completed out of ${userStory.numOfTotalBlocks} building blocks.`}
          <br></br>
          {`${userStory.numOfStoryQuestionsCompleted} completed out of ${userStory.numOfTotalStoryQuestions} story questions.`}
        </Typography>
      </CardContent>
    </Card>
  );
};
