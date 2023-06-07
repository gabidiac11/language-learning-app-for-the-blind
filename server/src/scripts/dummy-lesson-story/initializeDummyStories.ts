import { LessonJsonData, Story } from "../../Data/ctxTypes/ctx.story.types";
import fs from "fs";
import path from "path";
import * as ru from "./ru/generateClonedStories";
import * as fr from "./fr/generateClonedStories";
import { languages } from "../../Data/Seed/languages";
import { audioStorageBasePath } from "../../constants";
import { log } from "../../logger";
import { generateAudiosAndUploadForLessonStories } from "../utils/generateAudiosAndUploadForLessonStories";
import { addAudioFilePathsToStories } from "../utils/addAudioFilePathsToStories";
import { generateSpeechAndUploadDemoData } from "./generateSpeechAndUploadDemoData";

const baseAudioDemoStorageUrl = `${audioStorageBasePath}/lessons/stories/demo/lang`;

/**
 * see package json scripts
 */
(async () => {
  console.log("Start generating stories.");
  const ruStories = await ru.generateClonedStories();
  const frStories = await fr.generateClonedStories();
  const deStories = [];

  log(`Generated demo stories data.`);

  addAudioFilePathsToStories(
    [ruStories, frStories, deStories],
    baseAudioDemoStorageUrl
  );
  await generateSpeechAndUploadDemoData(
    [ruStories, frStories, deStories],
    audioStorageBasePath
  );

  const filePath = path
    .join(__dirname, "../../Data/Seed/lesson-stories.demo.json")
    .replace("\\dist\\", "\\src\\");

  console.log(
    `Started writing DEMO stories-lessons to JSON file at ${filePath}`
  );
  const lessonStoryData: LessonJsonData = {
    lessonData: {
      ru: ruStories,
      fr: frStories,
      de: deStories,
    },
    languages,
  };
  fs.writeFileSync(filePath, JSON.stringify(lessonStoryData, null, 2), {
    flag: "w",
  });

  console.log("Finsihed.");
})();
