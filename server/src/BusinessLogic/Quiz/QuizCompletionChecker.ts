import { ApiError } from "../../ApiSupport/apiErrorHelpers";
import {
  QuizState,
  RoundOutcome,
} from "../../Data/ctxTypes/ctx.quiz.shared.types";
import { log } from "../../logger";
import {
  QuizableItem,
  QuizSettings,
  TemplateQuestionItemReference,
} from "./QuizableItem";

export default class QuizCompletionChecker {
  private _qs: QuizState;
  private _quizableItem: QuizableItem;
  private _quizSettings: QuizSettings;

  private _completeLogMark: string;

  public constructor(qs: QuizState, quizableItem: QuizableItem) {
    this._qs = qs;
    this._quizableItem = quizableItem;
    this._quizSettings = quizableItem.quizSettings;
    this._completeLogMark = `evaluate-completion-${this._quizableItem.entity}_quiz(id: ${this._qs.id})_${this._qs.entity}(id:${this._quizableItem.entityId})`;
  }

  /**
   * Let it be Outcomes = {a_1, ..., a_{len(Outcomes)-1}}, \every a_i \in {H, E, M} - meaning Hit, Excluded, Miss
   *
   * n pseodo-consecutive hits - last consecutive hits from Outcomes \in {miss| miss = M}
   * Ex:
   *  - n = 2; [M, M, M, H, E, E, E, H] => is finale? Yes, because last there are 2 consecutive hits in     [M, M, M, H, E, E, E, H].filter(a=>a!=E) = [M, M, M, H, H]
   *  - n = 2; [M, M, M, H, E, M, E, E, H] => is finale? No, because last there NO 2 consecutive hits in [M, M, M, H, E, M, E, E, H].filter(a=>a!=E) = [M, M, M, H, M, H]
   *
   * n pseodo-consecutive hits without ending with a >m lengthed exclusion sequence
   * Ex:
   *  - n = 2, m = 2
   *    [M, M, M, H, E, H, E, E, E] => is finale? No, because there 3 E'S at the end of the outcome sequence
   *  - n = 2, m = 5
   *    same example -> is finale? Yes, because there are 3 < 5
   *
   */
  public quizCanBeCompleted(): boolean {
    const allFinished = this._quizableItem.templateQuestionItems.every(
      this.isQuestionTemplateCompleted.bind(this)
    );

    this.log(`Is quiz complete? R:${allFinished}.`);
    return allFinished;
  }

  private isQuestionTemplateCompleted(tq: TemplateQuestionItemReference) {
    const outcomes = (this._qs.quizOutcomes ?? [])
      .filter((o) => o.entityQuestionId === tq.entityQuestionId)
      .map((o) => o.outcome);

    this.log(`Start evaluation '${tq.entityText}', with outcomes`, outcomes);

    if (outcomes.some((o) => o === RoundOutcome.Unset)) {
      this.log(
        `NOT_COMPLETE. Reason: template question has sequence with unset outcome ${tq.entityText}`,
        outcomes
      );
      return false;
    }

    // check if it's been a while since the current question was answered
    // if so the question can't be considered learn because too much time has passed since the user saw it last time
    // so it should reappear next time and answered correctly to see if the user didn't forget about it
    const [questionWasExcludedTooMuch, countExclusions] =
      this.questionWasExcludedTooMuch(outcomes);
    if (questionWasExcludedTooMuch) {
      this.log(
        `NOT_COMPLETE. Reason: countExclusions(=${countExclusions}) < maxLengthAllowedPerExclusionSequence(=${this._quizSettings.MAX_ALLOWED_LEN_OF_EXCLUSION_SEQUENCE_SEPARATOR})`
      );
      return false;
    }

    let hitCount = 0;
    for (let i = outcomes.length - 1; i >= 0; i--) {
      const current = outcomes[i];

      // ignore exclusions
      if (current === RoundOutcome.Excluded) {
        continue;
      }

      // no more pseudo-consecutive hits possible
      if (current === RoundOutcome.Miss) {
        break;
      }

      // count the pseudo-consecutive hits
      if (current === RoundOutcome.Hit) {
        hitCount++;
      }
    }

    this.log(`Template question has been consecutively correctly answered ${hitCount} times.`);

    if (hitCount < this._quizSettings.NUM_OF_REQUIRED_CONSECUTIVE_HITS) {
      this.log(
        `Template question not completed due to hitCount(=${hitCount}) < numOfRequiredConsecuteHits(=${this._quizSettings.NUM_OF_REQUIRED_CONSECUTIVE_HITS})`
      );
      return false;
    }
    
    this.log(`COMPLETE. Template question '${tq.entityText}' completed.`);
    return true;
  }

  private questionWasExcludedTooMuch(
    outcomes: RoundOutcome[]
  ): [boolean, number] {
    if (!(outcomes[outcomes.length - 1] === RoundOutcome.Excluded)) {
      return [false, 0];
    }
    const countExclusions = this.getNumOfExcludedLastSeq(outcomes);
    if (
      this._quizSettings.MAX_ALLOWED_LEN_OF_EXCLUSION_SEQUENCE_SEPARATOR <
      countExclusions
    ) {
      return [true, countExclusions];
    }
    return [false, countExclusions];
  }

  private getNumOfExcludedLastSeq(outcomes: RoundOutcome[]) {
    let count = 1;
    for (let i = outcomes.length - 2; i >= 0; i--) {
      const current = outcomes[i];
      // ignore exclusions
      if (current !== RoundOutcome.Excluded) {
        return count;
      }
      count++;
    }
    return count;
  }

  private log(value: string, obj: unknown = null) {
    if (obj) {
      log(`[${this._completeLogMark}]: ${value}`, obj);
      return;
    }
    log(`[${this._completeLogMark}]: ${value}`);
  }
}
