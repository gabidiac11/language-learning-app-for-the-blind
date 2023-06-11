// NOTE: the values are the display name of the intent. Yes. This is how I do the matching with the API response.
export enum AudioUserCommandType {
  AccessQuiz = "access-quiz",
  DescribePage = "general-describe-page",
  ReadLanguages = "read-languages",
  AcessLanguage = "access-language",
  Logout = "logout",
  NavigateBack = "navigate-back",
  NavigateToBlock = "navigate-to-block",
  RespondQuiz = "respond-quiz",
  GoToNextWord = "go-to-next-word",
  ReadAchievements = "read-achievements",
  Login = "login",
  AcessLessonStory = "access-lesson-story",
  ReadWhatBlocks = "read-what-blocks",
  ReadLessonStories = "read-lesson-stories",
  AccessWordsSummary = "access-words-summary",
  ReadThecurrentWord = "read-the-current-word",
  EpilogueReadShortStory = "epilogue-read-short-story",

  CommandUnidentified = "CommandUnidentified",
}

export type AcessLanguageCommandPayload = {
  commandType: AudioUserCommandType.AcessLanguage;
  language: string;
};
export type NavigateToBlockCommandPaylod = {
  commandType: AudioUserCommandType.NavigateToBlock;
  buildingBlockOrEpilogueName: string;
  number?: number;
};
export type RespondQuizPaylod = {
  commandType: AudioUserCommandType.RespondQuiz;
  answerOptionName?: string;
  answerOptionNumber?: number;
};
export type AcessLessonStoryPaylod = {
  commandType: AudioUserCommandType.AcessLessonStory;
  storyName: string;
  number?: number;
};

export type AudioUserCommand =
  // general:
  | { commandType: AudioUserCommandType.DescribePage }
  | { commandType: AudioUserCommandType.NavigateBack }
  | { commandType: AudioUserCommandType.Logout }
  | { commandType: AudioUserCommandType.Login }

  // language page:
  | { commandType: AudioUserCommandType.ReadLanguages }
  | AcessLanguageCommandPayload

  // blocks (includes epilogue)
  | NavigateToBlockCommandPaylod
  | { commandType: AudioUserCommandType.ReadWhatBlocks }

  // building block words summary
  | { commandType: AudioUserCommandType.ReadThecurrentWord }
  | { commandType: AudioUserCommandType.GoToNextWord }
  | { commandType: AudioUserCommandType.AccessWordsSummary }

  // quiz related pages:
  | { commandType: AudioUserCommandType.AccessQuiz }
  | RespondQuizPaylod
  | { commandType: AudioUserCommandType.ReadAchievements }

  // epilogue short story:
  | { commandType: AudioUserCommandType.EpilogueReadShortStory }

  // story overview page:
  | { commandType: AudioUserCommandType.ReadLessonStories }
  | AcessLessonStoryPaylod

  // unknown
  | { commandType: AudioUserCommandType.CommandUnidentified };

export const commandUnidentifiedValue: AudioUserCommand = {
  commandType: AudioUserCommandType.CommandUnidentified,
};

export type UserVoiceCommandResponse = {
  command: AudioUserCommand;
  userSpeechText: string;
};

export type UserVoiceCommandCtxItem = {
  key: string;
  command: AudioUserCommand;
  userSpeechText: string;
};

export interface AcessLanguageCommandPayloadResponse
  extends UserVoiceCommandResponse {
  command: AcessLanguageCommandPayload;
}
export interface NavigateToBlockCommandPaylodResponse
  extends UserVoiceCommandResponse {
  command: NavigateToBlockCommandPaylod;
}
export interface RespondQuizPaylodResponse extends UserVoiceCommandResponse {
  command: RespondQuizPaylod;
}
export interface AcessLessonStoryPaylodResponse
  extends UserVoiceCommandResponse {
  command: AcessLessonStoryPaylod;
}
