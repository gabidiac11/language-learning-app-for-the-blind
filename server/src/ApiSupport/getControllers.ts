import { Injector } from "boxed-injector";
import {
  BlockQuizController,
  BlockQuizControllerFactory,
} from "../Controllers/BlockQuizController";
import {
  BlocksController,
  BlocksControllerFactory,
} from "../Controllers/BlocksController";
import {
  EpilogueController,
  EpilogueControllerFactory,
} from "../Controllers/EpilogueController";
import {
  EpilogueQuizController,
  EpilogueQuizControllerFactory,
} from "../Controllers/EpilogueQuizController";
import {
  LessonLanguagesController,
  LessonLanguagesControllerFactory,
} from "../Controllers/LessonLanguagesController";
import {
  UserStoriesController,
  UserStoriesControllerFactory,
} from "../Controllers/UserStoriesController";

export default function getControllers(DI: Injector): {
  userStoriesController: UserStoriesController;
  blocksController: BlocksController;
  blockQuizController: BlockQuizController;
  epilogueController: EpilogueController;
  epilogueQuizController: EpilogueQuizController;
  lessonLanguagesController: LessonLanguagesController;
} {
  return {
    userStoriesController: (
      DI.get(UserStoriesControllerFactory.name) as UserStoriesControllerFactory
    ).create(),

    blocksController: (
      DI.get(BlocksControllerFactory.name) as BlocksControllerFactory
    ).create(),

    blockQuizController: (
      DI.get(BlockQuizControllerFactory.name) as BlockQuizControllerFactory
    ).create(),

    epilogueController: (
      DI.get(EpilogueControllerFactory.name) as EpilogueControllerFactory
    ).create(),

    epilogueQuizController: (
      DI.get(
        EpilogueQuizControllerFactory.name
      ) as EpilogueQuizControllerFactory
    ).create(),

    lessonLanguagesController: (
      DI.get(
        LessonLanguagesControllerFactory.name
      ) as LessonLanguagesControllerFactory
    ).create(),
  };
}
