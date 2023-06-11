import { VoicePageHandler } from "../../context/contextTypes/ctxTypes";
import { AudioUserCommandType } from "../../context/contextTypes/voiceCommand.types";
import { commandLabels } from "./commandLabels";

// TODO: make sure each indication works:

export type InstructionItem = {
  label: string;
  phrases: string[];
};
const voicCommandPhrases: {
  [key in AudioUserCommandType]: string[];
} = {
  [AudioUserCommandType.AccessQuiz]: ["go to quiz", "navigate to quiz"],
  [AudioUserCommandType.DescribePage]: [
    "read me all the information from this page",
    "what can I do in this page",
  ],
  [AudioUserCommandType.ReadLanguages]: [
    "what languages can I learn?",
    "what languages are on this page?",
  ],
  [AudioUserCommandType.AcessLanguage]: [
    "take me to German",
    "I want to learn German",
  ],

  [AudioUserCommandType.Logout]: ["log out", "take me out of my account"],
  [AudioUserCommandType.NavigateBack]: ["go back", "navigate back"],
  [AudioUserCommandType.NavigateToBlock]: [
    "take me to the block family",
    "take me to the block epilogue",
  ],
  [AudioUserCommandType.RespondQuiz]: [
    "I choose the option 1",
    "my answer is happy",
  ],
  [AudioUserCommandType.GoToNextWord]: [
    "go to the next word",
    "read me the next word",
  ],
  [AudioUserCommandType.ReadAchievements]: [
    "what have I achieved",
    "what are the items unlocked",
    "what are the blocks unlocked",
  ],

  [AudioUserCommandType.Login]: ["log me in with google", "login"],

  [AudioUserCommandType.AcessLessonStory]: [
    "go to story family",
    "navigate to story places",
  ],
  [AudioUserCommandType.ReadWhatBlocks]: [
    "read me the names of the building blocks",
    "what building blocks has this story",
  ],

  [AudioUserCommandType.ReadLessonStories]: [
    "tell what stories I can learn",
    "read me what stories are here",
  ],
  [AudioUserCommandType.AccessWordsSummary]: [
    "take me to words summary",
    "I want to learn the words of this building block",
  ],
  [AudioUserCommandType.ReadThecurrentWord]: [
    "play the word again",
    "read me the current word",
  ],
  [AudioUserCommandType.EpilogueReadShortStory]: [
    "read me the short story",
    "I want to hear again the short story",
    " please play the audio with the short story",
  ],
  [AudioUserCommandType.CommandUnidentified]: [],
};
export class CommandInstructionSet {
  private _availableCommandTypes: AudioUserCommandType[] = [];
  private _instructionItems: InstructionItem[] = [];
  private _ariaLabel: string = "";

  constructor(availableCommandTypes: AudioUserCommandType[]) {
    this._availableCommandTypes = availableCommandTypes.filter(
      (type) => type !== AudioUserCommandType.CommandUnidentified
    );
    this.init();
  }
  private init() {
    this._instructionItems = this._availableCommandTypes
      .reverse()
      .sort((i1, i2) => {
        const describleables = [
          AudioUserCommandType.DescribePage,
          AudioUserCommandType.ReadLessonStories,
          AudioUserCommandType.ReadAchievements,
          AudioUserCommandType.ReadLanguages,
          AudioUserCommandType.ReadWhatBlocks,
          AudioUserCommandType.EpilogueReadShortStory,
        ];
        const isD1 = describleables.indexOf(i1) > -1;
        const isD2 = describleables.indexOf(i2) > -1;
        if (isD1 === isD2) return 0;
        if (isD1) return -1;
        return 1;
      })
      .map((type) => {
        const phrases = voicCommandPhrases[type];
        const label = commandLabels[type];
        return {
          label,
          phrases,
        };
      });

    const instructionsToText = this._instructionItems
      .map((instr, i) => {
        const phrasesTxt = instr.phrases.map((p) => `"${p}"`).join(",");
        return `Command ${i + 1} ${
          instr.label
        }, which can have phrases like ${phrasesTxt}`;
      })
      .join(". ");

    this._ariaLabel = `The available commands are the following. ${instructionsToText}`;
  }

  public getInstructionItems() {
    return this._instructionItems;
  }
  public getAriaLabel() {
    return this._ariaLabel;
  }
}

export function createCommandInstructionSet(
  voiceHandlers: VoicePageHandler[]
): CommandInstructionSet | undefined {
  if (!voiceHandlers?.[0]?.pageAvailableCommands.length) return undefined;
  const instance = new CommandInstructionSet(
    voiceHandlers[0].pageAvailableCommands
  );
  return instance;
}
