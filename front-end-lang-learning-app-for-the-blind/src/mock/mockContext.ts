import { UserStory } from "../context";
import { BlockQuizStates, QuizState } from "../context/contextTypes/quizTypes";
import * as storyInitializer from "./dummyData/diverseDataInitialiser";

export type Context = {
  userStories: {
    userId: string;
    stories: UserStory[];
  }[];
  quizStates: {
    [buildingBlockId: string]: BlockQuizStates;
  };
};

class MockContext {
  static ctxKey = "app-mock-ctx";
  static ctxIdCounterKey = "app-mock-ctx-id-counter";

  static instance = new MockContext();

  private ctx = { userStories: [], quizStates: {} } as Context;
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

  public addAndGetInitializingUserAndStories(userId: string) {
    const stories = storyInitializer.generateDiverseStories();
    const record = { userId, stories };
    this.ctx.userStories.push(record);
    return record.stories;
  }

  public addQuizState(qs: QuizState) {
    const existingStates: BlockQuizStates = this.ctx.quizStates[
      qs.blockProgressId
    ] ?? {
      progressBlockId: qs.blockProgressId,
      quizStates: [],
    };
    existingStates.quizStates.push(qs);
    this.ctx.quizStates[qs.blockProgressId] = existingStates;
  }

  // WARNING: references are changing with the ctx, be sure to use this with care
  public SaveContext() {
    localStorage.setItem(MockContext.ctxKey, JSON.stringify(this.ctx));
    this.ctx = JSON.parse(localStorage.getItem(MockContext.ctxKey) ?? "");
  }

  private initLocalStorage() {
    if (!localStorage.getItem(MockContext.ctxKey)) {
      localStorage.setItem(MockContext.ctxKey, JSON.stringify(this.ctx));
    }
    this.ctx = JSON.parse(localStorage.getItem(MockContext.ctxKey) ?? "");
  }
}

const mockContext = MockContext.instance;
const genId = mockContext.genId;

export { mockContext, genId, MockContext };
