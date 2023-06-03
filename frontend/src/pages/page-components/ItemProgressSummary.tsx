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
): [string, string] => {
  if (targetItem.timeCompleted) {
    return [`🏆 `, `Completed on ${getFormattedTimestamp(targetItem.timeCompleted)}`];
  }
  if (targetItem.timeStarted) {
    return [`✨ `, `Started on ${getFormattedTimestamp(targetItem.timeStarted)}`];
  }
  if (targetItem.timeUnlocked) {
    return [`👉 `, `Unlocked on ${getFormattedTimestamp(targetItem.timeUnlocked)}`];
  }
  const names = dependentNames?.map((n) => `'${n}'`).join(",") ?? "";
  return [`🔒 `, `Locked.` + (names ? ` Please complete ${names}` : "")];
};

export const ItemProgressSummary = (props: {
  item: SummaryTargetItem;
  isDependentOnNames?: string[];
  name: string;
}) => {
  const [text, setText] = useState(["", ""]);

  useLayoutEffect(() => {
    setText(computeText(props.item, props.isDependentOnNames));
  }, [props.item, props.isDependentOnNames]);

  const description = (props.item as { description?: string }).description;
  const [emoji, messageText] = text;
  return (
    <>
      <p
        tabIndex={0}
        aria-label={`${props.name} state: ${messageText}`}
      >
        {emoji}{messageText}
      </p>
      {description && (
        <p
          tabIndex={0}
          aria-label={`${props.name} description: ${description}`}
          style={{ fontSize: "11px", margin: "0", padding: "5px 0 0 0px" }}
        >
          {description}
        </p>
      )}
    </>
  );
};
