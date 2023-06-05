import { useEffect } from "react";
import { screenReader } from "../accessibility/appReaders";

export const ActivateUserInteractionPage = () => {
  const message =
    "Please interact with the 'audio player' by focusing on the audio player and then press enter/click to activate user interactions.";

  useEffect(() => {
    // if the user has interacted with anything on the page -> we can read the page title to give a hint about activating the audio interaction
    const triggerPageTitleRead = () => {
      screenReader.playPageTitle();
      document.removeEventListener("click", triggerPageTitleRead);
    }
    document.addEventListener("click", triggerPageTitleRead);
    document.addEventListener("keyup", triggerPageTitleRead);
    return () => {
      document.removeEventListener("click", triggerPageTitleRead);
      document.removeEventListener("keyup", triggerPageTitleRead);
    }
  }, [])
  return (
    <div className="view dashboard-page-wrapper" aria-label={message}>
      <div className="view-content">{message}</div>
    </div>
  );
};
