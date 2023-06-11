import { Word } from "../../../../context";
import { PlayableMessage } from "../../../../accessibility/types/playableMessage.type";
import { genKey } from "../../../../constants";

export function createPlayableGroupFromWord(word: Word): PlayableMessage {
  return {
    key: `${genKey()}`,
    messages: [
      {
        filePath: word.audioFile,
        text: word.text,
        uniqueName: word.audioFile,
      },
      {
        filePath: word.audioFileTranslation,
        text: `${word.shortTranslation} - ${word.longTranslation}`,
        uniqueName: word.audioFileTranslation,
      },
    ],
  };
}
