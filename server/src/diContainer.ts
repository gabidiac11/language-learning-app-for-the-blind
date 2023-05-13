import { Injector } from "boxed-injector";
import { Authenticator } from "./ApiSupport/authentication";
import BlocksService from "./BusinessLogic/BlocksService";
import ProgressService from "./BusinessLogic/Progress/ProgressService";
import BlockQuizProgressServiceFactory from "./BusinessLogic/Quiz/BlockQuiz/BlockQuizService";
import UserStoryService from "./BusinessLogic/UserStory/UserStoryService";
import { UserStoriesRelationsManager } from "./BusinessLogic/UserStoryRelations/UserStoriesRelationsManager";
import BlockQuizControllerFactory from "./Controllers/BlockQuizController";
import BlocksControllerFactory from "./Controllers/BlocksController";
import UserStoriesControllerFactory from "./Controllers/UserStoriesController";
import { Database } from "./Data/database";
import Seeder from "./Data/Seed/Seeder";

const diContainer = new Injector();

// Data:
diContainer.factory(Database.name, Database);
diContainer.factory(Seeder.name, Seeder);

// Authentication services:
diContainer.factory(Authenticator.name, Authenticator);

// Business services:
diContainer.factory(
  UserStoriesRelationsManager.name,
  UserStoriesRelationsManager
);
diContainer.factory(UserStoryService.name, UserStoryService);
diContainer.factory(BlocksService.name, BlocksService);
diContainer.factory(BlockQuizProgressServiceFactory.name, BlockQuizProgressServiceFactory);
diContainer.factory(ProgressService.name, ProgressService);

// Controllers:
diContainer.factory(UserStoriesControllerFactory.name, UserStoriesControllerFactory);
diContainer.factory(BlocksControllerFactory.name, BlocksControllerFactory);
diContainer.factory(BlockQuizControllerFactory.name, BlockQuizControllerFactory);

export default diContainer;
