import { Database } from "../../Data/database";
import BlocksService from "../BlocksService";
import UserStoryService from "../UserStory/UserStoryService";
import { BlockCompleteEventHandler } from "./BlockCompleteEventHandler";

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

  public async setBlockComplete(userId: string, blockProgressId: string) {
    const handler = new BlockCompleteEventHandler(this._db, this._blocksService, this._userStoryService);
    await handler.setBlockComplete(userId, blockProgressId); 
  }

  //   public setEpilogueCompleted(epilogueProgressId: string) {
  //     const story = this._context
  //       .getCtx()
  //       .userStories.flatMap((us) => us.stories)
  //       .find((s) => s.epilogueProgress.id === epilogueProgressId);
  //     if (!story) throw Error("Something went wrong.");

  //     if (!story.epilogueProgress.timeCompleted) {
  //       story.epilogueProgress.timeCompleted = new Date().getTime();
  //       log(
  //         `Epilogue marked as complete for epilogue progress id: ${story.epilogueProgress.id}, story name: ${story.name}`
  //       );
  //     }

  //     log(
  //       `Starting story completion with propagation for epilogue progress id: ${story.epilogueProgress.id}, story name: ${story.name}`
  //     );
  //     // check if any dependent (locked!!!) stories -> unblock them
  //     const allUserStories = this._context
  //       .getCtx()
  //       .userStories.find((us) =>
  //         us.stories.some((s) => s.id === story.id)
  //       )?.stories;
  //     if (!allUserStories) throw Error("Something went wrong");

  //     story.dependentOnIds?.forEach((dependenceId) => {
  //       const dependentStory = allUserStories.find((i) => i.id === dependenceId);
  //       if (dependentStory && !dependentStory.timeUnlocked) {
  //         // unlock story
  //         dependentStory.timeUnlocked = new Date().getTime();

  //         // unlock starter building blocks
  //         dependentStory.buildingBlocksProgressItems.forEach((bp) => {
  //           if (bp.isStarter) {
  //             bp.timeUnlocked = new Date().getTime();
  //           }
  //         });

  //         log(
  //           `UNBLOCKED: story unlocked block id: ${dependentStory.id}, name: ${dependentStory.name}`
  //         );
  //       }
  //     });

  //     // save all
  //     this._context.SaveContext();
  //   }
}


