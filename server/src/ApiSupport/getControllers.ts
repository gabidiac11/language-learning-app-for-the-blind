import { Injector } from "boxed-injector";
import BlockQuizControllerFactory from "../Controllers/BlockQuizController";
import BlocksControllerFactory from "../Controllers/BlocksController";
import EpilogueControllerFactory from "../Controllers/EpilogueController";
import UserStoriesControllerFactory from "../Controllers/UserStoriesController";

export default function getControllers(
  DI: Injector
): [
  UserStoriesControllerFactory,
  BlocksControllerFactory,
  BlockQuizControllerFactory,
  EpilogueControllerFactory
] {
  return [
    DI.get(UserStoriesControllerFactory.name) as UserStoriesControllerFactory,
    DI.get(BlocksControllerFactory.name) as BlocksControllerFactory,
    DI.get(BlockQuizControllerFactory.name) as BlockQuizControllerFactory,
    DI.get(EpilogueControllerFactory.name) as EpilogueControllerFactory,
  ];
}
