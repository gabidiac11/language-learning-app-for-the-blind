import { QuizEntityName } from "../../Data/ctxTypes/ctx.quiz.shared.types";
import { Database } from "../../Data/database";
import BlocksService from "../BlocksService";
import { QuizableItem } from "../Quiz/QuizableItem";
import UserStoryService from "../UserStory/UserStoryService";
import { BlockCompletedEventHandler } from "./BlockCompletedEventHandler";
import { EpilogueCompletedEventHandler } from "./EpilogueCompletedEventHandler";

export default class ProgressService {
  public static inject = [
    Database.name,
    BlocksService.name,
    UserStoryService.name,
  ];
  private _db: Database;
  private _blocksService: BlocksService;
  private _userStoryService: UserStoryService;
  public constructor(
    db: Database,
    blocksService: BlocksService,
    userStoryService: UserStoryService
  ) {
    this._db = db;
    this._blocksService = blocksService;
    this._userStoryService = userStoryService;
  }

  public async handleQuizCompletionEvent(quizableItem: QuizableItem) {
    if (quizableItem.entity === QuizEntityName.blockProgress) {
      const handler = new BlockCompletedEventHandler(
        this._db,
        this._blocksService,
        this._userStoryService
      );
      await handler.handle(quizableItem.userId, quizableItem.entityId);
      return;
    }
    if (quizableItem.entity === QuizEntityName.epilogueProgress) {
      const handleer = new EpilogueCompletedEventHandler(
        this._db,
        this._userStoryService
      );
      await handleer.handle(quizableItem.userId, quizableItem.userStoryId);
      return;
    }
  }

  // TODO: implement this:
  public async handleBlockWasStartedEvent() {}
}
