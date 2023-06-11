import { audioStorageBasePath } from "../constants";
import { ApiMessage } from "./appErrorMessage";

export const apiMessages: ApiMessages = {
  // generic error messages:
  notFound: {
    uniqueName: "notFound",
    text: "Resource not found.",
    filePath: `${audioStorageBasePath}/server/notFound.mp3`,
  },
  somethingWentWrong: {
    uniqueName: "somethingWentWrong",
    text: "Something went wrong.",
    filePath: `${audioStorageBasePath}/server/somethingWentWrong.mp3`,
  },
  unauthorized: {
    uniqueName: "unauthorized",
    text: "Unauthorized.",
    filePath: `${audioStorageBasePath}/server/unauthorized.mp3`,
  },

  // language header error:
  languageNotSet: {
    uniqueName: "languageNotSet",
    text: "Language is not set.",
    filePath: `${audioStorageBasePath}/server/languageNotSet.mp3`,
  },

  // building blocks:
  summaryNotFinishedBecauseBlockIsLocked: {
    uniqueName: "summaryNotFinishedBecauseBlockIsLocked",
    text: "This block summary was not completed because this block is locked.",
    filePath: `${audioStorageBasePath}/server/summaryNotFinishedBecauseBlockIsLocked.mp3`,
  },
  blockSummaryNotFinished: {
    uniqueName: "blockSummaryNotFinished",
    text: "Building block summary was not completed. Please complete it to practice the words before doing the intended action.",
    filePath: `${audioStorageBasePath}/server/blockSummaryNotFinished.mp3`,
  },

  // epilogue:
  epilogueLocked: {
    uniqueName: "epilogueLocked",
    text: "Epilogue is locked. Please complete all building blocks to unlock the epilogue block.",
    filePath: `${audioStorageBasePath}/server/epilogueLocked.mp3`,
  },

  // quiz errors:
  quizCantAnswerQuestionNotFound: {
    uniqueName: "quizCantAnswerQuestionNotFound",
    text: "Can't answer question because the question is not part of any uncompleted quiz.",
    filePath: `${audioStorageBasePath}/server/quizCantAnswerQuestionNotFound.mp3`,
  },
  quizNotFound: {
    uniqueName: "quizNotFound",
    text: "Quiz with id requested doesn't exit.",
    filePath: `${audioStorageBasePath}/server/quizNotFound.mp3`,
  },
  quizNotCompletedYet: {
    uniqueName: "quizNotCompletedYet",
    text: "Quiz with id was not yet completed.",
    filePath: `${audioStorageBasePath}/server/quizNotCompletedYet.mp3`,
  },
  quizCantAccessBlockIsLocked: {
    uniqueName: "quizCantAccessBlockIsLocked",
    // NOTE: block refers to both building block and epilogue block
    text: "Block is locked. Please complete the other blocks or stories required to access the quiz.",
    filePath: `${audioStorageBasePath}/server/quizNotCompletedYet.mp3`,
  },
  quizRequestBodyEmpty: {
    uniqueName: "quizRequestBodyEmpty",
    text: "Request body should not be empty.",
    filePath: `${audioStorageBasePath}/server/quizRequestBodyEmpty.mp3`,
  },
  quizRequestOptionEmpty: {
    uniqueName: "quizRequestOptionEmpty",
    text: "Option should not be empty.",
    filePath: `${audioStorageBasePath}/server/quizRequestOptionEmpty.mp3`,
  },
  quizRequestQuestionEmpty: {
    uniqueName: "quizRequestQuestionEmpty",
    text: "Question should not be empty.",
    filePath: `${audioStorageBasePath}/server/quizRequestQuestionEmpty.mp3`,
  },

  // quiz word question
  quizBlockWhatIstheMeaningOfWord: {
    uniqueName: "quizBlockWhatIstheMeaningOfWord",
    text: "What is the meaning of the following word?",
    filePath: `${audioStorageBasePath}/server/quizBlockWhatIstheMeaningOfWord.mp3`,
  },

  // quiz completed - achievements:
  quizYouCompletedBlock: {
    uniqueName: "quizYouCompletedBlock",
    text: "Congratulations! You have completed the building block",
    filePath: `${audioStorageBasePath}/server/quizYouCompletedBlock.mp3`,
  },
  quizCompletedApiMessage: {
    uniqueName: "quizCompletedApiMessage",
    text: "Congratulations! Quiz completed.",
    filePath: `${audioStorageBasePath}/server/quizCompletedApiMessage.mp3`,
  },
  quizYouUnlockedBuildingBlocks: {
    uniqueName: "quizYouUnlockedBuildingBlocks",
    text: "You've unlocked the following building blocks: ",
    filePath: `${audioStorageBasePath}/server/quizYouUnlockedBuildingBlocks.mp3`,
  },
  quizYouUnlockedEpilogueBlock: {
    uniqueName: "quizYouUnlockedEpilogueBlock",
    text: "You've unlocked the epilogue of the story",
    filePath: `${audioStorageBasePath}/server/quizYouUnlockedEpilogueBlock.mp3`,
  },

  quizYouUnlockedStories: {
    uniqueName: "quizYouUnlockedStories",
    text: "You've unlocked the following stories: ",
    filePath: `${audioStorageBasePath}/server/quizYouUnlockedStories.mp3`,
  },
  quizYouCompletedEpilogue: {
    uniqueName: "quizYouCompletedEpilogue",
    text: "Congratulations! You've completed the epilogue quiz, and the current story.",
    filePath: `${audioStorageBasePath}/server/quizYouCompletedEpilogue.mp3`,
  },

  quizYouAnsweredCorrect: {
    uniqueName: "quizYouAnsweredCorrect",
    text: "Right answer! ",
    filePath: `${audioStorageBasePath}/server/quizYouAnsweredCorrect.mp3`,
  },
  quizYouAnsweredWrong: {
    uniqueName: "quizYouAnsweredWrong",
    text: "Wrong answer! The correct answer was ",
    filePath: `${audioStorageBasePath}/server/quizYouAnsweredWrong.mp3`,
  },

  quizChoiceOne: {
    uniqueName: "quizChoiceOne",
    text: "Choice 1: ",
    filePath: `${audioStorageBasePath}/server/quizChoiceOne.mp3`,
  },
  quizChoiceTwo: {
    uniqueName: "quizChoiceTwo",
    text: "Choice 2: ",
    filePath: `${audioStorageBasePath}/server/quizChoiceTwo.mp3`,
  },
  quizChoiceThree: {
    uniqueName: "quizChoiceThree",
    text: "Choice 3: ",
    filePath: `${audioStorageBasePath}/server/quizChoiceThree.mp3`,
  },
  quizChoiceFour: {
    uniqueName: "quizChoiceFour",
    text: "Choice 4: ",
    filePath: `${audioStorageBasePath}/server/quizChoiceFour.mp3`,
  },

  // voice commands
  speechNotRecognised: {
    uniqueName: "speechNotRecognised",
    text: "Speech not recognised",
    filePath: `${audioStorageBasePath}/server/speechNotRecognised.mp3`,
  },
  voiceCommandNotIdentified: {
    uniqueName: "voiceCommandNotIdentified",
    text: "Could not match you speech to any command.",
    filePath: `${audioStorageBasePath}/server/voiceCommandNotIdentified.mp3`,
  },
  langRussian: {
    uniqueName: "langRussian",
    text: "Russian",
    filePath: `${audioStorageBasePath}/server/languages-audio/langRussian.mp3`,
  },
  langFrench: {
    uniqueName: "langFrench",
    text: "French",
    filePath: `${audioStorageBasePath}/server/languages-audio/langFrench.mp3`,
  },
  langGerman: {
    uniqueName: "langGerman",
    text: "German",
    filePath: `${audioStorageBasePath}/server/languages-audio/langGerman.mp3`,
  },
};

type ApiMessages = {
  notFound: ApiMessage;
  somethingWentWrong: ApiMessage;
  unauthorized: ApiMessage;

  languageNotSet: ApiMessage;

  summaryNotFinishedBecauseBlockIsLocked: ApiMessage;
  blockSummaryNotFinished: ApiMessage;

  epilogueLocked: ApiMessage;

  quizCantAnswerQuestionNotFound: ApiMessage;
  quizNotFound: ApiMessage;
  quizNotCompletedYet: ApiMessage;
  quizCantAccessBlockIsLocked: ApiMessage;
  quizRequestBodyEmpty: ApiMessage;
  quizRequestOptionEmpty: ApiMessage;
  quizRequestQuestionEmpty: ApiMessage;

  quizBlockWhatIstheMeaningOfWord: ApiMessage;

  // quiz completed - achievements:
  quizYouCompletedBlock: ApiMessage;
  quizCompletedApiMessage: ApiMessage;
  quizYouUnlockedBuildingBlocks: ApiMessage;
  quizYouUnlockedEpilogueBlock: ApiMessage;

  quizYouUnlockedStories: ApiMessage;
  quizYouCompletedEpilogue: ApiMessage;

  quizYouAnsweredCorrect: ApiMessage;
  quizYouAnsweredWrong: ApiMessage;

  quizChoiceOne: ApiMessage;
  quizChoiceTwo: ApiMessage;
  quizChoiceThree: ApiMessage;
  quizChoiceFour: ApiMessage;

  // voice commands:
  speechNotRecognised: ApiMessage;
  voiceCommandNotIdentified: ApiMessage;

  // languages
  langRussian: ApiMessage;
  langFrench: ApiMessage;
  langGerman: ApiMessage;
};

export const dynamicMessages: DynamicMessages = {
  requestParameterMissing: (key: string) => {
    const message = `Request parameter ${key} should not be null.`;
    const filePath = `${audioStorageBasePath}/requestParameterMissing${key}`;

    const result: ApiMessage & { isDynamic: true } = {
      text: message,
      uniqueName: `requestParameterMissing${key}`,
      filePath,
      isDynamic: true,
    };
    return result;
  },
};

type DynamicMessages = {
  requestParameterMissing: (key: string) => ApiMessage & { isDynamic: true };
};

export const getApiMessageFrom = (path: string, text: string): ApiMessage => {
  return {
    filePath: path,
    text,
    uniqueName: path,
  };
};
