import { useCallback } from "react";
import {
  AudioUserCommand,
  AudioUserCommandType,
} from "../../context/contextTypes/voiceCommand.types";
import { usePlayAppMessageFactory } from "../audioSpeaker/hooks/usePlayAppMessageFactory";
import { PlayableMessage } from "../types/playableMessage.type";
import { VoiceHandler } from "./VoiceHandler.types";

export type DescribePagePossibleCommands =
  | AudioUserCommandType.ReadLanguages
  | AudioUserCommandType.ReadWhatBlocks
  | AudioUserCommandType.ReadThecurrentWord
  | AudioUserCommandType.ReadAchievements
  | AudioUserCommandType.EpilogueReadShortStory
  | AudioUserCommandType.ReadLessonStories;

export type DescribePageVoiceHandlerProps = {
  playable: PlayableMessage;
  otherDescribables?: DescribePagePossibleCommands[];
};

export function useDescribePageVoiceHandler(
  props: DescribePageVoiceHandlerProps
): VoiceHandler {
  const { playMessagePlayableAsync } = usePlayAppMessageFactory();

  const handle = useCallback(
    (command: AudioUserCommand) => {
      if (
        command.commandType === AudioUserCommandType.DescribePage ||
        props.otherDescribables?.some((i) => i === command.commandType)
      ) {
        playMessagePlayableAsync(props.playable);
        return true;
      }
      return false;
    },
    [props.playable, props.otherDescribables]
  );
  return {
    handle,
    avaiableCommands: props.otherDescribables ?? [
      AudioUserCommandType.DescribePage,
    ]
  };
}
