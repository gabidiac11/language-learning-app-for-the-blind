import { Story } from "../../Data/ctxTypes/ctx.story.types";
import { log } from "../../logger";
import { getMemoizable_generateSpeechAndUpload } from "./generateSpeechAndUpload";

export const generateAudiosAndUploadForLessonStories = async (
  stories: Story[],
  rootStorageUrl
) => {
  const noRoot = (path: string) => path.replace(`${rootStorageUrl}/`, "");

  const generateSpeechAndUpload = getMemoizable_generateSpeechAndUpload();

  for (const story of stories) {
    log(`....................................................`);
    log(`Adding audio's and upload for story ${story.name}...`);

    await generateSpeechAndUpload(noRoot(story.audioFile), story.name);

    for (const block of story.buildingBlocks) {
      await generateSpeechAndUpload(noRoot(block.audioFile), block.name);

      for (const word of block.words) {
        await generateSpeechAndUpload(
          noRoot(word.audioFile),
          word.text,
          story.lang
        );
        await generateSpeechAndUpload(
          noRoot(word.audioFileTranslation),
          `${word.shortTranslation} - ${word.longTranslation}`
        );
      }
    }

    await generateSpeechAndUpload(
      noRoot(story.epilogue.audioFile),
      story.epilogue.textStoryTale,
      story.lang
    );

    for (const question of story.epilogue.questions) {
      await generateSpeechAndUpload(noRoot(question.audioFile), question.text);

      for (const option of question.options) {
        await generateSpeechAndUpload(noRoot(option.audioFile), option.text);
      }
    }
  }
};
