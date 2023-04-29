import { axiosMockAdapterInstance } from "../../../axiosInstance";
import { BuildingBlockProgress } from "../../../context";
import {
  QuizCompletedResponse,
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

    if (!existingBlock.timeUnlocked) {
      return [
        403,
        {
          message: `Block '${existingBlock.block.name}' is locked.`,
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

/**
 * ! doesn't do any completion -> only give a pretty response
 * it's expected that previously was completed at /quiz
 */
axiosMockAdapterInstance
  .onGet(/^blocks\/(.+)\/quiz\/(.+)\/completed$/)
  .reply(async (config) =>
    withUser<QuizRequestBody>(config, async (userId) => {
      const existingUser = mockContext
        .getCtx()
        .userStories.find((i) => i.userId === userId);
      if (!existingUser) {
        return [401, { message: "User doesn't exist." }];
      }

      const [, blockId, quizId] =
        config?.url?.match(/blocks\/(.+)\/quiz\/(.+)\/complete/) || [];
      if (!blockId) {
        return [400, { message: "Block id should not be empty." }];
      }
      if (!quizId) {
        return [400, { message: "Quiz doesn't exist." }];
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

      if (!existingBlock.timeUnlocked) {
        return [
          403,
          {
            message: `Block '${existingBlock.block.name}' is locked.`,
          },
        ];
      }

      const quiz = mockContext
        .getCtx()
        .quizStates?.[blockId]?.quizStates?.find(
          (q) => q.id === Number(quizId)
        );
      if (!quiz) {
        return [400, { message: "Quiz could not be found." }];
      }
      if (!quiz.timeCompleted) {
        return [400, { message: "Quiz is not completed yet." }];
      }

      const storyOfTheBlock = existingUser.stories.find((s) =>
        s.buildingBlocksProgressItems.some((bp) => bp.id === existingBlock.id)
      );
      if (!storyOfTheBlock) throw Error("Something went wrong.");

      const blockProgressUnlockedItems: BuildingBlockProgress[] = [];
      existingBlock.block.dependentOnIds
        ?.map((id) =>
          storyOfTheBlock.buildingBlocksProgressItems.find(
            (i) => i.block.id === id
          )
        )
        .forEach((item) => {
          if (item) {
            blockProgressUnlockedItems.push(item);
          }
        });

      const data: QuizCompletedResponse = {
        epilogueProgressUnlocked: undefined, // todo: check for this one
        blockProgressUnlockedItems: blockProgressUnlockedItems,
        blockCompleted: existingBlock,
        blockCompletedStoryRefId: storyOfTheBlock.id,
      };

      wait();

      return [200, data];
    })
  );
