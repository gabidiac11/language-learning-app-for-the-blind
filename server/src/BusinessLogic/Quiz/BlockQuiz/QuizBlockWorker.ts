import { RoundOutcome } from "../../../Data/ctxTypes/ctx.quiz.shared.types";
import {
  QuizBlockState,
  WordOutcome,
} from "../../../Data/ctxTypes/ctx.quizl.block.types";
import {
  BuildingBlockProgress,
  WordProgress,
} from "../../../Data/ctxTypes/ctx.userStory.types";
import { log } from "../../../logger";
import { getShuffledArray, valuesOrdered } from "../../../utils";
import { QuizBlockStateCreator } from "./QuizBlockStateCreator";

// TODO: move these to configs
// TODO: make this configurable based on num of questions??
const MISS_PROB_INC = 30;
const EXCLUDED_PROB_INC = 10;
const HIT_PROB_DEC = 20;

// TODO: move this to config
// const NUM_OF_REQUIRED_CONSECUTIVE_HITS = 3;
const NUM_OF_REQUIRED_CONSECUTIVE_HITS = 1;

// It means:
//if I have [hit, skip, skip, hit] - how many skips between
// hits to consider these hits pseudo-consecutive and conclude that the word was leant
const MAX_ALLOWED_LEN_OF_EXCLUSION_SEQUENCE_SEPARATOR = 10;

export class QuizBlockWorker {
  private _blockProgress: BuildingBlockProgress;
  private _qs: QuizBlockState;
  public constructor(qs: QuizBlockState, blockProgress: BuildingBlockProgress) {
    this._qs = qs;
    this._blockProgress = blockProgress;
  }

  public quizCanBeCompleted(): boolean {
    const qs = this._qs;
    const blockProgress = this._blockProgress;
    const LOG_MARK = `[QUIZ-COMPLETION-EVALUATION_quiz(id: ${qs.id})_blockProgress(id:${blockProgress.id})]`
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
    const wordIsFinished = (wp: WordProgress) => {
      const outcomes = qs.wordOutcomes
        .filter((o) => o.idWordProgress === wp.id)
        .map((o) => o.outcome);
      log(
        `${LOG_MARK}: Start evaluation word ${wp.word.text}, with outcomes`,
        outcomes
      );

      if (outcomes.some((o) => o === RoundOutcome.Unset)) {
        log(
          `${LOG_MARK}: Word has sequence with unset outcome ${wp.word.text}`,
          outcomes
        );
        return false;
      }

      if (outcomes[outcomes.length - 1] === RoundOutcome.Excluded) {
        const getNumOfExcludedLastSeq = () => {
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
        };
        const countExclusions = getNumOfExcludedLastSeq();
        if (MAX_ALLOWED_LEN_OF_EXCLUSION_SEQUENCE_SEPARATOR < countExclusions) {
          log(
            `${LOG_MARK}: Word not finished. To countExclusions(=${countExclusions}) < maxLengthAllowedPerExclusionSequence(=${MAX_ALLOWED_LEN_OF_EXCLUSION_SEQUENCE_SEPARATOR})`
          );
          return false;
        }
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

      log(`${LOG_MARK}: Word has:`, { hitCount });

      if (hitCount < NUM_OF_REQUIRED_CONSECUTIVE_HITS) {
        log(
          `${LOG_MARK}: Word not finished due to hitCount(=${hitCount}) < numOfRequiredConsecuteHits(=${NUM_OF_REQUIRED_CONSECUTIVE_HITS})`
        );
        return false;
      }
      log(`${LOG_MARK}: Word finished.`);
      return true;
    };
    const allFinished = Object.values(blockProgress.wordProgressItems).every(
      wordIsFinished
    );
    
    log(`${LOG_MARK}: Quiz is completed? R:${allFinished}.`);

    return allFinished;
  }

  public async addNextRoundOfQuestionsToQuiz() {
    const qs = this._qs;
    const blockProgress = this._blockProgress;

    if (qs.wordOutcomes.length === 0) {
      // TODO: follow all throws to make them accessibile
      throw Error(
        "This method should be called only after passing by at least a round of questions."
      );
    }
    if (qs.wordOutcomes.some((o) => o.outcome === RoundOutcome.Unset)) {
      // TODO: follow all throws to make them accessibile
      throw Error(
        "This method should be called only with all the outcomes decided."
      );
    }
    const wordIds = valuesOrdered(blockProgress.wordProgressItems).map(
      (w) => w.id
    );
    const wordIdToProbability: { wordProgressId: string; prob: number }[] =
      wordIds.map((wordProgressId) => ({
        wordProgressId,
        prob: 0,
      }));

    const evenProb = 50;
    wordIdToProbability.forEach((probabilityItem) => {
      const consecutives = this.getLastGroupFromOutcomeSequence(
        probabilityItem.wordProgressId,
        qs
      );
      if (consecutives.outcome === RoundOutcome.Miss) {
        const increase = consecutives.count * MISS_PROB_INC;
        probabilityItem.prob = evenProb + increase;
        return;
      }

      if (consecutives.outcome === RoundOutcome.Hit) {
        const decrease = consecutives.count * HIT_PROB_DEC;
        probabilityItem.prob = evenProb - decrease;
        return;
      }

      if (consecutives.outcome === RoundOutcome.Excluded) {
        const increase = consecutives.count * EXCLUDED_PROB_INC;
        probabilityItem.prob = evenProb + increase;
        return;
      }
    });

    // generate outcomes
    let newWordOutcomes: WordOutcome[] = [];
    do {
      log("Start generating outcomes with probabilities:", wordIdToProbability);
      
      newWordOutcomes =
        this.createOutcomesBasedOnProbability(wordIdToProbability);

      log("Outcomes generated:", newWordOutcomes);
      if (
        newWordOutcomes.filter((o) => o.outcome !== RoundOutcome.Excluded)
          .length === 0
      ) {
        log(
          "Probability didn't generate any included qestions -> increase all probabilities"
        );
        wordIdToProbability.forEach((item) => {
          item.prob + 10;
        });
      }
    } while (
      newWordOutcomes.filter((o) => o.outcome !== RoundOutcome.Excluded)
        .length === 0
    );

    const newWordOutcomesShuffled = getShuffledArray(newWordOutcomes);
    qs.wordOutcomes = [...qs.wordOutcomes, ...newWordOutcomesShuffled];
  }

  private createOutcomesBasedOnProbability(
    wordIdToProbability: { wordProgressId: string; prob: number }[]
  ): WordOutcome[] {
    const creator = new QuizBlockStateCreator(this._blockProgress);
    const results = wordIdToProbability.map((item) => {
      if (this.randomBinary(item.prob / 100)) {
        const newOutcome = creator.generateWordOutcomeQuestion(
          this._blockProgress.wordProgressItems[item.wordProgressId],
          RoundOutcome.Unset
        );
        newOutcome.prababilityInclusion = item.prob;
        return newOutcome;
      }

      const newOutcome = creator.generateWordOutcomeQuestion(
        this._blockProgress.wordProgressItems[item.wordProgressId],
        RoundOutcome.Excluded
      );
      newOutcome.prababilityInclusion = item.prob;
      return newOutcome;
    });
    return results;
  }

  /**
   * get how much the last outcome of a question which was based around a word
   * OBS: this should not be called before the first round of questions was answered, because it's expected at least 1 outcome for each word
   * and the first round always has one question for each of the words
   * @param idWordProgress
   * @param qs
   * @returns
   */
  private getLastGroupFromOutcomeSequence(
    idWordProgress: string,
    qs: QuizBlockState
  ) {
    const outcomes = qs.wordOutcomes
      .filter((q) => q.idWordProgress == idWordProgress)
      .map((q) => q.outcome);

    if (outcomes.length == 0) {
      throw Error(
        `Word progress has no questions asked before. This should not be called after at least a round of questions. At id word progress: [${idWordProgress}]`
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
