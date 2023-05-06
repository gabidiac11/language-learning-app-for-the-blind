import { AxiosRequestConfig } from "axios";
import { axiosMockAdapterInstance } from "../../../axiosInstance";
import { UserStory } from "../../../context";
import {
  QuizBlockCompletedResponse,
  QuizRequestBody,
  QuizRequestBodyAnswer,
  QuizRequestBodyIntialQuestion,
  QuizResponse,
} from "../../../context/contextTypes/quizTypes";
import { mockContext } from "../../mockContext";
import {
  withUser,
  wait,
  Result,
  processResultOfT,
} from "../mockEndpointHelpers";
import EpilogueQuizService from "./EpilogueQuizService";

const getStoryWithGuard = (
  config: AxiosRequestConfig<any>,
  userId: string
): Result<UserStory> => {
  const existingUser = mockContext
    .getCtx()
    .userStories.find((i) => i.userId === userId);
  if (!existingUser) {
    return { errorStatusCode: 401, errors: ["User doesn't exist."] };
  }

  const [, epilogueId] = config?.url?.match(/epilogue\/([\d]+)/) || [];
  if (!epilogueId) {
    return { errorStatusCode: 400, errors: ["Block id should not be empty."] };
  }

  const existingStory = existingUser.stories.find(
    (s) => s.epilogueProgress.id === Number(epilogueId)
  );
  if (!existingStory) {
    return {
      errorStatusCode: 403,
      errors: [`User doesn't have any epilogue.`],
    };
  }

  if (!existingStory.epilogueProgress.timeUnlocked) {
    return {
      errorStatusCode: 403,
      errors: [
        `Epilogue is locked. Complete all building blocks to start this epilogue.`,
      ],
    };
  }

  return { data: existingStory };
};

axiosMockAdapterInstance.onGet(/^epilogue\/([\d]+)$/).reply(async (config) =>
  withUser(config, async (userId) => {
    const result = getStoryWithGuard(config, userId);
    if (result.errors || !result.data) {
      return processResultOfT(result);
    }

    const { data: existingStory } = result;

    await wait();
    return [200, existingStory.epilogueProgress];
  })
);

axiosMockAdapterInstance
  .onPost(/^epilogue\/([\d]+)\/complete-summary$/)
  .reply(async (config) =>
    withUser(config, async (userId) => {
      const result = getStoryWithGuard(config, userId);
      if (result.errors || !result.data) {
        return processResultOfT(result);
      }

      const { data: existingStory } = result;
      existingStory.epilogueProgress.timeSummaryCompleted =
        new Date().getTime();
      mockContext.SaveContext();

      await wait();
      return [200];
    })
  );

axiosMockAdapterInstance
  .onPost(/^epilogue\/([\d]+)\/quiz$/)
  .reply(async (config) =>
    withUser<QuizRequestBody>(config, async (userId, data) => {
      const existingUser = mockContext
        .getCtx()
        .userStories.find((i) => i.userId === userId);
      if (!existingUser) {
        return [401, { message: "User doesn't exist." }];
      }

      if (!data) {
        return [400, { message: "Request body can't be empty." }];
      }

      const [, epilogueProgressId] =
        config?.url?.match(/epilogue\/([\d]+)\/quiz/) || [];
      if (!epilogueProgressId) {
        return [400, { message: "Epilogue id should not be empty." }];
      }

      const existingStory = existingUser.stories.find(
        (s) => s.epilogueProgress.id === Number(epilogueProgressId)
      );
      if (!existingStory) {
        return [
          403,
          {
            message: `User doesn't have any epilogue with given id.`,
          },
        ];
      }

      if (!existingStory.epilogueProgress.timeUnlocked) {
        return [
          403,
          {
            message: `Epilogue for story '${existingStory.name}' is locked. Please complete all building blocks.`,
          },
        ];
      }

      wait();

      const epilogueQuizService = new EpilogueQuizService(
        userId,
        Number(epilogueProgressId)
      );
      if ((data as QuizRequestBodyIntialQuestion).questionRequested) {
        const responseBody = epilogueQuizService.getResumedQuestionFromQuiz();
        return processResultOfT<QuizResponse>(responseBody);
      }

      const responseBody = epilogueQuizService.answerQuestionAndGetNextQuestion(
        data as QuizRequestBodyAnswer
      );
      return processResultOfT<QuizResponse>(responseBody);
    })
  );

/**
 * ! doesn't do any completion -> only give a pretty response
 * it's expected that previously was completed at /quiz
 */
axiosMockAdapterInstance
  .onGet(/^epilogue\/([\d]+)\/quiz\/([\d]+)\/completed$/)
  .reply(async (config) =>
    withUser<QuizRequestBody>(config, async (userId) => {
      const existingUser = mockContext
        .getCtx()
        .userStories.find((i) => i.userId === userId);
      if (!existingUser) {
        return [401, { message: "User doesn't exist." }];
      }

      const [, epilogueProgressId, quizId] =
        config?.url?.match(/epilogue\/([\d]+)\/quiz\/([\d]+)\/completed/) || [];
      if (!epilogueProgressId) {
        return [400, { message: "Epilogue id should not be empty." }];
      }
      if (!quizId) {
        return [400, { message: "Quiz doesn't exist." }];
      }

      const existingStory = existingUser.stories.find(
        (s) => s.epilogueProgress.id === Number(epilogueProgressId)
      );
      if (!existingStory) {
        return [
          403,
          {
            message: `User doesn't have any epilogue with given id.`,
          },
        ];
      }

      if (!existingStory.epilogueProgress.timeUnlocked) {
        return [
          403,
          {
            message: `Epilogue for story '${existingStory.name}' is locked. Please complete all building blocks.`,
          },
        ];
      }

      const quiz = mockContext
        .getCtx()
        .epilogueQuizStates?.[epilogueProgressId]?.quizStates?.find(
          (q) => q.id === Number(quizId)
        );
      if (!quiz) {
        return [400, { message: "Quiz could not be found." }];
      }
      if (!quiz.timeCompleted) {
        return [400, { message: "Quiz is not completed yet." }];
      }

      const userStoriesUnlocked: UserStory[] = [];
      existingStory.dependentOnIds
        ?.map((id) => existingUser.stories.find((i) => i.id === id))
        .forEach((item) => {
          if (item) {
            userStoriesUnlocked.push(item);
          }
        });

      const data: QuizBlockCompletedResponse = {
        epilogueProgressUnlocked: undefined, // todo: check for this one
        blockCompletedStoryRefId: existingStory.id,
        userStoriesUnlocked,
      };

      wait();

      return [200, data];
    })
  );
