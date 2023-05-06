import { Injector } from "boxed-injector";
import Authenticator from "./BusinessLogic/Quiz/AuthenticatorMiddleware";
import StoriesController from "./Controllers/StoriesController";
import { Database } from "./Data/database";
import Seeder from "./Data/Seed/Seeder";

const diContainer = new Injector();

diContainer.factory(Database.name, Database);
diContainer.factory(Seeder.name, Seeder);

diContainer.factory(Authenticator.name, Authenticator);
diContainer.factory(StoriesController.name, StoriesController);

export default diContainer;
