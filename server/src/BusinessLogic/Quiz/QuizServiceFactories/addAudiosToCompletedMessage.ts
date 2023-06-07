import { apiMessages, getApiMessageFrom } from "../../../ApiSupport/apiMessages";
import { QuizCompletedStatsResponse } from "../../../Models/quiz.models";

export const addAudiosToCompletedMessage = (
    responseData: QuizCompletedStatsResponse
  ): QuizCompletedStatsResponse => {

    // NOTE: based on this it's determined if is a building block quiz or an epilogue quiz
    if (responseData.blockCompleted) {
      // add audio: "Congratulations! You completed block..."
      responseData.playableApiMessages.push(apiMessages.quizYouCompletedBlock);

      // add audio: "...${block name}"
      responseData.playableApiMessages.push(
        getApiMessageFrom(
          responseData.blockCompleted.block.audioFile,
          responseData.blockCompleted.block.name
        )
      );
    } else {
      // add audio: "Congratulations! You finsihed the epilogue"
      responseData.playableApiMessages.push(
        apiMessages.quizYouCompletedEpilogue
      );
    }

    // add audio: "You unlocked building blocks: ...."
    if (responseData.blockProgressUnlockedItems?.length) {
      responseData.playableApiMessages.push(
        apiMessages.quizYouUnlockedBuildingBlocks
      );

      // add audio "...${block name}"
      responseData.blockProgressUnlockedItems.forEach((blockProgress) => {
        responseData.playableApiMessages.push(
          getApiMessageFrom(
            blockProgress.block.audioFile,
            blockProgress.block.name
          )
        );
      });
    }

    // add audio "You unlocked the epilogue of the story."
    if (responseData.epilogueProgressUnlocked) {
      responseData.playableApiMessages.push(
        apiMessages.quizYouUnlockedEpilogueBlock
      );
    }

    if (responseData.userStoriesUnlocked?.length) {
      // add audio "You unlocked the stories..."
      responseData.playableApiMessages.push(apiMessages.quizYouUnlockedStories);

      // add audio "${story name}"
      responseData.userStoriesUnlocked.forEach((userStory) => {
        responseData.playableApiMessages.push(
          getApiMessageFrom(userStory.audioFile, userStory.name)
        );
      });
    }

    return responseData;
  }