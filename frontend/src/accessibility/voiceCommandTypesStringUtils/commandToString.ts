import { AudioUserCommand, AudioUserCommandType } from "../../context/contextTypes/voiceCommand.types";
import { commandLabels } from "./commandLabels";

export function commandToString(command: AudioUserCommand) {
  switch (command.commandType) {
    case AudioUserCommandType.AcessLanguage:
      return `Access language: ${command.language}`;

    case AudioUserCommandType.NavigateToBlock:
      return `Go to block: ${command.buildingBlockOrEpilogueName}`;
    case AudioUserCommandType.RespondQuiz:
      return `Respond to quiz with: ${command.answerOptionName ?? ""} ${command.answerOptionNumber ? `option number #${command.answerOptionNumber}` : ""}`;
    case AudioUserCommandType.AcessLessonStory:
      return `Access lesson story: ${command.storyName}`;
    default:
      return commandLabels[command.commandType];
  }
}
