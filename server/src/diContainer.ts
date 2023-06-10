import { Injector } from "boxed-injector";
import { Authenticator } from "./ApiSupport/authentication";
import BlocksService from "./BusinessLogic/BlocksService";
import EpilogueService from "./BusinessLogic/EpilogueService";
import { LanguageProvider } from "./BusinessLogic/LanguageProvider";
import ProgressService from "./BusinessLogic/Progress/ProgressService";
import { BlockQuizServiceFactory } from "./BusinessLogic/Quiz/QuizServiceFactories/BlockQuizServiceFactory";
import { EpilogueQuizServiceFactory } from "./BusinessLogic/Quiz/QuizServiceFactories/EpilogueQuizServiceFactory";
import UserStoryService from "./BusinessLogic/UserStory/UserStoryService";
import { UserStoriesRelationsManager } from "./BusinessLogic/UserStoryRelations/UserStoriesRelationsManager";
import { SpeechToTextService } from "./BusinessLogic/VoiceCommands/SpeechToTextService";
import { VoiceIntentService } from "./BusinessLogic/VoiceCommands/VoiceIntentService";
import { CloudCredentials } from "./Configuration/CloudCredentials";
import { DialogflowSessionString } from "./Configuration/DialogflowSessionString";
import { BlockQuizControllerFactory } from "./Controllers/BlockQuizController";
import { BlocksControllerFactory } from "./Controllers/BlocksController";
import { EpilogueControllerFactory } from "./Controllers/EpilogueController";
import { EpilogueQuizControllerFactory } from "./Controllers/EpilogueQuizController";
import { LessonLanguagesControllerFactory } from "./Controllers/LessonLanguagesController";
import { UserStoriesControllerFactory } from "./Controllers/UserStoriesController";
import { VoiceCommandsControllerFactory } from "./Controllers/VoiceCommandsController";
import { Language } from "./Data/ctxTypes/ctx.story.types";
import { Database } from "./Data/database";
import Seeder from "./Data/Seed/Seeder";


const createContainer = (lang?: Language | "") => {
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
  diContainer.factory(ProgressService.name, ProgressService);
  diContainer.factory(EpilogueService.name, EpilogueService);
  
  // Quiz services
  diContainer.factory(EpilogueQuizServiceFactory.name, EpilogueQuizServiceFactory);
  diContainer.factory(BlockQuizServiceFactory.name, BlockQuizServiceFactory);
  
  // Controllers:
  diContainer.factory(UserStoriesControllerFactory.name, UserStoriesControllerFactory);
  diContainer.factory(BlocksControllerFactory.name, BlocksControllerFactory);
  diContainer.factory(BlockQuizControllerFactory.name, BlockQuizControllerFactory);
  diContainer.factory(EpilogueControllerFactory.name, EpilogueControllerFactory);
  diContainer.factory(EpilogueQuizControllerFactory.name, EpilogueQuizControllerFactory);
  diContainer.factory(LessonLanguagesControllerFactory.name, LessonLanguagesControllerFactory);
  diContainer.factory(VoiceCommandsControllerFactory.name, VoiceCommandsControllerFactory);

  // Scoped dependency instance for user language
  diContainer.register(LanguageProvider.name, new LanguageProvider(lang));
  
  // Singleton services
  diContainer.register(VoiceIntentService.name, VoiceIntentService.getInstance());

  return diContainer;
}

export default createContainer;