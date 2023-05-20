import { ApiError, getStringifiedError } from "../ApiSupport/apiErrorHelpers";
import Result from "../ApiSupport/Result";
import { Epilogue } from "../Data/ctxTypes/ctx.story.types";
import { EpilogueProgress } from "../Data/ctxTypes/ctx.userStory.types";
import { Database } from "../Data/database";
import { log } from "../logger";
import { UserStoriesRelationsManager } from "./UserStoryRelations/UserStoriesRelationsManager";

export default class EpilogueService {
  private _db: Database;
  private _userStoryRelationsManager: UserStoriesRelationsManager;

  public static inject = [Database.name, UserStoriesRelationsManager.name];

  constructor(
    db: Database,
    userStoryRelationsManager: UserStoriesRelationsManager
  ) {
    this._db = db;
    this._userStoryRelationsManager = userStoryRelationsManager;
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

  public async getEpilogue(
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

  fillInLessonEpilogoue(
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
}
