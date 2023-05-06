import { EpilogueQuestionAnswer, UserStory } from "../context";
import {
  BlockQuizStates,
  EpilogueQuizStates,
  QuizBlockState,
  QuizEpilogueState,
} from "../context/contextTypes/quizTypes";
import * as storyInitializer from "./dummyData/diverseDataInitialiser";

export type Context = {
  userStories: {
    userId: string;
    stories: UserStory[];
  }[];
  blockQuizStates: {
    [buildingBlockId: string]: BlockQuizStates;
  };
  epilogueQuizStates: {
    [epilogueProgressId: string]: EpilogueQuizStates;
  };
  epilogueAnswers: EpilogueQuestionAnswer[];
};

class MockContext {
  static ctxKey = "app-mock-ctx";
  static ctxIdCounterKey = "app-mock-ctx-id-counter";

  static instance = new MockContext();

  private ctx = {
    userStories: [],
    epilogueQuizStates: {},
    blockQuizStates: {},
    epilogueAnswers: [],
  } as Context;

  private constructor() {
    this.initId();
    this.initLocalStorage();
  }

  private initId() {
    if (!localStorage.getItem(MockContext.ctxIdCounterKey)) {
      localStorage.setItem(MockContext.ctxIdCounterKey, "1");
    }
  }

  public genId() {
    const newId =
      (Number(localStorage.getItem(MockContext.ctxIdCounterKey)) ?? 0) + 1;
    localStorage.setItem(MockContext.ctxIdCounterKey, String(newId));
    return newId;
  }

  public getCtx() {
    return this.ctx;
  }

  // TODO: seed should be done after user creates the account, because this runs only on /stories GET
  public addAndGetInitializingUserAndStories(userId: string) {
    const [stories, epilogueAnswers] =
      storyInitializer.generateDiverseStories();

    const storiesRecord: {
      userId: string;
      stories: UserStory[];
    } = { userId, stories };
    this.ctx.userStories.push(storiesRecord);

    this.ctx.epilogueAnswers = epilogueAnswers;
    return storiesRecord.stories;
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
  public SaveContext() {
    localStorage_setItem(MockContext.ctxKey, JSON.stringify(this.ctx));
    this.ctx = JSON.parse(localStorage.getItem(MockContext.ctxKey) ?? "");
  }

  private initLocalStorage() {
    if (!localStorage.getItem(MockContext.ctxKey)) {
      localStorage_setItem(MockContext.ctxKey, JSON.stringify(this.ctx));
    }
    this.ctx = JSON.parse(localStorage.getItem(MockContext.ctxKey) ?? "");
  }
}

function localStorage_setItem(key: string, value: string) {
  localStorage.setItem(key, value);
  console.log("Save context", JSON.parse(localStorage.getItem(key) ?? ""));
}

const mockContext = MockContext.instance;
const genId = mockContext.genId;

export { mockContext, genId, MockContext };
