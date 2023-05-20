import { ApiError } from "../../ApiSupport/apiErrorHelpers";
import {
  QuizOutcome,
  QuizState,
  RoundOutcome,
} from "../../Data/ctxTypes/ctx.quiz.shared.types";
import { log } from "../../logger";
import { getShuffledArray } from "../../utils";
import { QuizStateCreator } from "./QuizStateCreator";
import { QuizableItem, QuizSettings } from "./QuizableItem";

export class QuizStateRoundQuestionsGenerator {
  private _qs: QuizState;
  private _quizableItem: QuizableItem;
  private _quizSettings: QuizSettings;

  public constructor(qs: QuizState, quizableItem: QuizableItem) {
    this._qs = qs;
    this._quizableItem = quizableItem;
    this._quizSettings = quizableItem.quizSettings;
  }

  public async addNextRoundOfQuestionsToQuiz() {
    this.throwErrorIfRoundOfQuestionCantBeGenerated();

    const templateQIdToProbability: { templateQId: string; prob: number }[] =
      this.calculateTemplateQuestionProbabilies();

    /* Using the probabilities assigned to each question, generate outcomes with statuses assign as: 
        1. Unset     -> means will be sent to the user and answered
        2. Excluded  -> means will NOT be sent to the user, but will be used to increase the probability next time a new round of questions will be computed 
    */
    let newQuizOutcomes: QuizOutcome[] = [];
    do {
      log(
        "<comute-next-round>: Start generating outcomes with probabilities:",
        templateQIdToProbability
      );

      newQuizOutcomes = this.createOutcomesBasedOnProbability(
        templateQIdToProbability
      );

      log("<comute-next-round>: Outcomes generated:", newQuizOutcomes);
      if (
        newQuizOutcomes.filter((o) => o.outcome !== RoundOutcome.Excluded)
          .length === 0
      ) {
        log(
          "<comute-next-round>: The probability algorithm didn't generate any included qestions."
        );
        log(
          `<comute-next-round>: Increasing all probabilities by ${this._quizSettings.PROBABILITY_INC_ON_EMPTY_ROUND} and one will try to regenerate outcomes again.`
        );
        templateQIdToProbability.forEach((item) => {
          item.prob + this._quizSettings.PROBABILITY_INC_ON_EMPTY_ROUND;
        });
      }
    } while (
      newQuizOutcomes.filter((o) => o.outcome !== RoundOutcome.Excluded)
        .length === 0
    );

    const newWordOutcomesShuffled = getShuffledArray(newQuizOutcomes);
    this._qs.quizOutcomes = [
      ...(this._qs.quizOutcomes ?? []),
      ...newWordOutcomesShuffled,
    ];
  }

  private throwErrorIfRoundOfQuestionCantBeGenerated() {
    if (this._qs.quizOutcomes?.length === 0) {
      log(
        `This method should be called only after user responds to at least a round of questions.`
      );
      throw ApiError.Error("Something went wrong", 500);
    }
    if (this._qs.quizOutcomes?.some((o) => o.outcome === RoundOutcome.Unset)) {
      log(`This method should be called only with all the outcomes decided.`);
      throw ApiError.Error("Something went wrong", 500);
    }
  }

  /**
   * calculates a probability for a question to appear in the next round
   * based on the last sequence of consecutive hits, or misses, or exclusions from the whole quiz outcomes of a question
   * @returns
   */
  private calculateTemplateQuestionProbabilies(): {
    templateQId: string;
    prob: number;
  }[] {
    const templateQIds = this._quizableItem.templateQuestionItems.map(
      (templateQ) => templateQ.entityQuestionId
    );
    const templateQIdToProbability: { templateQId: string; prob: number }[] =
      templateQIds.map((templateQId) => ({
        templateQId,
        prob: 0,
      }));

    const evenProb = 50;
    templateQIdToProbability.forEach((probabilityItem) => {
      const consecutives = this.getLastConsecutiveOutcomeSequenceOfQuestion(
        probabilityItem.templateQId
      );

      // increase probability based on consecutive misses for a question
      if (consecutives.outcome === RoundOutcome.Miss) {
        const increase = consecutives.count * this._quizSettings.MISS_PROB_INC;
        probabilityItem.prob = evenProb + increase;
        return;
      }

      // lower probability based on consecutive misses for a question
      if (consecutives.outcome === RoundOutcome.Hit) {
        const decrease = consecutives.count * this._quizSettings.HIT_PROB_DEC;
        probabilityItem.prob = evenProb - decrease;
        return;
      }

      // increase probability based on consecutive exclusions
      if (consecutives.outcome === RoundOutcome.Excluded) {
        const increase =
          consecutives.count * this._quizSettings.EXCLUDED_PROB_INC;
        probabilityItem.prob = evenProb + increase;
        return;
      }
    });
    return templateQIdToProbability;
  }

  private createOutcomesBasedOnProbability(
    wordIdToProbability: { templateQId: string; prob: number }[]
  ): QuizOutcome[] {
    const creator = new QuizStateCreator(this._quizableItem);

    const results = wordIdToProbability.map((item) => {
      const templateQuestionItem =
        this._quizableItem.templateQuestionItems.find(
          (i) => i.entityQuestionId === item.templateQId
        );
      if (!templateQuestionItem)
        throw Error("createOutcomesBasedOnProbability something went wrong.");

      if (this.randomBinary(item.prob / 100)) {
        const newOutcome = creator.generateWordOutcomeQuestion(
          templateQuestionItem,
          RoundOutcome.Unset
        );
        newOutcome.prababilityInclusion = item.prob;
        return newOutcome;
      }

      const newOutcome = creator.generateWordOutcomeQuestion(
        templateQuestionItem,
        RoundOutcome.Excluded
      );
      newOutcome.prababilityInclusion = item.prob;
      return newOutcome;
    });
    return results;
  }

  /**
   * get how much the last outcome of a question which was based around a word/epilogue-question
   * OBS: this should not be called before the first round of questions was answered, because it's expected at least 1 outcome for each word/epilogue-question
   * and the first round always has one question for each of the word/epilogue-question
   * @param entityQuestionId - reference id to wordProgress - from block progress - or epilogueQuestion - from epilogue progress
   * @param qs
   * @returns
   */
  private getLastConsecutiveOutcomeSequenceOfQuestion(
    entityQuestionId: string
  ) {
    const outcomes = (this._qs.quizOutcomes ?? []).filter((q) => q.entityQuestionId == q.entityQuestionId)
      .map((q) => q.outcome);

    if (outcomes.length == 0) {
      throw Error(
        `${this._quizableItem.templateQuestionEntityName} has no questions asked before. 
        This should not be called after at least a round of questions. 
        At id word progress: [${entityQuestionId}]`
      );
    }

    let count = 1;
    const targetOutcome = outcomes[outcomes.length - 1];
    for (let i = outcomes.length - 2; i >= 0; i--) {
      if (outcomes[i] !== targetOutcome) {
        break;
      }
      count++;
    }
    return {
      count,
      outcome: targetOutcome,
    };
  }
  private randomBinary(p: number) {
    const rand = Math.random();
    log("randomBinary", { rand, p });
    return rand <= p ? true : false;
  }
}
