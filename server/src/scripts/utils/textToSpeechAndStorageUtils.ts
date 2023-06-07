import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { Storage } from "@google-cloud/storage";

import path from "path";
import { log } from "../../logger";
import { Language } from "../../Data/ctxTypes/ctx.story.types";
import fs from "fs";

const keyFilename = path.resolve(
  __dirname,
  // NOTE: this is and it supposed to be outside of the repo
  `./../../../../../big-depth-387415-39dd12cba058.json`
);

// Read the JSON credentials file as a buffer
const credentialsBuffer = fs.readFileSync(keyFilename, "utf-8");

const textToSpeechClient = new TextToSpeechClient({
  credentials: JSON.parse(credentialsBuffer),
});

const cloudStorageClient = new Storage({
  credentials: JSON.parse(credentialsBuffer),
});

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
const langToStandardLang: {
  [lang in Language]: string;
} = {
  ru: "ru-RU",
  fr: "fr-FR",
  de: "de-DE",
};

async function createSpeech(text: string, lang?: Language): Promise<Buffer> {
  //text to audio buffer
  const request = {
    input: { text: text },
    voice: {
      languageCode: !lang ? "en-US" : langToStandardLang[lang],
      ssmlGender: SsmlVoiceGender.MALE,
    },
    audioConfig: { audioEncoding: AudioEncoding.MP3 },
  };

  log(`Making request to text to speech for text '${text}'...`);

  const [response] = await textToSpeechClient.synthesizeSpeech(request);
  const { audioContent } = response;
  if (typeof audioContent === "string") {
    log(`Error result content is not Uint8Array, but string`);

    throw "audio type is string: " + audioContent;
  }

  log(`Generate Uint8Array - converting to buffer.`);
  // convert to buffer
  const ac = audioContent as Uint8Array;
  const buf = Buffer.alloc(ac.byteLength);
  const view = new Uint8Array(ac);
  for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  log(`Successful text to sppech.`);
  return buf;
}

async function uploadFile(filePath, buffer: Buffer) {
  const bucketName = "big-depth-387415.appspot.com";
  log(`Uploading file '${filePath}'...`);
  try {
    await cloudStorageClient.bucket(bucketName).file(filePath).save(buffer);
    log(`Uploaded.`);
  } catch (err) {
    log("Failed upload.", err);
    log(`------------------ err ------------------`);
  }
}

export { uploadFile, createSpeech };
