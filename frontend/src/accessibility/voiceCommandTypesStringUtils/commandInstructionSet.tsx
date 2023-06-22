import { VoicePageHandler } from "../../context/contextTypes/ctxTypes";
import { AudioUserCommandType } from "../../context/contextTypes/voiceCommand.types";
import { commandLabels } from "./commandLabels";

export type InstructionItem = {
  label: string;
  phrases: string[];
};
const voicCommandPhrases: {
  [key in AudioUserCommandType]: string[];
} = {
  [AudioUserCommandType.AccessQuiz]: ["navigate to quiz", "go to the quiz",],
  [AudioUserCommandType.DescribePage]: [
    "describe this page",
    "read me all the information from this page",
    "what can I do in this page",
  ],
  [AudioUserCommandType.ReadLanguages]: [
    "what languages can I learn?",
    "what languages are on this page?",
  ],
  [AudioUserCommandType.AcessLanguage]: [
    "go to German",
    "take me to German",
    "I want to learn German",
  ],

  [AudioUserCommandType.Logout]: ["log out", "take me out of my account"],
  [AudioUserCommandType.NavigateBack]: ["go back", "navigate back"],
  [AudioUserCommandType.NavigateToBlock]: [
    "select block family",
    "I want to go to block family",
    "navigate to go to block epilogue",
  ],
  [AudioUserCommandType.RespondQuiz]: [
    "I choose the option 1",
    "my answer is option number 1",
    "my answer is a piece of cake",
  ],
  [AudioUserCommandType.GoToNextWord]: [
    "play the next word",
    "read the next word",
    "next word",
  ],
  [AudioUserCommandType.ReadAchievements]: [
    "what have I achieved",
    "what are the items unlocked",
    "what are the blocks unlocked",
  ],

  [AudioUserCommandType.Login]: ["log me in with google", "login"],

  [AudioUserCommandType.AcessLessonStory]: [
    "navigate to lesson story places",
    "go to lesson story family",
  ],
  [AudioUserCommandType.ReadWhatBlocks]: [
    "read me the names of the building blocks",
    "what building blocks has this story",
  ],

  [AudioUserCommandType.ReadLessonStories]: [
    "what stories can I learn",
    "what stories are here",
  ],
  [AudioUserCommandType.AccessWordsSummary]: [
    "take me to words summary",
    "navigate to words summary",
  ],
  [AudioUserCommandType.ReadThecurrentWord]: [
    "play the current word",
    "play the current word again",
    "read me the current word",
    "current word",
  ],
  [AudioUserCommandType.EpilogueReadShortStory]: [
    "read me the short story",
    "I want to hear again the short story",
    "please play the audio with the short story",
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
