import { LessonJsonData } from "../../ctxTypes/ctx.story.types";
import fs from "fs";
import path from "path";
import * as ru from "./ru/generateClonedStories";
import * as fr from "./fr/generateClonedStories";

/**
 * this script is a utility script to generate the story json used for seeding lessons
 */
(async () => {
  console.log("Start generating stories.");
  const ruStories = await ru.generateClonedStories();
  const frStories = await fr.generateClonedStories();

  const filePath = path
    .join(__dirname, "../lesson-stories.demo.json")
    .replace("\\dist\\", "\\src\\");

  console.log(
    `Started writing DEMO stories-lessons to JSON file at ${filePath}`
  );
  const lessonStoryData: LessonJsonData = {
    lessonData: {
      ru: ruStories,
      fr: frStories,
      de: [],
    },
    languages: {
      ru: {
        id: "ru",
        name: "Russian",
        active: true,
        imageUrl:
          "https://images.pexels.com/photos/3810971/pexels-photo-3810971.jpeg",
        alt: "Russian church image.",
        order: 0,
      },
      fr: {
        id: "fr",
        name: "French",
        active: true,
        imageUrl:
          "https://images.pexels.com/photos/4983083/pexels-photo-4983083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        alt: "French Eiffel Tower and a flower by.",
        order: 1,
      },
      de: {
        id: "de",
        name: "German",
        active: true,
        imageUrl:
          // TODO: find smaller images
          "https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        alt: "German flag image.",
        order: 2,
      },
    },
  };
  fs.writeFileSync(filePath, JSON.stringify(lessonStoryData, null, 2), {
    flag: "w",
  });

  console.log("Finsihed.");
})();
