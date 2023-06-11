import { AppMessage } from "../../../../accessibility/types/appMessage.type";
import { audioStorageBasePath } from "../../../../constants";

export const blockQuizPageMessages: {
  loadingRequestQuestion: AppMessage;
  loadedRequestQuestion: AppMessage;
  instructionsQuizBlockQuestion: AppMessage;
} = {
  loadingRequestQuestion: {
    uniqueName: "loadingRequestQuestion",
    text: "Loading quiz.",
    filePath: `${audioStorageBasePath}/pages/blockQuiz/loadingRequestQuestion.mp3`,
  },
  loadedRequestQuestion: {
    uniqueName: "loadedRequestQuestion",
    text: "Quiz loaded.",
    filePath: `${audioStorageBasePath}/pages/blockQuiz/loadedRequestQuestion.mp3`,
  },
  instructionsQuizBlockQuestion: {
    uniqueName: "instructionsQuizBlockQuestion",
    text: "Navigate using up or down arrows to  replay these questions and answers, and use enter to choose the correct answer.",
    filePath: `${audioStorageBasePath}/pages/blockQuiz/instructionsQuizBlockQuestion.mp3`,
  }
};
