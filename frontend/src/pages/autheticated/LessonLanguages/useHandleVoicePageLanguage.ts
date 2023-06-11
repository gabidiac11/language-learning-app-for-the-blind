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
import { LanguageDataItem } from "../../../context";
import {
  AudioUserCommand,
  AudioUserCommandType,
} from "../../../context/contextTypes/voiceCommand.types";
import { langPageMessages } from "./appMessages";
import { LanguageNavigateToStoriesState } from "./LanguageNavigateToStoriesState";

export const useHandleVoiceNavigateToLanguage = (
  languages: LanguageDataItem[] | undefined
): VoiceHandler => {
  const { playAppMessageAsync } = usePlayAppMessageFactory();
  const navigate = useNavigate();

  const handle = useCallback(
    (command: AudioUserCommand) => {
      if (command.commandType !== AudioUserCommandType.AcessLanguage) {
        return false;
      }

      if (!languages) {
        playAppMessageAsync(generalAppMessages.cantNavigateToNonExistentItem);
        return true;
      }

      const languageTexts = (command.language?.toLocaleLowerCase() ?? "").split(
        " "
      );
      const languageItem = languages.find((item) =>
        languageTexts.some(
          (text) => item.name.toLocaleLowerCase().indexOf(text) > -1
        )
      );
      if (!languageItem) {
        playAppMessageAsync(generalAppMessages.cantNavigateToNonExistentItem);
        return true;
      }
      const navigationState: LanguageNavigateToStoriesState = {
        lessonLanguage: languageItem,
      };
      navigate(`/stories/${languageItem.id}`, {
        state: navigationState,
      });
      return true;
    },
    [languages, playAppMessageAsync]
  );

  return {
    handle,
    avaiableCommands: [AudioUserCommandType.AcessLanguage],
  };
};

export const useHandleVoicePageLanguage = (
  languages: LanguageDataItem[] | undefined
) => {
  const [describlePageProps, setDescriblePageProps] =
    useState<DescribePageVoiceHandlerProps>({
      playable: createPlayable(langPageMessages.greetingPageLanguages),
      otherDescribables: [AudioUserCommandType.ReadLanguages],
    });

  const navigateToLangHander = useHandleVoiceNavigateToLanguage(languages);

  usePageVoiceCommands({
    describlePageProps,
    otherHandlers: [navigateToLangHander],
  });

  // set audio messages that will play when read items is requested:
  useEffect(() => {
    if (!languages) {
      return;
    }

    const appMessages: ApiMessage[] = languages.map((l) => ({
      uniqueName: genKey(),
      filePath: l.audioFile,
      text: l.name,
    }));
    const playable = createPlayable(appMessages);

    setDescriblePageProps({
      playable,
      otherDescribables: [AudioUserCommandType.ReadLanguages],
    });
  }, [languages]);
};
