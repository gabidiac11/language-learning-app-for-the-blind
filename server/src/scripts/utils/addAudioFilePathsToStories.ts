import { Story } from "../../Data/ctxTypes/ctx.story.types";
import { log } from "../../logger";
import { getSafeName } from "./helpers";

export function addAudioFilePathsToStories(
  storiesCollections: Story[][],
  baseStorage: string
) {
  log(`Adding audio for stories[][]`);

  for (const stories of storiesCollections) {
    if (!stories.length) continue;

    const lang = stories[0].lang;

    log(`-----------------------------------------`);
    log(`Adding audio for stroies in lang ${lang}.`);

    for (let indexStory = 0; indexStory < stories.length; indexStory++) {
      const story = stories[indexStory];

      const storyFolderName = `story-${indexStory}-${getSafeName(story.name)}`;
      const storyFolderPath = `${baseStorage}/${lang}/${storyFolderName}`;

      story.audioFile = `${storyFolderPath}/${storyFolderName}.mp3`;
      log(`Assigned audio filePath ${story.audioFile}.`);

      story.buildingBlocks.forEach((block, indexBlock) => {
        const blockSafeName = getSafeName(block.name);
        const blockFolderName = `buildingBlock-${indexBlock}-${blockSafeName}`;
        const blockFolderPath = `${storyFolderPath}/${blockFolderName}`;

        block.audioFile = `${blockFolderPath}/${blockFolderName}.mp3`;
        log(`Assigned audio filePath ${block.audioFile}.`);

        block.words.forEach((word, indexWord) => {
          const wordSafeName = getSafeName(word.shortTranslation);
          word.audioFile = `${blockFolderPath}/word-${indexWord}-${wordSafeName}.mp3`;
          word.audioFileTranslation = `${blockFolderPath}/word-${indexWord}-${wordSafeName}-translation.mp3`;

          log(`Assigned audio filePath ${word.audioFile}.`);
          log(`Assigned audio filePath ${word.audioFileTranslation}.`);
        });
      });

      story.epilogue.audioFile = `${storyFolderPath}/epilogue/epilogue.mp3`;
      log(`Assigned audio filePath ${story.epilogue.audioFile}.`);
      story.epilogue.questions.forEach((question, qIndex) => {
        const safeQuestionName = getSafeName(question.text);
        question.audioFile = `${storyFolderPath}/epilogue/question-${qIndex}-${safeQuestionName}.mp3`;

        log(`Assigned audio filePath ${question.audioFile}.`);

        question.options.forEach((option, optionIndex) => {
          const safeOptionName = getSafeName(option.text);
          option.audioFile = `${storyFolderPath}/epilogue/question-${qIndex}-${safeQuestionName}/option-${optionIndex}-${safeOptionName}.mp3`;

          log(`Assigned audio filePath ${option.audioFile}.`);
        });
      });
    }
  }

  log(`Finished adding audio paths.`);
  log(`............................`);
}
