import { ApiError, getStringifiedError } from "../ApiSupport/apiErrorHelpers";
import Result from "../ApiSupport/Result";
import {
  Epilogue,
  EpilogueQuestionAnswer,
} from "../Data/ctxTypes/ctx.story.types";
import {
  EpilogueProgress,
  UserStory,
} from "../Data/ctxTypes/ctx.userStory.types";
import { Database } from "../Data/database";
import { log } from "../logger";
import { convertUserStoriesResultToOutput } from "../Models/modelConvertors";
import { UserStoryOutput } from "../Models/output.userStory.types";
import { EpilogueQuestionAnswerObj } from "./bussinessModels";
import UserStoryService from "./UserStory/UserStoryService";
import { UserStoriesRelationsManager } from "./UserStoryRelations/UserStoriesRelationsManager";

export default class EpilogueService {
  public static inject = [Database.name, UserStoriesRelationsManager.name, UserStoryService.name];
  
  
  private _db: Database;
  private _userStoryRelationsManager: UserStoriesRelationsManager;
  private _userStoryService: UserStoryService;
  constructor(
    db: Database,
    userStoryRelationsManager: UserStoriesRelationsManager,
    userStoryService: UserStoryService
  ) {
    this._db = db;
    this._userStoryRelationsManager = userStoryRelationsManager;
    this._userStoryService = userStoryService;
  }

  public async getUserStoryId(
    userId: string,
    epilogueProgressId: string
  ): Promise<string> {
    const userStoryIdResult =
      await this._userStoryRelationsManager.getUserStoryIdFromEpilogueProgress(
        userId,
        epilogueProgressId
      );
    if (userStoryIdResult.isError()) {
      log(
        `[get-epilogue]: Error while getting userStoryId: ${getStringifiedError(
          userStoryIdResult.errors
        )}`
      );
      throw ApiError.Error<EpilogueProgress>("Something went wrong.", 500);
    }

    if (!userStoryIdResult.data) {
      throw ApiError.Error<EpilogueProgress>("Not found.", 404);
    }

    return userStoryIdResult.data;
  }

  public async getEpilogueWithGuard(
    userId: string,
    epilogueProgressId: string
  ): Promise<Result<EpilogueProgress>> {
    const userStoryId = await this.getUserStoryId(userId, epilogueProgressId);

    const epilogueProgressResult = await this._db.get_NotNull<EpilogueProgress>(
      `userStories/${userId}/${userStoryId}/epilogueProgress`
    );
    if (epilogueProgressResult.isError())
      return epilogueProgressResult.As<EpilogueProgress>();

    if (!epilogueProgressResult.data.timeUnlocked)
      return Result.Error<EpilogueProgress>(
        "Epilogue is locked. Please complete all building blocks to unlock the epilogue block.",
        400
      );

    const lessonStoryIdResult = await this._db.get_NotNull<string>(
      `userStories/${userId}/${userStoryId}/storyId`
    );
    if (lessonStoryIdResult.isError())
      return lessonStoryIdResult.As<EpilogueProgress>();

    const lessonStoryEpilogueResult = await this._db.get_NotNull<Epilogue>(
      `lessonStories/${lessonStoryIdResult.data}/epilogue`
    );
    if (lessonStoryEpilogueResult.isError())
      return lessonStoryEpilogueResult.As<EpilogueProgress>();

    this.fillInLessonEpilogoue(
      epilogueProgressResult.data,
      lessonStoryEpilogueResult.data
    );
    return epilogueProgressResult;
  }

  public async getShallowEpilogueWithValidation(
    userId: string,
    epilogueProgressId: string
  ): Promise<Result<EpilogueProgress>> {
    const userStoryId = await this.getUserStoryId(userId, epilogueProgressId);

    const epilogueProgressResult = await this._db.get_NotNull<EpilogueProgress>(
      `userStories/${userId}/${userStoryId}/epilogueProgress`
    );
    if (epilogueProgressResult.isError())
      return epilogueProgressResult.As<EpilogueProgress>();

    if (!epilogueProgressResult.data.timeUnlocked)
      return Result.Error<EpilogueProgress>(
        "Epilogue is locked. Please complete all building blocks to unlock the epilogue block.",
        403
      );
    return epilogueProgressResult;
  }

  public async getEpilogueAnswers(
    lessonStoryId
  ): Promise<EpilogueQuestionAnswerObj> {
    const path = `lessonStories/${lessonStoryId}/epilogueQuestionAnswers`;
    const answersResult = await this._db.get<EpilogueQuestionAnswer[]>(path);
    if (answersResult.isError()) {
      log(`Error occured while retrieving epilgoue answers at '${path}'`);
      throw answersResult.errors;
    }
    if (!answersResult.data) {
      throw `No records found while while retrieving epilgoue answers at '${path}'`;
    }

    const answers: EpilogueQuestionAnswerObj = answersResult.data.reduce(
      (obj, item) => ({ ...obj, [item.questionId]: item }),
      {}
    );
    return answers;
  }

  public async getDependentEpilogueData(
    userId: string,
    epilogueProgress: EpilogueProgress
  ): Promise<Result<UserStoryOutput[]>> {
    const userStoriesResult = await this._userStoryService.queryUserStories(userId);
    if(userStoriesResult.isError() || !userStoriesResult.data) {
      throw `Cannot find userStories at getDependentEpilogueData. Error: ${getStringifiedError(userStoriesResult.errors)}`;
    }

    const currentUserStory = userStoriesResult.data.find(i => i.id === epilogueProgress.userStoryId);
    if(!currentUserStory) {
      throw `Cannot find current userStory at getDependentEpilogueData. Error: ${getStringifiedError(userStoriesResult.data)}`;
    }
    
    const achievedUserStories = (currentUserStory.idsDependentOnThisUserStory ?? []).map(id => userStoriesResult.data.find(i => i.id === id));
    const output = convertUserStoriesResultToOutput(Result.Success(achievedUserStories));
    return output;
  }

  private fillInLessonEpilogoue(
    epilogueProgress: EpilogueProgress,
    epilogue: Epilogue
  ) {
    epilogueProgress.epilogue = epilogue;
    Object.values(epilogueProgress.questionProgressItems).forEach(
      (qProgress) => {
        qProgress.question = epilogue.questions.find(
          (item) => item.id === qProgress.questionId
        );
      }
    );
  }

  public async getEpilogueByStory(
    userId: string,
    userStoryId: string
  ): Promise<Result<EpilogueProgress>> { 
    const epilogueProgressResult = await this._db.get_NotNull<EpilogueProgress>(
      `userStories/${userId}/${userStoryId}/epilogueProgress`
    );
    if (epilogueProgressResult.isError())
      return epilogueProgressResult.As<EpilogueProgress>();

    const lessonStoryIdResult = await this._db.get_NotNull<string>(
      `userStories/${userId}/${userStoryId}/storyId`
    );
    if (lessonStoryIdResult.isError())
      return lessonStoryIdResult.As<EpilogueProgress>();

    const lessonStoryEpilogueResult = await this._db.get_NotNull<Epilogue>(
      `lessonStories/${lessonStoryIdResult.data}/epilogue`
    );
    if (lessonStoryEpilogueResult.isError())
      return lessonStoryEpilogueResult.As<EpilogueProgress>();

    this.fillInLessonEpilogoue(
      epilogueProgressResult.data,
      lessonStoryEpilogueResult.data
    );
    return epilogueProgressResult;
  }

  public async completeSummary(userId: string, epilogueProgressId: string) {
    const userStoryId = await this.getUserStoryId(userId, epilogueProgressId);
    const timeUnlocked = await this._db.get<number|undefined>(`userStories/${userId}/${userStoryId}/epilogueProgress/timeUnlocked`)
    if(!timeUnlocked.data) {
      throw ApiError.Error("Epilogue is locked. Please complete all building blocks first.");
    }
    await this._db.set<number>(Date.now(), `userStories/${userId}/${userStoryId}/epilogueProgress/timeSummaryCompleted`);
    await this._db.set<number>(Date.now(), `userStories/${userId}/${userStoryId}/epilogueProgress/timeStarted`);
  }
}
