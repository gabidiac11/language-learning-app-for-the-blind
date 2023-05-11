import { Injector } from "boxed-injector";
import BlocksController from "../Controllers/BlocksController";
import UserStoriesController from "../Controllers/UserStoriesController";

export default function getControllers(
  DI: Injector
): [UserStoriesController, BlocksController] {
  return [
    DI.get(UserStoriesController.name) as UserStoriesController,
    DI.get(BlocksController.name) as BlocksController,
  ];
}
