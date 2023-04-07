import { useAppStateContext } from "../../../context/hooks/useAppStateContext";
import { DashboardStoryItem } from "./DashboardStoryItem/DashboardStoryItem";
import "./Dashboard.scss";

export const DashboardPage = () => {
  const { userStories } = useAppStateContext();

  return (
    <div className="dashboard-page-wrapper">
      {userStories.map((userStory) => (
        <DashboardStoryItem userStory={userStory} />
      ))}
    </div>
  );
};
