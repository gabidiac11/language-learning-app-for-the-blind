import { useCallback, useLayoutEffect, useState } from "react";
import { BuildingBlockProgress, UserStory } from "../../context";
import { getFormattedTimestamp } from "../../utils";

export const ItemProgressSummary = (
  item: UserStory | BuildingBlockProgress
) => {
  const [text, setText] = useState("");

  const computeText = useCallback(
    (userStory: UserStory | BuildingBlockProgress): string => {
      if (userStory.timeCompleted) {
        return `🏆 Completed on ${getFormattedTimestamp(
          userStory.timeCompleted
        )}`;
      }
      if (userStory.timeStarted) {
        return `✨ Started on ${getFormattedTimestamp(userStory.timeStarted)}`;
      }
      if (userStory.timeUnlocked) {
        return `👉 Unlocked on ${getFormattedTimestamp(
          userStory.timeUnlocked
        )}`;
      }
      return `🔒 Locked`;
    },
    [item.timeCompleted, item.timeStarted, item.timeUnlocked]
  );

  useLayoutEffect(() => {
    setText(computeText(item));
  }, [computeText]);

  return <>{text}</>;
};
