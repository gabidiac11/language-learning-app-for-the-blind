import { getStringifiedError } from "../../ApiSupport/apiErrorHelpers";
import { EpilogueProgress, UserStory } from "../../Data/ctxTypes/ctx.userStory.types";
import { Database } from "../../Data/database";
import { log } from "../../logger";
import UserStoryService from "../UserStory/UserStoryService";

export class EpilogueCompletedEventHandler {
    private _db: Database;
    private _userStoryService: UserStoryService;
  
    public constructor(
      db: Database,
      userStoryService: UserStoryService
    ) {
      this._db = db;
      this._userStoryService = userStoryService;
    }

    public async handle(userId: string, userStoryId: string) { 
        log(`Starting propagating event epilogue completed at 'userId:${userId}/userStoryId:${userStoryId}'`);

        const userStoriesResult = await this._userStoryService.queryUserStories(userId);
        if(userStoriesResult.isError() || !userStoriesResult.data) {
          throw `Cannot find userStories at getDependentEpilogueData. Error: ${getStringifiedError(userStoriesResult.errors)}`;
        }

        await this.markCompletedUserStory(userId, userStoryId);
        await this.unlockDependentUserStories(userId, userStoryId, userStoriesResult.data);
    }

    private async markCompletedUserStory(userId: string, userStoryId: string) {
        const path = `userStories/${userId}/${userStoryId}/timeCompleted`;
        await this._db.set<number>(Date.now(), path);
        log(`Set story completed. Set completed at path ${path}`);

        const pathEpilogue = `userStories/${userId}/${userStoryId}/epilogueProgress/timeCompleted`;
        await this._db.set<number>(Date.now(), pathEpilogue);
        log(`Set epilogue completed. Set completed at path ${pathEpilogue}`);
    }
    
    private async unlockDependentUserStories(userId: string, userStoryId: string, userStories: UserStory[]) {
        const updates: {[path: string]: number} = {};
        const currentUserStory = userStories.find(i => i.id === userStoryId);
        if(!currentUserStory) {
          throw `Cannot find current userStory at unlockDependentUserStories. Error: ${getStringifiedError(userStories)}`;
        }
        
        const achievedUserStories = (currentUserStory.idsDependentOnThisUserStory ?? []).map(id => {
            const r = userStories.find(i => i.id === id);
            if(!r) {
                throw `Could not find userStory with id ${id}, dependent from user story id ${userStoryId}.`
            }
            return r;
        });

        achievedUserStories.forEach(achievedStory => {
            if(!achievedStory.timeUnlocked) {
                updates[`userStories/${userId}/${achievedStory.id}/timeUnlocked`] = Date.now();
                Object.values(achievedStory.buildingBlocksProgressItems).forEach(bp => {
                    if(bp.isStarter) {
                        updates[`userStories/${userId}/${achievedStory.id}/buildingBlocksProgressItems/${bp.id}/timeUnlocked`] = Date.now();
                    }
                });
            }
        });

        log(`Found updates for unlocking stories: ${JSON.stringify(updates)}. Starting updating...`);
        for(const [path, value] of Object.entries(updates)) {
            await this._db.set<number>(value, path);
            log(`Updated at path:${path} with value: ${value}`);
        }
    }
}