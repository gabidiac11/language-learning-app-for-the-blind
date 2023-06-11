import { useCallback } from "react";
import { usePlayAppMessageFactory } from "../../audioSpeaker/hooks/usePlayAppMessageFactory";
import { generalAppMessages } from "../../staticAppMessages/generalAppMessages";
import { VoiceHandler } from "../VoiceHandler.types";
import {
  QuizOption,
  QuizResponse,
} from "../../../context/contextTypes/quizTypes";
import {
  AudioUserCommand,
  AudioUserCommandType,
  RespondQuizPaylod,
} from "../../../context/contextTypes/voiceCommand.types";

function matchWithCasing(
  command: RespondQuizPaylod,
  quizResponse: QuizResponse
): QuizOption | undefined {
  const answerOptionName = command.answerOptionName ?? "";
  const option = quizResponse.options.find(
    (i) => i.text.replace(" - ", " ").indexOf(answerOptionName) > -1
  );
  return option;
}

export function useHandleVoiceRespondQuiz(
  quizResponse: QuizResponse | undefined,
  choose: (option: QuizOption) => void
): VoiceHandler {
  const { playAppMessageAsync } = usePlayAppMessageFactory();

  const handle = useCallback(
    (command: AudioUserCommand) => {
      if (command.commandType !== AudioUserCommandType.RespondQuiz) {
        return false;
      }
      if (!quizResponse) {
        playAppMessageAsync(generalAppMessages.cantNavigateToNonExistentItem);
        return true;
      }
      const answerOptionName =
        command.answerOptionName?.toLocaleLowerCase() ?? "";
      const answerOptionNumber =
        command.answerOptionNumber ??
        (answerOptionName.endsWith("number for") ? 4 : undefined);

      if (answerOptionNumber) {
        const index = answerOptionNumber - 1;
        if (
          answerOptionNumber < 1 ||
          answerOptionNumber > quizResponse.options.length ||
          !quizResponse.options?.[index]
        ) {
          playAppMessageAsync(
            generalAppMessages.couldntMatchNumberToAvailableOptionsQuiz
          );
          return true;
        }

        choose(quizResponse.options[index]);
        return true;
      }

      if (!answerOptionName) {
        playAppMessageAsync(
          generalAppMessages.couldntMatchResponseToAvailableOptionsQuiz
        );
        return true;
      }

      const option =
        matchWithCasing(command, quizResponse) ??
        quizResponse.options.find(
          (i) =>
            i.text
              .toLocaleLowerCase()
              .replace(" - ", " ")
              .indexOf(answerOptionName) > -1
        );
      if (!option) {
        playAppMessageAsync(
          generalAppMessages.couldntMatchResponseToAvailableOptionsQuiz
        );
        return true;
      }

      choose(option);

      return true;
    },
    [quizResponse, choose]
  );

  return {
    handle,
    avaiableCommands: [AudioUserCommandType.RespondQuiz],
  };
}
