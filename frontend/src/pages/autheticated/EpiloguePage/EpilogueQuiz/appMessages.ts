import { AppMessage } from "../../../../accessibility/types/appMessage.type";
import { audioStorageBasePath } from "../../../../constants";

export const epilogueQuizPageMessages: {
  loadedRequestQuestionEpiloue: AppMessage;
  instructionsQuizepilogueQuestion: AppMessage;
} = {
  loadedRequestQuestionEpiloue: {
    uniqueName: "loadedRequestQuestionEpiloue",
    text: "Quiz loaded.",
    filePath: `${audioStorageBasePath}/pages/epilogueQuiz/loadedRequestQuestionEpiloue.mp3`,
  },
  instructionsQuizepilogueQuestion: {
    uniqueName: "instructionsQuizepilogueQuestion",
    text: "Navigate using up or down arrows to  replay these questions and answers, and use enter to choose the correct answer.",
    filePath: `${audioStorageBasePath}/pages/epilogueQuiz/instructionsQuizepilogueQuestion.mp3`,
  },
};
