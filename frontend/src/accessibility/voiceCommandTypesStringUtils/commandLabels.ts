import { AudioUserCommandType } from "../../context/contextTypes/voiceCommand.types";

export const commandLabels: {
  [key in AudioUserCommandType]: string;
} = {
  [AudioUserCommandType.AccessQuiz]: "Access quiz",
  [AudioUserCommandType.DescribePage]: "Describe page",
  [AudioUserCommandType.ReadLanguages]: "Read languages",
  [AudioUserCommandType.AcessLanguage]: "Access language",
  [AudioUserCommandType.Logout]: "Logout",
  [AudioUserCommandType.NavigateBack]: "Navigate back",
  [AudioUserCommandType.NavigateToBlock]: "Navigate to block",
  [AudioUserCommandType.RespondQuiz]: "Respond to quiz",
  [AudioUserCommandType.GoToNextWord]: "Listen next word from sumamry",
  [AudioUserCommandType.ReadAchievements]: "Listen quiz achievements",
  [AudioUserCommandType.Login]: "Login",
  [AudioUserCommandType.AcessLessonStory]: "Access lesson story",
  [AudioUserCommandType.ReadWhatBlocks]: "Describe what blocks are on the page",
  [AudioUserCommandType.ReadLessonStories]:
    "Read languages",
  [AudioUserCommandType.AccessWordsSummary]:
    "Access building block words summary",
  [AudioUserCommandType.ReadThecurrentWord]: "Read the current word summary",
  [AudioUserCommandType.EpilogueReadShortStory]:
    "Read the epilogue short story",
  [AudioUserCommandType.CommandUnidentified]: "Voice command not indentified.",
};
