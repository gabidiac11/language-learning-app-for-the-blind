import { Injector } from "boxed-injector";
import {Authenticator} from "./ApiSupport/authentication";
import UserStoryService from "./BusinessLogic/UserStoryService";
import UserStoriesController from "./Controllers/UserStoriesController";
import { Database } from "./Data/database";
import Seeder from "./Data/Seed/Seeder";

const diContainer = new Injector();

diContainer.factory(Database.name, Database);
diContainer.factory(Seeder.name, Seeder);

diContainer.factory(Authenticator.name, Authenticator);
diContainer.factory(UserStoryService.name, UserStoryService);

diContainer.factory(UserStoriesController.name, UserStoriesController);

export default diContainer;
