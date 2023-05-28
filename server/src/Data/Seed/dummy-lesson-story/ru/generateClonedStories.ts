import { genUid } from "../../../../utils";
import { Story } from "../../../ctxTypes/ctx.story.types";
import guardStories from "../../storiesValidationGuard";
import generateBuildingBlocks from "./buidingBlocks";
import generateEpilogue from "./epilogue";

/**
 * this script is a utility script to generate the story json used for seeding lessons
 */

async function generateDummyStory(): Promise<Story> {
  const buildingBlocks = await generateBuildingBlocks();
  const [epilogue, epilogueQuestionAnswers] = await generateEpilogue();
  const story: Story = {
    id: genUid(),
    lang: "ru",
    order: 0,
    name: "My family",
    //TODO: add license info for all the free images - maybe use storage somewhere or see if is cool to reference them like this
    imageUrl:
      "https://images.pexels.com/photos/3807395/pexels-photo-3807395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    idsItemsDependentOnThis: [],
    isStarter: false,
    buildingBlocks,
    epilogue,
    epilogueQuestionAnswers,
  };
  return story;
}

export async function generateClonedStories() {
  const storiesCount = 6;
  const stories: Story[] = [];
  for (let i = 0; i < storiesCount; i++) {
    const storyItem = await generateDummyStory();
    storyItem.order = stories.length;
    stories.push(storyItem);
  }

  const [
    finishedStory,
    startedStoryWithEpilogueStarted,
    startedStoryWithEpilogueUnlocked,
    startedStory,
    unlockStory,
    lockedStory,
  ] = stories;

  finishedStory.isStarter = true;

  // ADD dependencies between stories
  finishedStory.idsItemsDependentOnThis = [
    startedStoryWithEpilogueStarted.id,
    startedStoryWithEpilogueUnlocked.id,
    startedStory.id,
    unlockStory.id,
  ];
  startedStoryWithEpilogueStarted.idsItemsDependentOnThis = [lockedStory.id];


  guardStories(stories);
  
  return stories;
}