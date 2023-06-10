import {
  AcessLanguageCommandPayloadResponse,
  AcessLessonStoryPaylodResponse,
  AudioUserCommandType,
  NavigateToBlockCommandPaylodResponse,
  RespondQuizPaylodResponse,
  UserVoiceCommandResponse,
} from "../Models/voiceCommand.types";

const apiVoiceCommandResponseExample = Object.values(AudioUserCommandType)
  .map((commandType): UserVoiceCommandResponse => {
    switch (commandType) {
      case AudioUserCommandType.AcessLanguage:
        return {
          command: {
            commandType,
            language: "German",
          },
          userSpeechText: "go to German",
        };
      case AudioUserCommandType.NavigateToBlock:
        return {
          command: {
            commandType,
            buildingBlockOrEpilogueName: "Family #1",
          },
          userSpeechText: "go to family number 1",
        };
      case AudioUserCommandType.RespondQuiz:
        return {
          command: {
            commandType,
            answerOptionName: "Anna is learning Russian",
            answerOptionNumber: 5,
          },
          userSpeechText: "the answer is anna is learning russian",
        };
      case AudioUserCommandType.AcessLessonStory:
        return {
          command: { commandType, storyName: "Story #1" },
          userSpeechText: "take me to story number 1",
        };
      default:
        return {
          command: {
            commandType,
          },
          userSpeechText: "[user sppech]",
        };
    }
  })
  .reduce(
    (prev, curr) => ({ ...prev, [curr.command.commandType]: curr }),
    {} as { [key in AudioUserCommandType]: UserVoiceCommandResponse }
  );

export const exampleAccessQuiz =
  apiVoiceCommandResponseExample[AudioUserCommandType.AccessQuiz];

export const exampleDescribePage =
  apiVoiceCommandResponseExample[AudioUserCommandType.DescribePage];

export const exampleReadLanguages =
  apiVoiceCommandResponseExample[AudioUserCommandType.ReadLanguages];

export const exampleAcessLanguage = apiVoiceCommandResponseExample[
  AudioUserCommandType.AcessLanguage
] as AcessLanguageCommandPayloadResponse;

export const exampleLogout =
  apiVoiceCommandResponseExample[AudioUserCommandType.Logout];

export const exampleNavigateBack =
  apiVoiceCommandResponseExample[AudioUserCommandType.NavigateBack];

export const exampleNavigateToBlock = apiVoiceCommandResponseExample[
  AudioUserCommandType.NavigateToBlock
] as NavigateToBlockCommandPaylodResponse;

export const exampleRespondQuiz = apiVoiceCommandResponseExample[
  AudioUserCommandType.RespondQuiz
] as RespondQuizPaylodResponse;

export const exampleGoToNextWord =
  apiVoiceCommandResponseExample[AudioUserCommandType.GoToNextWord];

export const exampleReadAchievements =
  apiVoiceCommandResponseExample[AudioUserCommandType.ReadAchievements];

export const exampleLogin =
  apiVoiceCommandResponseExample[AudioUserCommandType.Login];

export const exampleAcessLessonStory = apiVoiceCommandResponseExample[
  AudioUserCommandType.AcessLessonStory
] as AcessLessonStoryPaylodResponse;

export const exampleReadWhatBlocks =
  apiVoiceCommandResponseExample[AudioUserCommandType.ReadWhatBlocks];

export const exampleReadLessonStories =
  apiVoiceCommandResponseExample[AudioUserCommandType.ReadLessonStories];

export const exampleAccessWordsSummary =
  apiVoiceCommandResponseExample[AudioUserCommandType.AccessWordsSummary];

export const exampleReadThecurrentWord =
  apiVoiceCommandResponseExample[AudioUserCommandType.ReadThecurrentWord];

export const exampleEpilogueReadShortStory =
  apiVoiceCommandResponseExample[AudioUserCommandType.EpilogueReadShortStory];

export const exampleCommandUnidentified =
  apiVoiceCommandResponseExample[AudioUserCommandType.CommandUnidentified];
