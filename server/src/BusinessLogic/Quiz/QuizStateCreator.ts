import { cheatAnswers, environment } from "../../constants";
import {
  QuizOption,
  QuizOutcome,
  QuizQuestion,
  QuizState,
  RoundOutcome,
} from "../../Data/ctxTypes/ctx.quiz.shared.types";
import { genUid, getShuffledArray } from "../../utils";
import { QuizableItem, TemplateQuestionItemReference } from "./QuizableItem";

export class QuizStateCreator {
  private _quizableItem: QuizableItem;
  public constructor(quizableItem: QuizableItem) {
    this._quizableItem = quizableItem;
  }

  public createQuizState(): QuizState {
    const quizOutcomes = this._quizableItem.templateQuestionItems.map((wp) => {
      const o = this.generateWordOutcomeQuestion(wp, RoundOutcome.Unset);
      o.prababilityInclusion = 1;
      return o;
    });

    const qs: QuizState = {
      id: genUid(),
      lang: this._quizableItem.lang,
      timestamp: Date.now(),

      entityId: this._quizableItem.entityId,
      entity: this._quizableItem.entity,
      userStoryId: this._quizableItem.userStoryId,

      quizOutcomes,
      timeCompleted: undefined,
    };
    return qs;
  }

  public generateQuestion(
    templateQuestion: TemplateQuestionItemReference
  ): QuizQuestion {
    const { correctOptionText, wrongOptionTexts } =
      templateQuestion.createOptionTexts();

    const correctOption: QuizOption = {
      id: genUid(),
      text: `${cheatAnswers ? "->" : ""}${correctOptionText}`,
    };
    const wrongOptions: QuizOption[] = wrongOptionTexts.map((text) => ({
      id: genUid(),
      text,
    }));
    const options = getShuffledArray([correctOption, ...wrongOptions]);

    const question: QuizQuestion = {
      id: genUid(),
      lang: this._quizableItem.lang,
      correctOptionId: correctOption.id,
      options,
      text: templateQuestion.questionText,
    };
    return question;
  }

  public generateWordOutcomeQuestion(
    templateQuestion: TemplateQuestionItemReference,
    outcome: RoundOutcome
  ): QuizOutcome {
    const newQuizOutcome: QuizOutcome = {
      id: genUid(),
      entityQuestionId: templateQuestion.entityQuestionId,
      parentEntity: this._quizableItem.entity,
      outcome,
      // these are for tracing - not intended for usage
      wordTxt: templateQuestion.entityText,
      prababilityInclusion: 0,
    };
    if (newQuizOutcome.outcome != RoundOutcome.Excluded) {
      newQuizOutcome.quizQuestion = this.generateQuestion(templateQuestion);
    }
    return newQuizOutcome;
  }
}
