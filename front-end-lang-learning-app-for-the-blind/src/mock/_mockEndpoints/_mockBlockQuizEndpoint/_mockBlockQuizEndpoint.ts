import { axiosMockAdapterInstance } from "../../../axiosInstance";
import {
  QuizRequestBody,
  QuizRequestBodyAnswer,
  QuizRequestBodyIntialQuestion,
  QuizResponse,
} from "../../../context/contextTypes/quizTypes";
import { mockContext } from "../../mockContext";
import { withUser, wait, processResultOfT } from "../mockEndpointHelpers";
import QuizService from "./QuizService";

axiosMockAdapterInstance.onPost(/^blocks\/(.+)\/quiz$/).reply(async (config) =>
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

    const [, blockId] = config?.url?.match(/blocks\/(.+)\/quiz/) || [];
    if (!blockId) {
      return [400, { message: "Block id should not be empty." }];
    }

    const existingBlock = existingUser.stories
      .flatMap((s) => s.buildingBlocksProgressItems)
      .find((bp) => bp.id === Number(blockId));
    if (!existingBlock) {
      return [
        403,
        {
          message: `User ${userId} doesn't have any block with id:${Number(
            blockId
          )}.`,
        },
      ];
    }

    wait();
    
    const quizService = new QuizService(userId, Number(blockId));
    if ((data as QuizRequestBodyIntialQuestion).questionRequested) {
      const responseBody = quizService.getResumedQuestionFromQuiz();
      return processResultOfT<QuizResponse>(responseBody);
    }

    const responseBody = quizService.answerQuestionAndGetNextQuestion(
      data as QuizRequestBodyAnswer
    );
    return processResultOfT<QuizResponse>(responseBody);
  })
);
