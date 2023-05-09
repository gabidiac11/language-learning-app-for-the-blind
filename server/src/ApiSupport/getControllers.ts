import { Injector } from "boxed-injector";
import UserStoriesController from "../Controllers/UserStoriesController";

export default function getControllers(DI: Injector): [UserStoriesController] {
  return [DI.get(UserStoriesController.name) as UserStoriesController];
}
