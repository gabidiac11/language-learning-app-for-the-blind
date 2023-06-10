import { AppMessage } from "../accessibility/types/appMessage.type";
import { generalAppMessages } from "../accessibility/staticAppMessages/generalAppMessages";
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
import { apiErrorsAppMessages } from "../accessibility/staticAppMessages/apiErrorsAppMessages";
import {
  loginPageMessages,
  registerPageMessages,
} from "../pages/auth-pages/appMessages";
import { epilogueQuizPageMessages } from "../pages/autheticated/EpiloguePage/EpilogueQuiz/appMessages";
import { micMessages } from "../pages/page-components/accessibility/Microphone/appMessages";

// page which is used as utilitary to generate audio files for the frontend feedback using text to speech later on

const objects = [
  apiErrorsAppMessages,
  generalAppMessages,
  langPageMessages,
  storiesOverviewPageMessages,
  storyPageMessages,
  blockIntroductionPageMessages,
  blockStartPageMessages,
  blockQuizPageMessages,
  blockQuizCompletedPageMessages,
  epilogueOverviewPageMessages,
  epiloqueQuizCompletedPageMessages,
  loginPageMessages,
  registerPageMessages,
  epilogueQuizPageMessages,
  micMessages,
];

const allAppMessages = objects
  .map((o) => Object.values(o))
  .flatMap((items) => items);

const throwIfDuplicateKeys = () => {
  const counts = allAppMessages.reduce((prev, curr) => {
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
  throwIfDuplicateKeys();
  return (
    <textarea
      style={{ width: "90vw", height: "90vh" }}
      value={JSON.stringify(
        withRemovedBaseUrl(
          objects.reduce(
            (acc, curr) => ({ ...acc, ...curr }),
            {} as { [key: string]: AppMessage }
          )
        )
      )}
    />
  );
};
