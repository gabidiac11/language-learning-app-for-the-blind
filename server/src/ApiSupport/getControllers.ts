import { Injector } from "boxed-injector";
import BlockQuizControllerFactory from "../Controllers/BlockQuizController";
import BlocksControllerFactory from "../Controllers/BlocksController";
import EpilogueControllerFactory from "../Controllers/EpilogueController";
import EpilogueQuizControllerFactory from "../Controllers/EpilogueQuizController";
import UserStoriesControllerFactory from "../Controllers/UserStoriesController";

export default function getControllers(
  DI: Injector
): [
  UserStoriesControllerFactory,
  BlocksControllerFactory,
  BlockQuizControllerFactory,
  EpilogueControllerFactory,
  EpilogueQuizControllerFactory
] {
  return [
    DI.get(UserStoriesControllerFactory.name) as UserStoriesControllerFactory,
    DI.get(BlocksControllerFactory.name) as BlocksControllerFactory,
    DI.get(BlockQuizControllerFactory.name) as BlockQuizControllerFactory,
    DI.get(EpilogueControllerFactory.name) as EpilogueControllerFactory,
    DI.get(EpilogueQuizControllerFactory.name) as EpilogueQuizControllerFactory
  ];
}
