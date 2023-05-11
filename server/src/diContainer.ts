import { Injector } from "boxed-injector";
import { Authenticator } from "./ApiSupport/authentication";
import BlocksService from "./BusinessLogic/BlocksService";
import UserStoryService from "./BusinessLogic/UserStory/UserStoryService";
import { UserStoriesRelationsManager } from "./BusinessLogic/UserStoryRelations/UserStoriesRelationsManager";
import BlocksController from "./Controllers/BlocksController";
import UserStoriesController from "./Controllers/UserStoriesController";
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

// Controllers:
diContainer.factory(UserStoriesController.name, UserStoriesController);
diContainer.factory(BlocksController.name, BlocksController);

export default diContainer;
