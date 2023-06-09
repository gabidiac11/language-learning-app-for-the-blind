export enum AudioUserCommandType {
  AccessQuiz = "AccessQuiz",
  DescribePage = "DescribePage",
  ReadLanguages = "ReadLanguages",
  AcessLanguage = "AcessLanguage",
  Logout = "Logout",
  NavigateBack = "NavigateBack",
  NavigateToBlock = "NavigateToBlock",
  RespondQuiz = "RespondQuiz",
  GoToNextWord = "GoToNextWord",
  ReadAchievements = "ReadAchievements",
  Login = "Login",
  AcessLessonStory = "AcessLessonStory",
  ReadWhatBlocks = "ReadWhatBlocks",
  ReadLessonStories = "ReadLessonStories",
  AccessWordsSummary = "AccessWordsSummary",
  ReadThecurrentWord = "ReadThecurrentWord",
  EpilogueReadShortStory = "EpilogueReadShortStory",

  CommandUnidentified = "CommandUnidentified"
}

export type AudioUserCommand =
// general:
| { command: AudioUserCommandType.DescribePage }
| { command: AudioUserCommandType.ReadLanguages }
| { command: AudioUserCommandType.NavigateBack }
| { command: AudioUserCommandType.Logout }
| { command: AudioUserCommandType.Login }

// languages pages:
| { command: AudioUserCommandType.ReadLessonStories }

| { command: AudioUserCommandType.GoToNextWord }
| { command: AudioUserCommandType.ReadAchievements }
| { command: AudioUserCommandType.ReadWhatBlocks }
| { command: AudioUserCommandType.AccessWordsSummary }
| { command: AudioUserCommandType.ReadThecurrentWord }
| { command: AudioUserCommandType.EpilogueReadShortStory }

| { command: AudioUserCommandType.NavigateToBlock; blockName: string }

| { command: AudioUserCommandType.AccessQuiz }
  | { command: AudioUserCommandType.RespondQuiz; answer: string }

  | { command: AudioUserCommandType.AcessLanguage; language: string }
  | { command: AudioUserCommandType.AcessLessonStory; storyName: string };
