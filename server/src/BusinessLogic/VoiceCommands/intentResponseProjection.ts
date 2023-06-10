import { log } from "../../logger";
import {
  AudioUserCommand,
  AudioUserCommandType,
  commandUnidentifiedValue,
} from "../../Models/voiceCommand.types";

export type IntentQueryResultProjection = {
  parameters?: {
    fields?: {
      [name: string]: {
        stringValue?: string | null;
        numberValue?: number | null;
      } | null;
    };
  };
  intent?: {
    displayName?: string;
  };
};

export function getMatchedCommand(
  queryResult?: IntentQueryResultProjection
): AudioUserCommand {
  const intentDisplayName = queryResult?.intent?.displayName;
  if (!intentDisplayName) {
    return commandUnidentifiedValue;
  }

  const commandType = Object.values(AudioUserCommandType).find(
    (i) => i === intentDisplayName
  );
  if (!commandType) {
    log(
      `An non undefined intent display name was found, but not matched: ${intentDisplayName}`
    );
    return commandUnidentifiedValue;
  }

  const fields = queryResult.parameters?.fields ?? {};
  const getFieldValue = (name: string = "any") =>
    fields[name]?.stringValue ?? "";
  const getNumberValue = (name: string = "number") => fields[name]?.numberValue;

  switch (commandType) {
    case AudioUserCommandType.AcessLanguage:
      return {
        commandType,
        language: getFieldValue("language"),
      };
    case AudioUserCommandType.NavigateToBlock:
      return {
        commandType,
        buildingBlockOrEpilogueName: getFieldValue(),
      };
    case AudioUserCommandType.RespondQuiz:
      return {
        commandType,
        answerOptionName: getFieldValue(),
        answerOptionNumber: getNumberValue(),
      };
    case AudioUserCommandType.AcessLessonStory:
      return { commandType, storyName: getFieldValue() };
    default:
      return {
        commandType,
      };
  }
}
