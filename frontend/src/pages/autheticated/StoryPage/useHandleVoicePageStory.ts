import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createPlayable } from "../../../accessibility/audioSpeaker/createPlayable";
import { usePlayAppMessageFactory } from "../../../accessibility/audioSpeaker/hooks/usePlayAppMessageFactory";
import { generalAppMessages } from "../../../accessibility/staticAppMessages/generalAppMessages";
import { ApiMessage } from "../../../accessibility/types/apiMessage.type";
import { getMatchUsingNumber } from "../../../accessibility/voiceHandlers/getMatchUsingNumber";
import { DescribePageVoiceHandlerProps } from "../../../accessibility/voiceHandlers/useDescribePageVoiceHandler";
import { usePageVoiceCommands } from "../../../accessibility/voiceHandlers/usePageVoiceCommands";
import { VoiceHandler } from "../../../accessibility/voiceHandlers/VoiceHandler.types";
import { genKey } from "../../../constants";
import { BuildingBlock, UserStory } from "../../../context";
import {
  AudioUserCommand,
  AudioUserCommandType,
} from "../../../context/contextTypes/voiceCommand.types";
import { storyPageMessages } from "./appMessages";

export const useHandleVoicePageNavigateToItem = (
  userStory: UserStory | undefined
): VoiceHandler => {
  const { playAppMessageAsync } = usePlayAppMessageFactory();
  const navigate = useNavigate();

  const handle = useCallback(
    (command: AudioUserCommand) => {
      if (command.commandType !== AudioUserCommandType.NavigateToBlock) {
        return false;
      }

      if (!userStory) {
        playAppMessageAsync(generalAppMessages.cantNavigateToNonExistentItem);
        return true;
      }

      const itemName = (
        command.buildingBlockOrEpilogueName?.toLocaleLowerCase() ?? ""
      ).trim();

      let item =
        itemName === "epilogue"
          ? userStory.epilogueProgress
          : userStory.buildingBlocksProgressItems.find(
              (item) =>
                item.block.name.toLocaleLowerCase().indexOf(itemName) > -1
            );
      if (!item) {
        const match = getMatchUsingNumber(
          userStory.buildingBlocksProgressItems.map((i) => ({
            id: i.id,
            name: i.block.name,
          })),
          itemName,
          command.number
        ) as BuildingBlock | undefined;

        item = userStory.buildingBlocksProgressItems.find(
          (i) => i.id === match?.id
        );
      }

      if (!item) {
        playAppMessageAsync(generalAppMessages.cantNavigateToNonExistentItem);
        return true;
      }
      
      if(!item.timeUnlocked && itemName === "epilogue") {
        playAppMessageAsync(generalAppMessages.epilogueLockedFrontend);
        return true;
      }
      if(!item.timeUnlocked) {
        playAppMessageAsync(generalAppMessages.cantOpenALockedItem);
        return true;
      }

      if (itemName === "epilogue") {
        navigate(`/epilogues/${item.lang}/${item.id}`);
      } else {
        navigate(`/blocks/${item.lang}/${item.id}`);
      }
      return true;
    },
    [userStory, playAppMessageAsync]
  );

  return {
    handle,
    avaiableCommands: [AudioUserCommandType.NavigateToBlock],
  };
};

export const useHandleVoicePageLanguage = (
  userStory: UserStory | undefined
) => {
  const [describlePageProps, setDescriblePageProps] =
    useState<DescribePageVoiceHandlerProps>({
      playable: createPlayable(storyPageMessages.greetingPageStoryPage),
      otherDescribables: [AudioUserCommandType.ReadWhatBlocks],
    });

  const navigateToLangHander = useHandleVoicePageNavigateToItem(userStory);

  usePageVoiceCommands({
    describlePageProps,
    otherHandlers: [navigateToLangHander],
  });

  // set audio messages that will play when read items is requested:
  useEffect(() => {
    if (!userStory) {
      return;
    }

    const appMessages: ApiMessage[] = userStory.buildingBlocksProgressItems.map(
      (l) => ({
        uniqueName: genKey(),
        filePath: l.block.audioFile,
        text: l.block.name,
      })
    );
    const playable = createPlayable(appMessages);

    setDescriblePageProps({
      playable,
      otherDescribables: [AudioUserCommandType.ReadWhatBlocks],
    });
  }, [userStory]);
};
