import { useAppStateContext } from "../../../context/hooks/useAppStateContext";
import { StoryCard } from "./StoryCard/StoryCard";
import "./StoriesOverviewPage.scss";

export const StoriesOverviewPage = () => {
  const { userStories } = useAppStateContext();

  return (
    <div className="dashboard-page-wrapper">
      {userStories.map((userStory) => (
        <StoryCard userStory={userStory} />
      ))}
    </div>
  );
};
