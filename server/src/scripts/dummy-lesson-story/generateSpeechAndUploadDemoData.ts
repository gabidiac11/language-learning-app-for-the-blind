import { Story } from "../../Data/ctxTypes/ctx.story.types";
import { log } from "../../logger";
import { generateAudiosAndUploadForLessonStories } from "../utils/generateAudiosAndUploadForLessonStories";

export async function generateSpeechAndUploadDemoData(
  storiesCollections: Story[][],
  audioStorageBasePath: string
) {
  log(``);
  log(`Demo stories tweeks and generation speech and upload...`);

  for (const storiesPerLang of storiesCollections) {
    useReusedPathsForDuplicatedStories(storiesPerLang);
  }

  await generateAudiosAndUploadForLessonStories(
    storiesCollections.flatMap((i) => i),
    audioStorageBasePath
  );

  log(`Finished - Demo stories tweeks and generation speech and upload...`);
  log(`............................`);
}

function useReusedPathsForDuplicatedStories(stories: Story[]) {
  if (!stories.length) {
    return;
  }
  const firstStory = stories[0];
  log(`First story ${firstStory.name}`);
  const restOfStories = stories.slice(1, stories.length);

  for (const story of restOfStories) {
    log(`Next story ${story.name}`);
    // NOTE: story audio name remains the same

    story.buildingBlocks.forEach((block, indexBlock) => {
      const firstStoryBlock = firstStory.buildingBlocks[indexBlock];
      // NOTE: block audio name remains the same

      block.words.forEach((word, indexWord) => {
        const firstStoryWord = firstStoryBlock.words[indexWord];

        word.audioFile = firstStoryWord.audioFile;
        word.audioFileTranslation = firstStoryWord.audioFileTranslation;
      });
    });

    story.epilogue.audioFile = firstStory.epilogue.audioFile;

    story.epilogue.questions.forEach((question, qIndex) => {
      const firstStoryQuestion = firstStory.epilogue.questions[qIndex];

      question.audioFile = firstStoryQuestion.audioFile;

      question.options.forEach((option, optionIndex) => {
        const firstStoryQuestionOption =
          firstStoryQuestion.options[optionIndex];

        option.audioFile = firstStoryQuestionOption.audioFile;
      });
    });
  }

  log(`Made the stories of language ${firstStory.lang} to reuse paths...`);
}
