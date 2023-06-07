// see package json scripts

import { ApiMessage } from "../../ApiSupport/appErrorMessage";
import { log } from "../../logger";
import { createSpeech, uploadFile } from "../utils/textToSpeechAndStorageUtils";
import frontendMessages from "./frontendMessages";
import apiMessageClean from "./serverMessages";

const allMessages = [
  ...Object.values(frontendMessages),
  ...Object.values(apiMessageClean),
] as ApiMessage[];

(async () => {
  for (const apiMessage of allMessages) {
    log(`Generating text to speech from ${apiMessage.uniqueName}`);
    let buffer: Buffer;
    try {
      buffer = await createSpeech(apiMessage.text);
    } catch (err) {
      log(`Text to speech failed`, err);
      log(`------------------ err ------------------`);
      continue;
    }

    await uploadFile(apiMessage.filePath.replace("BASE_URL/", ""), buffer);
  }
})();
