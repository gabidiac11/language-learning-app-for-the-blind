import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { Storage } from "@google-cloud/storage";

import path from "path";
import { ApiMessage } from "../../ApiSupport/appErrorMessage";
import allMessages from "./allMessages";
import { log } from "../../logger";

// see package json scripts

const keyFilename = path.resolve(
  __dirname,
  // NOTE: this is and it supposed to be outside of the repo
  `./../../../../../big-depth-387415-39dd12cba058.json`
);

const textToSpeechClient = new TextToSpeechClient({
  keyFilename: keyFilename,
});

const cloudStorageClient = new Storage({
  keyFilename: keyFilename,
});

async function createSpeech(apiMessage: ApiMessage): Promise<Buffer> {
  //text to audio buffer
  const request = {
    input: { text: apiMessage.text },
    voice: { languageCode: "en-US", ssmlGender: SsmlVoiceGender.MALE },
    audioConfig: { audioEncoding: AudioEncoding.MP3 },
  };

  const [response] = await textToSpeechClient.synthesizeSpeech(request);
  const { audioContent } = response;
  if (typeof audioContent === "string") {
    throw "audio type is string: " + audioContent;
  }

  // convert to buffer
  const ac = audioContent as Uint8Array;
  const buf = Buffer.alloc(ac.byteLength);
  const view = new Uint8Array(ac);
  for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
}

async function uploadFile(apiMessage: ApiMessage, buffer: Buffer) {
  const bucketName = "big-depth-387415.appspot.com";
  const fileName = apiMessage.filePath.replace("BASE_URL/", "");
  log(`Uploading file '${fileName}'...`);
  try {
    await cloudStorageClient.bucket(bucketName).file(fileName).save(buffer);
    log(`Uploaded file '${fileName}'...`);
  } catch (err) {
    log("Failed upload", err);
    log(`------------------ err ------------------`);
  }
}

(async () => {
  log(
    `Waiting for initialization of text to speech... using a beautiful timeout I know...`
  );
  setTimeout(async () => {
    for (const apiMessage of allMessages) {
      log(`Generating text to speech from ${apiMessage.uniqueName}`);
      let buffer: Buffer;
      try {
        buffer = await createSpeech(apiMessage);
      } catch (err) {
        log(`Text to speech failed`, err);
        log(`------------------ err ------------------`);
        continue;
      }

      await uploadFile(apiMessage, buffer);
    }
  }, 3000);
})();

enum AudioEncoding {
  AUDIO_ENCODING_UNSPECIFIED = 0,
  LINEAR16 = 1,
  MP3 = 2,
  OGG_OPUS = 3,
  MULAW = 5,
  ALAW = 6,
}

enum SsmlVoiceGender {
  SSML_VOICE_GENDER_UNSPECIFIED = 0,
  MALE = 1,
  FEMALE = 2,
  NEUTRAL = 3,
}
