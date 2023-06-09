import { AudioUserCommand } from "./dialogFlowCommands"

export type UserAudioCommandResponse = {
    command: AudioUserCommand,
    userSpeechText: string;
}