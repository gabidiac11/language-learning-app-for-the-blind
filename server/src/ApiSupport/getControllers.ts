import { Injector } from "boxed-injector";
import BlocksControllerFactory from "../Controllers/BlocksController";
import UserStoriesControllerFactory from "../Controllers/UserStoriesController";

export default function getControllers(
  DI: Injector
): [UserStoriesControllerFactory, BlocksControllerFactory] {
  return [
    DI.get(UserStoriesControllerFactory.name) as UserStoriesControllerFactory,
    DI.get(BlocksControllerFactory.name) as BlocksControllerFactory,
  ];
}
