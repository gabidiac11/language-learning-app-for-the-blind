import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createPlayable } from "../../../accessibility/audioSpeaker/createPlayable";
import { usePlayAppMessageFactory } from "../../../accessibility/audioSpeaker/hooks/usePlayAppMessageFactory";
import { generalAppMessages } from "../../../accessibility/staticAppMessages/generalAppMessages";
import { ApiMessage } from "../../../accessibility/types/apiMessage.type";
import { DescribePageVoiceHandlerProps } from "../../../accessibility/voiceHandlers/useDescribePageVoiceHandler";
import { usePageVoiceCommands } from "../../../accessibility/voiceHandlers/usePageVoiceCommands";
import { VoiceHandler } from "../../../accessibility/voiceHandlers/VoiceHandler.types";
import { genKey } from "../../../constants";
import { LanguageDataItem, UserStory } from "../../../context";
import {
  AudioUserCommand,
  AudioUserCommandType,
} from "../../../context/contextTypes/voiceCommand.types";
import { storiesOverviewPageMessages } from "./appMessages";
import { getMatchUsingNumber } from "../../../accessibility/voiceHandlers/getMatchUsingNumber";

type MatchNumbersItem = {
  number: number;
  item?: { id?: string; name?: string };
};

export const getNumOfMatchesWithInnerTexts = (
  items: { id: string; name: string }[],
  searchName: string
) => {
  const parts = searchName.split(" ");
  const max = items.reduce(
    (currMax: MatchNumbersItem, item) => {
      let number = 0;
      for (const part of parts) {
        if (item.name.indexOf(part) > -1) {
          number++;
        }
      }
      if (!currMax.item || number > currMax.number) {
        const newMax: MatchNumbersItem = { number, item };
        return newMax;
      }
      return currMax;
    },
    { number: 0 } as MatchNumbersItem
  );
  return max;
};

export const useHandleVoicePageStoriesOverview = (
  userStories: UserStory[] | undefined
): VoiceHandler => {
  const { playAppMessageAsync } = usePlayAppMessageFactory();
  const navigate = useNavigate();

  const handle = useCallback(
    (command: AudioUserCommand) => {
      if (command.commandType !== AudioUserCommandType.AcessLessonStory) {
        return false;
      }

      if (!userStories) {
        playAppMessageAsync(generalAppMessages.cantNavigateToNonExistentItem);
        return true;
      }

      const storyName = (command.storyName?.toLocaleLowerCase() ?? "").trim();
      const numOfMatches = getNumOfMatchesWithInnerTexts(
        userStories.map((i) => ({ id: i.id, name: i.name })),
        storyName
      );
      let item: UserStory | undefined;
      if (numOfMatches.number > 1) {
        item = userStories.find((i) => i.id === numOfMatches.item?.id);
        console.log(`Matched by parts ${item?.name}`);
      }

      if (item) {
        item = userStories.find(
          (userStory) =>
            userStory.name.toLocaleLowerCase().indexOf(storyName) > -1
        );
      }

      if (!item) {
        item = getMatchUsingNumber(userStories, storyName, command.number) as
          | UserStory
          | undefined;
      }

      if (!item) {
        playAppMessageAsync(generalAppMessages.cantNavigateToNonExistentItem);
        return true;
      }

      navigate(`/stories/${item.lang}/${item.id}`);
      return true;
    },
    [userStories, playAppMessageAsync]
  );

  return {
    handle,
    avaiableCommands: [AudioUserCommandType.AcessLessonStory],
  };
};

export const useHandleVoicePageLanguage = (
  userStories: UserStory[] | undefined
) => {
  const [describlePageProps, setDescriblePageProps] =
    useState<DescribePageVoiceHandlerProps>({
      playable: createPlayable(
        storiesOverviewPageMessages.greetingPageStoriesOverview
      ),
      otherDescribables: [AudioUserCommandType.ReadLessonStories],
    });

  const navigateToLangHander = useHandleVoicePageStoriesOverview(userStories);

  usePageVoiceCommands({
    describlePageProps,
    otherHandlers: [navigateToLangHander],
  });

  // set audio messages that will play when read items is requested:
  useEffect(() => {
    if (!userStories) {
      return;
    }

    const appMessages: ApiMessage[] = userStories.map((l) => ({
      uniqueName: genKey(),
      filePath: l.audioFile,
      text: l.name,
    }));
    const playable = createPlayable(appMessages);

    setDescriblePageProps({
      playable,
      otherDescribables: [AudioUserCommandType.ReadLessonStories],
    });
  }, [userStories]);
};
