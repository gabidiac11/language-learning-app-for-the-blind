import { apiMessages } from "../../ApiSupport/apiMessages";
import { ApiMessage } from "../../ApiSupport/appErrorMessage";
import { audioStorageBasePath } from "../../constants";

const apiMessageClean = Object.values(apiMessages)
  .map((v) => ({
    ...v,
    filePath: v.filePath.replace(`${audioStorageBasePath}`, "BASE_URL"),
  }))
  .reduce((prev, curr) => ({ ...prev, [curr.uniqueName]: curr }), {});

// to get these messages go to frontend -> http://localhost:3000/dev-messages
const frontendMessages = {
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
    text: "Try again to fetch the request.",
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
    text: "Stories of your selected language finished loading. Choose what lesson-story you want to access by pressing arrow left or arrow right to switch between story card information then press enter to access story.",
    filePath: "BASE_URL/pages/storiesOverview/loadedStoriesOverview.mp3",
  },
  greetingPageStoriesOverview: {
    uniqueName: "greetingPageStoriesOverview",
    text: "Page: Lesson-stories overview.",
    filePath: "BASE_URL/pages/storiesOverview/greetingPageStoriesOverview.mp3",
  },
  loadingStoryPage: {
    uniqueName: "loadingStoryPage",
    text: "Loading lesson-story selected.",
    filePath: "BASE_URL/pages/storyPage/loadingStoryPage.mp3",
  },
  loadedStoryPage: {
    uniqueName: "loadedStoryPage",
    text: "The story selected finished loading. Choose what building block or epilogue block you want to access by pressing arrow left or arrow right to switch between story card information then press enter to access.",
    filePath: "BASE_URL/pages/storyPage/loadedStoryPage.mp3",
  },
  greetingPageStoryPage: {
    uniqueName: "greetingPageStoryPage",
    text: "Page: Lesson story.",
    filePath: "BASE_URL/pages/storyPage/greetingPageStoryPage.mp3",
  },
  loadingBlockIntroduction: {
    uniqueName: "loadingBlockIntroduction",
    text: "Loading words summaries of the selected building block.",
    filePath: "BASE_URL/pages/blockIntroduction/loadingBlockIntroduction.mp3",
  },
  loadedBlockIntroduction: {
    uniqueName: "loadedBlockIntroduction",
    text: "Finished loading words summaries of the selected building block. The summary page is where each word of the block is displayed and read. It's recommended that you repeat to yourself those words. You can revisit this page each time you need to. Access page by pressing arrow up or arrow down to switch between options.",
    filePath: "BASE_URL/pages/blockIntroduction/loadedBlockIntroduction.mp3",
  },
  greetingPageBlockIntroduction: {
    uniqueName: "greetingPageBlockIntroduction",
    text: "Page: Building block word summaries.",
    filePath:
      "BASE_URL/pages/blockIntroduction/greetingPageBlockIntroduction.mp3",
  },
  blockSummaryCompleted: {
    uniqueName: "blockSummaryCompleted",
    text: "Completed! You completed the words introduction, you can start the words quiz.",
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
    text: "Loading request question for quiz.",
    filePath: "BASE_URL/pages/blockQuiz/loadingRequestQuestion.mp3",
  },
  loadingBlockQuizCompleted: {
    uniqueName: "loadingBlockQuizCompleted",
    text: "Loading quiz status.",
    filePath: "BASE_URL/pages/blockQuizCompleted/loadingBlockQuizCompleted.mp3",
  },
  loadedBlockQuizCompleted: {
    uniqueName: "loadedBlockQuizCompleted",
    text: "Coungradulations! You finished block! Navigate with arrow up or arrow down to see the achievements.",
    filePath: "BASE_URL/pages/blockQuizCompleted/loadedBlockQuizCompleted.mp3",
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
    text: "Finished loading epilogue short story.",
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
    text: "Coungradulations! You finished the epilgoue block and the whole lesson-story! Navigate with arrow up or arrow down to see the achievements.",
    filePath:
      "BASE_URL/pages/epiloqueQuizCompleted/loadedEpilogueQuizCompleted.mp3",
  },
  greetingPageEpilogueQuizCompleted: {
    uniqueName: "greetingPageEpilogueQuizCompleted",
    text: "Page: Epilogue quiz completed.",
    filePath:
      "BASE_URL/pages/epiloqueQuizCompleted/greetingPageEpilogueQuizCompleted.mp3",
  },
};

export default [
  ...Object.values(frontendMessages),
  ...Object.values(apiMessageClean),
] as ApiMessage[];
