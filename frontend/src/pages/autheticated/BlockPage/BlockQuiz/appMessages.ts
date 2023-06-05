import { AppMessage } from "../../../../accessibility/accesibilityTypes";
import { audioStorageBasePath } from "../../../../constants";

export const blockQuizPageMessages: {
  loadingRequestQuestion: AppMessage;
} = {
  loadingRequestQuestion: {
    uniqueName: "loadingRequestQuestion",
    text: "Loading request question for quiz.",
    filePath: `${audioStorageBasePath}/pages/blockQuiz/loadingRequestQuestion.mp3`,
  },
};
