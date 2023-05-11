import { genUid } from "../../utils";
import { Context } from "../context.types";
import {
  QuizBlockState,
  BlockQuizStates,
  QuizEpilogueState,
  EpilogueQuizStates,
} from "../ctx.quiz.types";
import FileStorage from "./FileStorage";

class FileStorageContext {
  static ctxKey = "app-mock-ctx";
  static ctxIdCounterKey = "app-mock-ctx-id-counter";

  private ctx = {
    lessonStories: [],
    
    userStories: [],
    epilogueQuizStates: {},
    blockQuizStates: {},
    epilogueAnswers: [],
  } as Context;
  private _storage: FileStorage;

  private constructor(storage: FileStorage) {
    this._storage = storage;
    this.initializeFileStorage();
  }

  public getCtx() {
    return this.ctx;
  }

  // TODO: seed should be done after user creates the account, because this runs only on /stories GET
  public addAndGetInitializingUserAndStories(userId: string) {
    // const [stories, epilogueAnswers] =
    //   storyInitializer.generateDiverseStories();

    // const storiesRecord: {
    //   userId: string;
    //   stories: UserStory[];
    // } = { userId, stories };
    // this.ctx.userStories.push(storiesRecord);

    // this.ctx.epilogueAnswers = epilogueAnswers;
    // return storiesRecord.stories;
  }

  public addBlockQuizState(qs: QuizBlockState) {
    const existingStates: BlockQuizStates = this.ctx.blockQuizStates[
      qs.blockProgressId
    ] ?? {
      progressBlockId: qs.blockProgressId,
      quizStates: [],
    };
    existingStates.quizStates.push(qs);
    this.ctx.blockQuizStates[qs.blockProgressId] = existingStates;
  }

  public addEpilogueQuizState(qs: QuizEpilogueState) {
    const existingStates: EpilogueQuizStates = this.ctx.epilogueQuizStates[
      qs.epilogueProgressId
    ] ?? {
      progressBlockId: qs.epilogueProgressId,
      quizStates: [],
    };
    existingStates.quizStates.push(qs);
    this.ctx.epilogueQuizStates[qs.epilogueProgressId] = existingStates;
  }

  // WARNING: references are changing with the ctx, be sure to use this with care
  public async SaveContext() {
    this._storage.setContext(this.ctx);
    this.ctx = await this._storage.getContext();
  }

  private async initializeFileStorage() {
    const context = await this._storage.getContext();
    if (!context) {
      this._storage.setContext(this.ctx);
    }
    this.ctx = await this._storage.getContext();
  }
}

const genId = genUid;

export { genId, FileStorageContext };
