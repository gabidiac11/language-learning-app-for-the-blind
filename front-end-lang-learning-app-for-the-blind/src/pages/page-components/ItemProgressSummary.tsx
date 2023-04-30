import { useLayoutEffect, useState } from "react";
import {
  BuildingBlockProgress,
  EpilogueProgress,
  UserStory,
} from "../../context";
import { getFormattedTimestamp } from "../../utils";

type SummaryTargetItem = UserStory | BuildingBlockProgress | EpilogueProgress;

const computeText = (
  targetItem: SummaryTargetItem,
  dependentNames?: string[]
): string => {
  if (targetItem.timeCompleted) {
    return `🏆 Completed on ${getFormattedTimestamp(targetItem.timeCompleted)}`;
  }
  if (targetItem.timeStarted) {
    return `✨ Started on ${getFormattedTimestamp(targetItem.timeStarted)}`;
  }
  if (targetItem.timeUnlocked) {
    return `👉 Unlocked on ${getFormattedTimestamp(targetItem.timeUnlocked)}`;
  }
  const names = dependentNames?.map((n) => `'${n}'`).join(",") ?? "";
  return `🔒 Locked` + (names ? `- complete ${names}` : "");
};

export const ItemProgressSummary = (props: {
  item: SummaryTargetItem;
  dependentNames?: string[];
}) => {
  const [text, setText] = useState("");

  useLayoutEffect(() => {
    setText(computeText(props.item, props.dependentNames));
  }, [props.item, props.dependentNames]);

  return <>{text}</>;
};
