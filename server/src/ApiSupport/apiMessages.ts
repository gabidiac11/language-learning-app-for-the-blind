import { audioStorageBasePath } from "../constants";
import { ApiMessage } from "./appErrorMessage";

export const apiMessages: ApiMessages = {
  // generic error messages:
  notFound: {
    uniqueName: "notFound",
    text: "Resource not found.",
    filePath: `${audioStorageBasePath}/notFound.mp3`,
  },
  somethingWentWrong: {
    uniqueName: "somethingWentWrong",
    text: "Something went wrong.",
    filePath: `${audioStorageBasePath}/somethingWentWrong.mp3`,
  },
  unauthorized: {
    uniqueName: "unauthorized",
    text: "Unauthorized.",
    filePath: `${audioStorageBasePath}/unauthorized.mp3`,
  },

  // language header error:
  languageNotSet: {
    uniqueName: "languageNotSet",
    text: "Language is not set.",
    filePath: `${audioStorageBasePath}/languageNotSet.mp3`,
  },

  // building blocks:
  summaryNotFinishedBecauseBlockIsLocked: {
    uniqueName: "summaryNotFinishedBecauseBlockIsLocked",
    text:
      "This block summary was not completed because this block is locked.",
    filePath: `${audioStorageBasePath}/summaryNotFinishedBecauseBlockIsLocked.mp3`,
  },
  blockSummaryNotFinished: {
    uniqueName: "blockSummaryNotFinished",
    text: "Building block summary was not completed. Please complete it to practice the words before doing the intended action.",
    filePath: `${audioStorageBasePath}/blockSummaryNotFinished.mp3`,
  },

  // epilogue:
  epilogueLocked: {
    uniqueName: "epilogueLocked",
    text:
      "Epilogue is locked. Please complete all building blocks to unlock the epilogue block.",
    filePath: `${audioStorageBasePath}/epilogueLocked.mp3`,
  },

  // quiz:
  quizCantAnswerQuestionNotFound: {
    uniqueName: "quizCantAnswerQuestionNotFound",
    text:
      "Can't answer question because the question is not part of any uncompleted quiz.",
    filePath: `${audioStorageBasePath}/quizCantAnswerQuestionNotFound.mp3`,
  },
  quizNotFound: {
    uniqueName: "quizNotFound",
    text: "Quiz with id requested doesn't exit.",
    filePath: `${audioStorageBasePath}/quizNotFound.mp3`,
  },
  quizNotCompletedYet: {
    uniqueName: "quizNotCompletedYet",
    text: "Quiz with id was not yet completed.",
    filePath: `${audioStorageBasePath}/quizNotCompletedYet.mp3`,
  },
  quizCantAccessBlockIsLocked: {
    uniqueName: "quizCantAccessBlockIsLocked",
    // NOTE: block refers to both building block and epilogue block
    text:
      "Block is locked. Please complete the other blocks or stories required to access the quiz.",
    filePath: `${audioStorageBasePath}/quizNotCompletedYet.mp3`,
  },
  quizRequestBodyEmpty: {
    uniqueName: "quizRequestBodyEmpty",
    text: "Request body should not be empty.",
    filePath: `${audioStorageBasePath}/quizRequestBodyEmpty.mp3`,
  },
  quizRequestOptionEmpty: {
    uniqueName: "quizRequestOptionEmpty",
    text: "Option should not be empty.",
    filePath: `${audioStorageBasePath}/quizRequestOptionEmpty.mp3`,
  },
  quizRequestQuestionEmpty: {
    uniqueName: "quizRequestQuestionEmpty",
    text: "Question should not be empty.",
    filePath: `${audioStorageBasePath}/quizRequestQuestionEmpty.mp3`,
  }
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
  quizRequestBodyEmpty: ApiMessage,
  quizRequestOptionEmpty: ApiMessage,
  quizRequestQuestionEmpty: ApiMessage,
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
