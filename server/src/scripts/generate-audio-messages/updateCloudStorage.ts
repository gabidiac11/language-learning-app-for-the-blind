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

const filter = (appMessage: ApiMessage) => {
  // return appMessage.uniqueName === "noVoiceCommandsOnThisPage";
  return (
    ["langRussian", "langFrench", "langGerman"].indexOf(appMessage.uniqueName) >
    -1
  );
  // return true;
};

(async () => {
  for (const apiMessage of allMessages.filter(filter)) {
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
