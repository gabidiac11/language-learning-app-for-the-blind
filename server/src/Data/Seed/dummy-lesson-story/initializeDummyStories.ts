import { Story } from "../../ctx.story.types";
import generateBuildingBlocks from "./buidingBlocks";
import generateEpilogue from "./epilogue";
import fs from "fs";
import path from "path";
import guardStories from "../storiesValidationGuard";
import { genUid } from "../../../utils";

/**
 * this script is a utility script to generate the story json used for seeding lessons
 */

async function generateDummyStory(): Promise<Story> {
  const buildingBlocks = await generateBuildingBlocks();
  const [epilogue, epilogueQuestionAnswers] = await generateEpilogue();
  const story: Story = {
    id: genUid(),
    order: 0,
    name: "My family",
    //TODO: add license info for all the free images - maybe use storage somewhere or see if is cool to reference them like this
    imageUrl:
      "https://images.pexels.com/photos/3807395/pexels-photo-3807395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    dependentOnIds: [],
    buildingBlocks,
    epilogue,
    epilogueQuestionAnswers,
  };
  return story;
}

async function generateClonedStories() {
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
  finishedStory.dependentOnIds = [
    startedStoryWithEpilogueStarted.id,
    startedStoryWithEpilogueUnlocked.id,
    startedStory.id,
    unlockStory.id,
  ];
  startedStoryWithEpilogueStarted.dependentOnIds = [lockedStory.id];

  return stories;
}

(async () => {
  console.log("Start generating stories.");
  const stories = await generateClonedStories();

  guardStories(stories);

  const filePath = path
    .join(__dirname, "../lesson-stories.demo.json")
    .replace("\\dist\\", "\\src\\");

  console.log(
    `Started writing DEMO stories-lessons to JSON file at ${filePath}`
  );
  fs.writeFileSync(filePath, JSON.stringify(stories, null, 2), { flag: "w" });

  console.log("Finsihed.");
})();
