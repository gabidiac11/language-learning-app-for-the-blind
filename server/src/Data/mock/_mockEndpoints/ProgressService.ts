// import { MockContext, mockContext } from "../mockContext";
// import { log } from "./mockEndpointHelpers";

// class ProgressService {
//   private _context: MockContext;

//   public constructor() {
//     this._context = mockContext;
//   }

//   public setBlockComplete(blockProgressId: number) {
//     const story = this._context
//       .getCtx()
//       .userStories.flatMap((us) => us.stories)
//       .find((s) =>
//         s.buildingBlocksProgressItems.some((i) => i.id === blockProgressId)
//       );
//     if (!story) throw Error("Something went wrong.");

//     const blockProgress = story.buildingBlocksProgressItems.find(
//       (bp) => bp.id === blockProgressId
//     );
//     if (!blockProgress) throw Error("Something went wrong.");

//     // we'll do completion propagation every time, even if the block was completed
//     if (!blockProgress.timeCompleted) {
//       blockProgress.timeCompleted = new Date().getTime();
//       log(
//         `Block marked as complete for block progress id: ${blockProgress.id}, name: ${blockProgress.block.name}`
//       );
//     }

//     log(
//       `Starting block completion propagation block progress id: ${blockProgress.id}, name: ${blockProgress.block.name}`
//     );

//     // check if any dependent (locked!!!) stories -> unblock them
//     blockProgress.block.dependentOnIds?.forEach((id) => {
//       const dependentBp = story.buildingBlocksProgressItems.find(
//         (i) => i.block.id === id
//       );
//       if (dependentBp && !dependentBp.timeUnlocked) {
//         dependentBp.timeUnlocked = new Date().getTime();
//         log(
//           `UNBLOCKED: block unlocked block id: ${dependentBp.id}, name: ${dependentBp.block.name}`
//         );
//       }
//     });

//     // check if all blocks are done -> unblock epilogue
//     const allComplete = story.buildingBlocksProgressItems.every(
//       (bp) => !!bp.timeCompleted
//     );
//     if (allComplete) {
//       story.epilogueProgress.timeUnlocked = new Date().getTime();
//       log(
//         `Story with all blocks completed at id: ${story.id}, name: ${story.name} -> unblock epilogue`
//       );
//     }

//     // update stats:
//     story.numOfBlocksCompleted = story.buildingBlocksProgressItems.filter(
//       (bp) => !!bp.timeCompleted
//     ).length;

//     // save all
//     this._context.SaveContext();
//   }

//   public setEpilogueCompleted(epilogueProgressId: number) {
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
// }

// export default ProgressService;
