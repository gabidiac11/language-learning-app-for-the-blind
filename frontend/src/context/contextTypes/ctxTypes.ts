import { PlayableMessage } from "../../accessibility/playableMessage";

export type StateType = {
  language?: Language;
  playableAudiosQueue: PlayableMessage[];
  isAudioInteractionOn: boolean;
};

export enum StateActionType {
  Init = "Init",
  SetLanguage = "SetLanguage",
  EnqueuePlayableMessage = "EnqueuePlayableMessage",
  PrematurelyStopPlayableMessages = "PrematurelyStopPlayableMessages",
  DequePlayableMessages = "DequePlayableMessages",
  SetIsAudioInteractionOn = "SetIsAudioInteractionOn",
  SingleEnquePlayableMessages = "SingleEnquePlayableMessages",
}

export type StateAction =
  | {
      type: StateActionType.Init;
    }
  | {
      type: StateActionType.SetLanguage;
      payload?: Language;
    }
  | {
      type: StateActionType.EnqueuePlayableMessage;
      payload: PlayableMessage;
    }
  | {
      type: StateActionType.SingleEnquePlayableMessages;
      payload: PlayableMessage;
    }
  | {
      type: StateActionType.PrematurelyStopPlayableMessages;
      payload: {
        playableKeys: string[];
      };
    }
  | {
      type: StateActionType.DequePlayableMessages;
      payload: {
        playableKey: string;
      };
    }
  | {
      type: StateActionType.SetIsAudioInteractionOn;
      payload: boolean;
    };

export type Language = "ru" | "fr" | "de";

export type UserStory = {
  id: string;

  lang: Language;

  audioFile: string;

  // the name is a domain; it describes a big ontology which comprises smaller ontologies
  // each building block of a story is a smaller ontology which is related to the big ontology of the story
  // Obs: each building block (as you will see by reading further) has bunch of words in Russian related with the building-block's associated ontology
  name: string;

  description?: string;

  isDependentOnNames?: string[];

  imageUrl: string;
  imageAlt: string;

  buildingBlocksProgressItems: BuildingBlockProgress[];
  epilogueProgress: EpilogueProgress;
  numOfBlocksCompleted: number;
  numOfTotalBlocks: number;

  timeUnlocked?: number;
  timeStarted?: number;
  timeCompleted?: number;
};

//building block:
export type BuildingBlockProgress = {
  id: string;

  lang: Language;

  isStarter?: boolean;

  isDependentOnNames?: string[];

  // a building block is completed if a quiz state associated is completed
  timeUnlocked?: number;
  timeStarted?: number;
  timeCompleted?: number;

  timeSummaryCompleted?: number;

  wordProgressItems: WordProgress[];
  block: BuildingBlock;
};

export type WordProgress = {
  id: string;
  word: Word;
  lang: Language;
};

export type BuildingBlock = {
  id: string;
  name: string;

  audioFile: string;

  lang: Language;

  imageUrl: string;
  imageAlt: string;

  // blockDependentOnIds have all ids of the blocks from current story that need to be completed for this block to be available for the user to start
  idsItemsDependentOnThis?: string[];

  // the words needs to be part of the ontology associated with the building block
  // the words are in Russian
  words: Word[];
};

export type Word = {
  id: string;

  lang: Language;

  // the text is the actual word in Russian
  text: string;

  audioFile: string;
  audioFileTranslation: string;

  // short translation is in English and has at least 1, and at most 1 to 3 words between comma
  shortTranslation: string;

  // long translation is in English and has a detailed explanation with some examples of usage
  longTranslation: string;
};

// epilogue:
export type Epilogue = {
  id: string;

  lang: Language;

  // the name of the story tale; short and descriptive - needs to be a word from the building blocks completed from the current and the previous stories
  name: string;

  audioFile: string;

  // a short story tale that have only words from the current blocks; each block has a set of words grouped by ontology
  // this short story must use only the words from the building blocks belonging to this story and the stories completed to far
  // so if a story is dependent on a list of stories which I'll name "L". This story tale should be formed with words from the words associated with all the stories previously completed
  // L - has all the stories that the current story is dependent on
  // Attention: it needs to make sure to include almost all the words from the current story, and prefere those words
  textStoryTale: string;

  // the questions asked are about what is happening in the story tale
  questions: EpilogueQuestion[];

  imageUrl: string;
  imageAlt: string;
};

export type EpilogueProgress = {
  id: string;

  lang: Language;

  epilogue: Epilogue;
  questionProgressItems: EpilogueQuestionProgress[];
  timeSummaryCompleted?: number;
  timeUnlocked?: number;
  timeStarted?: number;
  timeCompleted?: number;
};

export type EpilogueQuestionProgress = {
  id: string;
  question: EpilogueQuestion;
  lang: Language;
};

export type EpilogueQuestion = {
  id: string;

  lang: Language;

  // the questions are asked in English and the options are in English
  // the questions asked are about what is happening in the story tale
  text: string;
  options: EpilogueOption[];
};

export type EpilogueOption = {
  id: string;
  text: string;
  lang: Language;
};

export type LanguageDataItem = {
  id: string;
  name: string;
  active: boolean;
  imageUrl: string;
  alt: string;
  order: number;
};
