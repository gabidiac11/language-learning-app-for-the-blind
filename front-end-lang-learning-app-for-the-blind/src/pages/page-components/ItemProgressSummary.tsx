import { useCallback, useLayoutEffect, useState } from "react";
import { BuildingBlockProgress, UserStory } from "../../context";
import { getFormattedTimestamp } from "../../utils";

const computeText = (
  userStory: UserStory | BuildingBlockProgress,
  dependentNames?: string[]
): string => {
  if (userStory.timeCompleted) {
    return `🏆 Completed on ${getFormattedTimestamp(userStory.timeCompleted)}`;
  }
  if (userStory.timeStarted) {
    return `✨ Started on ${getFormattedTimestamp(userStory.timeStarted)}`;
  }
  if (userStory.timeUnlocked) {
    return `👉 Unlocked on ${getFormattedTimestamp(userStory.timeUnlocked)}`;
  }
  const names = dependentNames?.map(n => `'${n}'`).join(",") ?? "";
  return `🔒 Locked` + (names ? `- complete ${names}` : "");
};

export const ItemProgressSummary = (props: {
  item: UserStory | BuildingBlockProgress;
  dependentNames?: string[];
}) => {
  const [text, setText] = useState("");

  useLayoutEffect(() => {
    setText(computeText(props.item, props.dependentNames));
  }, [props.item, props.dependentNames]);

  return <>{text}</>;
};
