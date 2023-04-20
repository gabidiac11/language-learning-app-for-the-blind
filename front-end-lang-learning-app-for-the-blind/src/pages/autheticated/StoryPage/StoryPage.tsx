import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import useFetchData from "../../../app-hooks/useFetchData";
import { useAppUser } from "../../../auth/authHooks";
import { BuildingBlockProgress, UserStory } from "../../../context";
import ErrorBoundary from "../../page-components/ErrorBoundary/ErrorBoundary";
import { ItemProgressSummary } from "../../page-components/ItemProgressSummary";
import { Loader } from "../../page-components/Loader";
import "./StoryPage.scss";

const BuildingBlockItem = (blockProgress: BuildingBlockProgress) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={blockProgress.block.name}
        subheader={<ItemProgressSummary {...blockProgress} />}
      />
      c
      <CardMedia
        component="img"
        height="194"
        image="https://images.pexels.com/photos/3807395/pexels-photo-3807395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Russian family"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          DUMMY TEXT
        </Typography>
      </CardContent>
    </Card>
  );
};

export const StoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error, retry } = useFetchData<UserStory>(
    `userStories/${id}`
  );

  return (
    <div className="view story-page-wrapper">
      <ErrorBoundary error={error} onRetry={retry}>
        {loading && <Loader />}
        {!error && data && (
          <div className="view-content">
            {data.buildingBlocksProgressItems.map(
              (blockProgress: BuildingBlockProgress) => (
                <BuildingBlockItem key={blockProgress.id} {...blockProgress} />
              )
            )}
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};
