import { BuildingBlockProgress } from "../../../context";

import { getShuffledArray } from "../../../utils";
import { genId, MockContext, mockContext } from "../../mockContext";
import { log } from "../mockEndpointHelpers";

class ProgressService {
  private _context: MockContext;

  public constructor() {
    this._context = mockContext;
  }

  public setBlockComplete(blockProgressId: number) {
    const story = this._context
      .getCtx()
      .userStories.flatMap((us) => us.stories)
      .find((s) =>
        s.buildingBlocksProgressItems.some((i) => i.id === blockProgressId)
      );
    if (!story) throw Error("Something went wrong.");

    const blockProgress = story.buildingBlocksProgressItems.find(
      (bp) => bp.id === blockProgressId
    );
    if (!blockProgress) throw Error("Something went wrong.");

    // we'll do completion propagation every time, even if the block was completed
    if(!blockProgress.timeCompleted) {
        blockProgress.timeCompleted = new Date().getTime();
        log(`Block marked as complete for block progress id: ${blockProgress.id}, name: ${blockProgress.block.name}`);
    }

    log(`Starting block completion propagation block progress id: ${blockProgress.id}, name: ${blockProgress.block.name}`);

    // check if any dependent (locked!!!) stories -> unblock them
    blockProgress.block.dependentOnIds?.forEach(id => {
       const dependentBp = story.buildingBlocksProgressItems.find(i => i.block.id === id); 
       if(dependentBp && !dependentBp.timeUnlocked) {
           dependentBp.timeUnlocked = new Date().getTime();
           log(`UNBLOCKED: block unlocked block id: ${dependentBp.id}, name: ${dependentBp.block.name}`);
       }
    });
    
    // check if all blocks are done -> unblock epilogue
    const allComplete = story.buildingBlocksProgressItems.every(bp => !!bp.timeCompleted);
    if(allComplete) {
        story.epilogueProgress.timeUnlocked = new Date().getTime();
        log(`Story with all blocks completed at id: ${story.id}, name: ${story.name} -> unblock epilogue`);
    }

    // save all
    this._context.SaveContext();
  }
}

export default ProgressService;
