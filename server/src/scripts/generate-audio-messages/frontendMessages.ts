// at http://localhost:3000/dev-messages

export default {
  somethingWentWrong: {
    uniqueName: "somethingWentWrong",
    text: "Something went wrong. Please try again later.",
    filePath: "BASE_URL/errors/somethingWentWrong.mp3",
  },
  networkError: {
    uniqueName: "networkError",
    text: "Network error. Please check your connection.",
    filePath: "BASE_URL/errors/networkError.mp3",
  },
  readAvailableCommands: {
    uniqueName: "readAvailableCommands",
    text: "Read avilable commands.",
    filePath: "BASE_URL/frontendGeneral/readAvailableCommands.mp3",
  },
  tryAgainFetchRequest: {
    uniqueName: "tryAgainFetchRequest",
    text: "Try again to fetch the request by navigating to 'Try again' button using tab.",
    filePath: "BASE_URL/frontendGeneral/tryAgainFetchRequest.mp3",
  },
  interactionIsOn: {
    uniqueName: "interactionIsOn",
    text: "Interaction is on.",
    filePath: "BASE_URL/frontendGeneral/interactionIsOn.mp3",
  },
  cantOpenALockedItem: {
    uniqueName: "cantOpenALockedItem",
    text: "Entering this item is forbidden because the item is in the locked state.",
    filePath: "BASE_URL/frontendGeneral/cantOpenALockedItem.mp3",
  },
  cantNavigateToNonExistentItem: {
    uniqueName: "cantNavigateToNonExistentItem",
    text: "Can't navigate to the item because it doesn't exist on this page.",
    filePath: "BASE_URL/frontendGeneral/cantNavigateToNonExistentItem.mp3",
  },
  cantLogoutBecauseAlreadyLogout: {
    uniqueName: "cantLogoutBecauseAlreadyLogout",
    text: "Cannot logout, because you're already logged out.",
    filePath: "BASE_URL/frontendGeneral/cantLogoutBecauseAlreadyLogout.mp3",
  },
  cantLoginBecauseAlreadyLogin: {
    uniqueName: "cantLoginBecauseAlreadyLogin",
    text: "Cannot login, because you're already logged in.",
    filePath: "BASE_URL/frontendGeneral/cantLoginBecauseAlreadyLogin.mp3",
  },
  couldNotMatchVoiceCommand: {
    uniqueName: "couldNotMatchVoiceCommand",
    text: "Voice command not found.",
    filePath: "BASE_URL/frontendGeneral/couldNotMatchVoiceCommand.mp3",
  },
  voiceCommandNotAvailableOnThisPage: {
    uniqueName: "voiceCommandNotAvailableOnThisPage",
    text: "Voice command not allowed on this page.",
    filePath: "BASE_URL/frontendGeneral/voiceCommandNotAvailableOnThisPage.mp3",
  },
  loadingLanguages: {
    uniqueName: "loadingLanguages",
    text: "Loading languages",
    filePath: "BASE_URL/pages/languages/loadingLanguages.mp3",
  },
  loadedLanguages: {
    uniqueName: "loadedLanguages",
    text: "Finished loading languages. Choose what language you want to learn from the available options by pressing arrow left or arrow right to switch between options.",
    filePath: "BASE_URL/pages/languages/loadedLanguages.mp3",
  },
  greetingPageLanguages: {
    uniqueName: "greetingPageLanguages",
    text: "Page: Lesson languages.",
    filePath: "BASE_URL/pages/languages/greetingPageLanguages.mp3",
  },
  loadingStoriesOverview: {
    uniqueName: "loadingStoriesOverview",
    text: "Loading lesson-stories of your selected language.",
    filePath: "BASE_URL/pages/storiesOverview/loadingStoriesOverview.mp3",
  },
  loadedStoriesOverview: {
    uniqueName: "loadedStoriesOverview",
    text: "Stories of your selected language finished loading. Choose what lesson-story you want to access by pressing arrow left or arrow right to switch between story card information then press enter to access the story.",
    filePath: "BASE_URL/pages/storiesOverview/loadedStoriesOverview.mp3",
  },
  greetingPageStoriesOverview: {
    uniqueName: "greetingPageStoriesOverview",
    text: "Page: Lesson-stories overview.",
    filePath: "BASE_URL/pages/storiesOverview/greetingPageStoriesOverview.mp3",
  },
  loadingStoryPage: {
    uniqueName: "loadingStoryPage",
    text: "Loading the selected lesson-story.",
    filePath: "BASE_URL/pages/storyPage/loadingStoryPage.mp3",
  },
  loadedStoryPage: {
    uniqueName: "loadedStoryPage",
    text: "Finished loading your selected story. Choose what building block or epilogue you want to access by pressing arrow left or arrow right to switch between story card information elements then press enter to enter any block focused.",
    filePath: "BASE_URL/pages/storyPage/loadedStoryPage.mp3",
  },
  greetingPageStoryPage: {
    uniqueName: "greetingPageStoryPage",
    text: "Page: Lesson story.",
    filePath: "BASE_URL/pages/storyPage/greetingPageStoryPage.mp3",
  },
  loadingBlockIntroduction: {
    uniqueName: "loadingBlockIntroduction",
    text: "Loading words summary of your selected building block.",
    filePath: "BASE_URL/pages/blockIntroduction/loadingBlockIntroduction.mp3",
  },
  loadedBlockIntroduction: {
    uniqueName: "loadedBlockIntroduction",
    text: "Finished loading. The summary page is where each word of the block is displayed and read. It's recommended that you repeat to yourself those words. You can revisit this page each time you need to. Access page by pressing arrow up or arrow down to switch between options.",
    filePath: "BASE_URL/pages/blockIntroduction/loadedBlockIntroduction.mp3",
  },
  greetingPageBlockIntroduction: {
    uniqueName: "greetingPageBlockIntroduction",
    text: "Page: Building block words summaries.",
    filePath:
      "BASE_URL/pages/blockIntroduction/greetingPageBlockIntroduction.mp3",
  },
  blockSummaryCompleted: {
    uniqueName: "blockSummaryCompleted",
    text: "Congratulations! You completed the words introduction, you can start the words quiz.",
    filePath: "BASE_URL/pages/blockIntroduction/blockSummaryCompleted.mp3",
  },
  loadingBlockStart: {
    uniqueName: "loadingBlockStart",
    text: "Loading your selected building block.",
    filePath: "BASE_URL/pages/blockStart/loadingBlockStart.mp3",
  },
  loadedBlockStart: {
    uniqueName: "loadedBlockStart",
    text: "Finished loading your selected building block. Start or continue practicing the words using the introduction module or the quiz module. Once both are completed the block is completed. Access page by pressing arrow up or arrow down to switch between options.",
    filePath: "BASE_URL/pages/blockStart/loadedBlockStart.mp3",
  },
  greetingPageBlockStart: {
    uniqueName: "greetingPageBlockStart",
    text: "Page: Building block overview.",
    filePath: "BASE_URL/pages/blockStart/greetingPageBlockStart.mp3",
  },
  loadingRequestQuestion: {
    uniqueName: "loadingRequestQuestion",
    text: "Loading quiz.",
    filePath: "BASE_URL/pages/blockQuiz/loadingRequestQuestion.mp3",
  },
  loadedRequestQuestion: {
    uniqueName: "loadedRequestQuestion",
    text: "Quiz loaded.",
    filePath: "BASE_URL/pages/blockQuiz/loadedRequestQuestion.mp3",
  },
  instructionsQuizBlockQuestion: {
    uniqueName: "instructionsQuizBlockQuestion",
    text: "Navigate using up or down arrows to  replay these questions and answers, and use enter to choose the correct answer.",
    filePath: "BASE_URL/pages/blockQuiz/instructionsQuizBlockQuestion.mp3",
  },
  loadingBlockQuizCompleted: {
    uniqueName: "loadingBlockQuizCompleted",
    text: "Loading quiz achievements.",
    filePath: "BASE_URL/pages/blockQuizCompleted/loadingBlockQuizCompleted.mp3",
  },
  loadedBlockQuizCompleted: {
    uniqueName: "loadedBlockQuizCompleted",
    text: "Navigate with arrow up or arrow down to see the achievements.",
    filePath: "BASE_URL/pages/blockQuizCompleted/loadedBlockQuizCompleted.mp3",
    preventForcedStopOnCurrentPageJustOnce: true,
  },
  greetingPageBlockQuizCompleted: {
    uniqueName: "greetingPageBlockQuizCompleted",
    text: "Page: Block quiz completed.",
    filePath:
      "BASE_URL/pages/blockQuizCompleted/greetingPageBlockQuizCompleted.mp3",
  },
  loadingEpilogueOverview: {
    uniqueName: "loadingEpilogueOverview",
    text: "Loading epilogue short story.",
    filePath: "BASE_URL/pages/epilogueOverview/loadingEpilogueOverview.mp3",
  },
  loadedEpilogueOverview: {
    uniqueName: "loadedEpilogueOverview",
    text: "Epilogue short story has finished loading. To listen navigate in the page using arrows up or arrow down to find the paragraph or the play/stop button.",
    filePath: "BASE_URL/pages/epilogueOverview/loadedEpilogueOverview.mp3",
  },
  greetingPageEpilogueOverview: {
    uniqueName: "greetingPageEpilogueOverview",
    text: "Page: Epilogue short story.",
    filePath:
      "BASE_URL/pages/epilogueOverview/greetingPageEpilogueOverview.mp3",
  },
  loadingEpilogueQuizCompleted: {
    uniqueName: "loadingEpilogueQuizCompleted",
    text: "Loading quiz status.",
    filePath:
      "BASE_URL/pages/epiloqueQuizCompleted/loadingEpilogueQuizCompleted.mp3",
  },
  loadedEpilogueQuizCompleted: {
    uniqueName: "loadedEpilogueQuizCompleted",
    text: "Navigate with arrow up or arrow down to see the achievements.",
    filePath:
      "BASE_URL/pages/epiloqueQuizCompleted/loadedEpilogueQuizCompleted.mp3",
    preventForcedStopOnCurrentPageJustOnce: true,
  },
  greetingPageEpilogueQuizCompleted: {
    uniqueName: "greetingPageEpilogueQuizCompleted",
    text: "Page: Epilogue quiz completed.",
    filePath:
      "BASE_URL/pages/epiloqueQuizCompleted/greetingPageEpilogueQuizCompleted.mp3",
  },
  greetingLoginPage: {
    uniqueName: "greetingLoginPage",
    text: "Page: Login page. Login or register with google.",
    filePath: "BASE_URL/pages/login/greetingLoginPage.mp3",
  },
  invalidEmailRegisterPage: {
    uniqueName: "invalidEmailRegisterPage",
    text: "Invalid email error occured while trying to register.",
    filePath: "BASE_URL/pages/register/invalidEmailRegisterPage.mp3",
  },
  emailAlreadyUsedRegisterPage: {
    uniqueName: "emailAlreadyUsedRegisterPage",
    text: "Invalid email error occured while trying to register.",
    filePath: "BASE_URL/pages/register/emailAlreadyUsedRegisterPage.mp3",
  },
  invalidPasswordRegisterPage: {
    uniqueName: "invalidPasswordRegisterPage",
    text: "Invalid password occured while trying to register. Make sure to include capital letters, lowercase letters, and use a password between 8 and 16 characters.",
    filePath: "BASE_URL/pages/register/invalidPasswordRegisterPage.mp3",
  },
  greetingRegisterPage: {
    uniqueName: "greetingRegisterPage",
    text: "Page: Register with email and password.",
    filePath: "BASE_URL/pages/register/greetingRegisterPage.mp3",
  },
  loadedRequestQuestionEpiloue: {
    uniqueName: "loadedRequestQuestionEpiloue",
    text: "Quiz loaded.",
    filePath: "BASE_URL/pages/epilogueQuiz/loadedRequestQuestionEpiloue.mp3",
  },
  instructionsQuizepilogueQuestion: {
    uniqueName: "instructionsQuizepilogueQuestion",
    text: "Navigate using up or down arrows to  replay these questions and answers, and use enter to choose the correct answer.",
    filePath:
      "BASE_URL/pages/epilogueQuiz/instructionsQuizepilogueQuestion.mp3",
  },
  micOn: {
    uniqueName: "micOn",
    text: "Mic on",
    filePath: "BASE_URL/pages/blockIntroduction/micOn.mp3",
  },
  micOff: {
    uniqueName: "micOff",
    text: "Mic off.",
    filePath: "BASE_URL/pages/blockIntroduction/micOff.mp3",
  },
  micRequested: {
    uniqueName: "micRequested",
    text: "Mic requested.",
    filePath: "BASE_URL/pages/blockIntroduction/micRequested.mp3",
  },
  popupAllowMicMightOpen: {
    uniqueName: "popupAllowMicMightOpen",
    text: "Chrome might show a prompt. Please allow mic by pressing tab twice then press enter to allow.",
    filePath: "BASE_URL/pages/blockIntroduction/popupAllowMicMightOpen.mp3",
  },
  micPermissionDenied: {
    uniqueName: "micPermissionDenied",
    text: "Mic blocked. Please allow media from your chrome settings to use the mic interactions.",
    filePath: "BASE_URL/pages/blockIntroduction/micPermissionDenied.mp3",
  },
  noVoiceCommandsOnThisPage: {
    uniqueName: "noVoiceCommandsOnThisPage",
    text: "Mic disabled. No available voice commands on this page.",
    filePath: "BASE_URL/pages/blockIntroduction/noVoiceCommandsOnThisPage.mp3",
  },
};
