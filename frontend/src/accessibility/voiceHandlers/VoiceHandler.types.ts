import {
  AudioUserCommand, AudioUserCommandType,
} from "../../context/contextTypes/voiceCommand.types";

export type VoiceHandler = {
  handle: (command: AudioUserCommand) => boolean;
  avaiableCommands: AudioUserCommandType[];
  order?: number;
};
