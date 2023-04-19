import { useAppStateContext } from "../../../context/hooks/useAppStateContext";
import { StoryCard } from "./StoryCard/StoryCard";
import "./StoriesOverviewPage.scss";
import {
  Box,
  LinearProgress,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import useFetchData from "../../../app-hooks/useFetchData";
import { UserStory, BuildingBlockProgress } from "../../../context";
import ErrorBoundary from "../../page-components/ErrorBoundary/ErrorBoundary";
import { ItemProgressSummary } from "../../page-components/ItemProgressSummary";
import { Loader } from "../../page-components/Loader";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppUser } from "../../../auth/authHooks";

export const StoriesOverviewPage = () => {
  const { user } = useAppUser();
  // const { userStories } = useAppStateContext();
  const { data, loading, error, retry } =
    useFetchData<UserStory[]>(`userStories/${user?.uid}`);

  return (
    <div className="dashboard-page-wrapper">
      <ErrorBoundary error={error} onRetry={retry}>
        <div className="view-content">
          {loading && <Loader />}
          {!error &&
            data &&
            data.map((userStory) => <StoryCard userStory={userStory} />)}
        </div>
      </ErrorBoundary>
    </div>
  );
};
