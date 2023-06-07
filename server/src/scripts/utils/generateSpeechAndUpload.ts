import { Language } from "../../Data/ctxTypes/ctx.story.types";
import { log } from "../../logger";
import { createSpeech, uploadFile } from "./textToSpeechAndStorageUtils";

export async function generateSpeechAndUpload(
  path: string,
  text: string,
  lang?: Language
) {
  log(`Generating text to speech from ${text} in language ${lang ?? "en"}`);

  let buffer: Buffer;
  try {
    buffer = await createSpeech(text, lang);
  } catch (err) {
    log(`Text to speech failed`, err);
    log(`------------------ err ------------------`);
    throw err;
  }

  await uploadFile(path, buffer);
}

export function getMemoizable_generateSpeechAndUpload() {
  const pathsUploaded: { [path: string]: boolean } = {};

  return async (path: string, text: string, lang?: Language) => {
    if (pathsUploaded[path]) {
      log(`Skipped already uploaded path ${path}`);
      return;
    }
    await generateSpeechAndUpload(path, text, lang);
    pathsUploaded[path] = true;
  };
}
