import {
  QuizOption,
  QuizQuestion,
  RoundOutcome,
} from "../../../Data/ctxTypes/ctx.quiz.shared.types";
import {
  QuizBlockState,
  WordOutcome,
} from "../../../Data/ctxTypes/ctx.quizl.block.types";
import {
  BuildingBlockProgress,
  WordProgress,
} from "../../../Data/ctxTypes/ctx.userStory.types";
import { getShuffledArray, genUid, valuesOrdered } from "../../../utils";

export class QuizBlockStateCreator {
  private _blockProgress: BuildingBlockProgress;
  public constructor(blockProgress: BuildingBlockProgress) {
    this._blockProgress = blockProgress;
  }

  public createQuizState(): QuizBlockState {
    const wordProgressItems = valuesOrdered(this._blockProgress.wordProgressItems);
    const wordOutcomes =  wordProgressItems.map(
      (wp) => {
        const o = this.generateWordOutcomeQuestion(wp, RoundOutcome.Unset);
        o.prababilityInclusion = 1;
        return o;
      }
    );

    const qs: QuizBlockState = {
      id: genUid(),
      timestamp: Date.now(),
      
      blockProgressId: this._blockProgress.id,
      userStoryId: this._blockProgress.userStoryId,

      wordOutcomes,
      timeCompleted: undefined,
    };
    return qs;
  }

  public generateQuestion(correctWord: WordProgress): QuizQuestion {
    const correctOption = this.convertToOption(correctWord);

    const wrongWords: WordProgress[] = getShuffledArray(
      Object.values(this._blockProgress.wordProgressItems).filter(
        (w) => w.id !== correctWord.id
      )
    ).slice(0, 3);
    const wrongOptions = wrongWords.map(this.convertToOption);

    const options = getShuffledArray([correctOption, ...wrongOptions]);

    const question: QuizQuestion = {
      id: genUid(),
      correctOptionId: correctOption.id,
      options,
      text: `What does '${correctWord.word.text}' mean?`,
    };
    return question;
  }

  public generateWordOutcomeQuestion(
    worProgress: WordProgress,
    outcome: RoundOutcome
  ): WordOutcome {
    const newWordOutcome: WordOutcome = {
      id: genUid(),
      idWordProgress: worProgress.id,
      outcome,
      // these are for tracing - not intended for usage
      wordTxt: worProgress.word?.text ?? "",
      prababilityInclusion: 0,
    };
    if (newWordOutcome.outcome != RoundOutcome.Excluded) {
      newWordOutcome.question = this.generateQuestion(worProgress);
    }
    return newWordOutcome;
  }

  private convertToOption(wp: WordProgress): QuizOption {
    return {
      id: genUid(),
      text: `${wp.word.shortTranslation} - ${wp.word.longTranslation}`,
    };
  }
}
