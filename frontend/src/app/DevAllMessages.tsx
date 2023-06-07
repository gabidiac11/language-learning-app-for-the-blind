import { AppMessage } from "../accessibility/accesibilityTypes";
import { generalAppMessages } from "../accessibility/generalAppMessages";
import { audioStorageBasePath } from "../constants";
import { blockIntroductionPageMessages } from "../pages/autheticated/BlockPage/BlockIntroduction/appMessages";
import { blockStartPageMessages } from "../pages/autheticated/BlockPage/BlockOverview/appMessages";
import { blockQuizPageMessages } from "../pages/autheticated/BlockPage/BlockQuiz/appMessages";
import { blockQuizCompletedPageMessages } from "../pages/autheticated/BlockPage/BlockQuizCompleted/appMessages";
import { epilogueOverviewPageMessages } from "../pages/autheticated/EpiloguePage/appMessages";
import { epiloqueQuizCompletedPageMessages } from "../pages/autheticated/EpiloguePage/EpilogueQuiz/EpilogueQuizCompleted/appMessages";
import { langPageMessages } from "../pages/autheticated/LessonLanguages/appMessages";
import { storiesOverviewPageMessages } from "../pages/autheticated/StoriesOverviewPage/appMessages";
import { storyPageMessages } from "../pages/autheticated/StoryPage/appMessages";
import { errorAppMessages } from "./../accessibility/errorAppMessages";
import {
  loginPageMessages,
  registerPageMessages,
} from "../pages/auth-pages/appMessages";
import { epilogueQuizPageMessages } from "../pages/autheticated/EpiloguePage/EpilogueQuiz/appMessages";

// page which is used as utilitary to generate audio files for the frontend feedback using text to speech later on

const items = [
  ...Object.values(errorAppMessages),
  ...Object.values(generalAppMessages),
  ...Object.values(langPageMessages),
  ...Object.values(storiesOverviewPageMessages),
  ...Object.values(storyPageMessages),
  ...Object.values(blockIntroductionPageMessages),
  ...Object.values(blockStartPageMessages),
  ...Object.values(blockQuizPageMessages),
  ...Object.values(blockQuizCompletedPageMessages),
  ...Object.values(epilogueOverviewPageMessages),
  ...Object.values(epiloqueQuizCompletedPageMessages),
  ...Object.values(loginPageMessages),
  ...Object.values(registerPageMessages),
  ...Object.values(epilogueQuizPageMessages),
];

const checkDuplicates = () => {
  const counts = items.reduce((prev, curr) => {
    if (prev[curr.uniqueName]) {
      prev[curr.uniqueName] += 1;
    } else {
      prev[curr.uniqueName] = 1;
    }
    return { ...prev };
  }, {} as { [key: string]: number });

  let errorMessage = "";
  for (const [key, count] of Object.entries(counts)) {
    if (count > 1) {
      console.log(`key ${key} has bad count ${count}`);
      errorMessage += ` \n key ${key} has bad count ${count}`;
    }
  }
  if (errorMessage) {
    throw errorMessage;
  }
};

const withRemovedBaseUrl = (obj: { [key: string]: AppMessage }) => {
  const result = Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = {
      ...value,
      filePath: value.filePath.replace(`${audioStorageBasePath}`, "BASE_URL"),
    };
    return acc;
  }, {} as { [key: string]: AppMessage });
  return result;
};

export const DevAllMessages = () => {
  checkDuplicates();
  return (
    <textarea
      style={{ width: "90vw", height: "90vh" }}
      value={JSON.stringify(
        withRemovedBaseUrl({
          ...errorAppMessages,
          ...generalAppMessages,
          ...langPageMessages,
          ...storiesOverviewPageMessages,
          ...storyPageMessages,
          ...blockIntroductionPageMessages,
          ...blockStartPageMessages,
          ...blockQuizPageMessages,
          ...blockQuizCompletedPageMessages,
          ...epilogueOverviewPageMessages,
          ...epiloqueQuizCompletedPageMessages,
          ...loginPageMessages,
          ...registerPageMessages,
          ...epilogueQuizPageMessages
        })
      )}
    />
  );
};
