import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import "./StoryCard.scss";

import { UserStory } from "../../../../context";
import { useLayoutEffect, useState } from "react";
import { getFormattedTimestamp } from "../../../../utils";

const computeSubheader = (userStory: UserStory): string => {
  if (userStory.timeCompleted) {
    return `🏆 Completed on ${getFormattedTimestamp(userStory.timeCompleted)}`;
  }
  if (userStory.timeStarted) {
    return `✨ Started on ${getFormattedTimestamp(userStory.timeStarted)}`;
  }
  if (userStory.timeUnlocked) {
    return `🚩 Unlocked on ${getFormattedTimestamp(userStory.timeUnlocked)}`;
  }
  return `🔒 Locked`;
};

export const StoryCard = (props: { userStory: UserStory }) => {
  const [subheader, setSubheader] = useState(computeSubheader(props.userStory));

  const { userStory } = props;

  useLayoutEffect(() => {
    setSubheader(computeSubheader(props.userStory));
  }, [props.userStory]);

  return (
    // TODO: see what to do with this width: response stuff here?
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={props.userStory.name} subheader={subheader} />
      {/* TODO: see what to do with the card */}
      <CardMedia
        component="img"
        height="194"
        image="https://mui.com/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`${userStory.numOfBlocksCompleted} completed out of ${userStory.numOfTotalBlocks} building blocks.`}
          <br></br>
          {`${userStory.numOfStoryQuestionsCompleted} completed out of ${userStory.numOfTotalStoryQuestions} story questions.`}
        </Typography>
      </CardContent>

      {/* TODO: might delete this but looks interesting for now, although doesn't do nothing */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
