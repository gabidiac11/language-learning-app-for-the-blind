import { QuizState, RoundOutcome, RoundWord, WordProgress } from "../context";
import { getShuffledArray } from "../utils";

/**
 * all words are included in the first round - shuffled
 * @param words
 * @returns
 */
export function createInitialQuizStateWithPreparedRound(
  words: WordProgress[]
): QuizState {
  const quizState: QuizState = {
    availableRoundWords: [],
    currentRoundWords: [],
    roundCount: 1,
  };
  quizState.availableRoundWords = words.map((wordProgress) => ({
    wordProgress,
    outcomes: [RoundOutcome.Unset],
  }));

  quizState.currentRoundWords = getShuffledArray(quizState.availableRoundWords);
  return quizState;
}


// TODO: move these to configs
const missProbInc = 20;

const exclProbInc = 10;

const hitProbDec = 10;

export function prepareNextRoundWords(quizState: QuizState) {
  if (quizState.roundCount < 1) {
    throw Error("This method should be called only after first round");
  }
  if (quizState.availableRoundWords.some(w => w.outcomes.some(o => o == RoundOutcome.Unset))) {
    throw Error("This method should be called only a round is finished - unset outcomes should not be present.");
  }

  const probs: { word: RoundWord; prob: number }[] =
    quizState.availableRoundWords.map((word) => ({
      word,
      prob: 1,
    }));

  const evenProb = 50;
  probs.forEach((item) => {
    const consecutives = getLastGroupFromOutcomeSequence(item.word.outcomes);
    if(consecutives.outcome === RoundOutcome.Miss) {
        const increase = consecutives.count * missProbInc;
        item.prob = evenProb + increase;
        return;
    }

    if(consecutives.outcome === RoundOutcome.Hit) {
        const decrease = consecutives.count * hitProbDec;
        item.prob = evenProb - decrease;
        return;
    }

    if(consecutives.outcome === RoundOutcome.Excluded) {
        const increase = consecutives.count * exclProbInc;
        item.prob = evenProb + increase;
        return;
    }
  });

  const includedWords:RoundWord[] = [];
  probs.forEach(item => {
    if(randomBinary(item.prob/100)) {
        includedWords.push(item.word);
        item.word.outcomes.push(RoundOutcome.Unset);
        return;
    } 
    item.word.outcomes.push(RoundOutcome.Excluded);
  });

  quizState.currentRoundWords = getShuffledArray(includedWords);
  quizState.roundCount += 1;
}

function randomBinary(p:number) {
    return Math.random() < p ? true : false;
  }

function getLastGroupFromOutcomeSequence(outcomes: RoundOutcome[]) {
    let count = 0;
    const outcome = outcomes[outcomes.length - 1]; 
    for(let i = outcomes.length - 2; i >= 0; i--) {
        if(outcomes[i] !== outcome) {
            break;
        }
        count++;
    }
    return {
        count,
        outcome
    };
}

// TODO: move this to config
const numOfRequiredConsecuteHits = 5;
const maxLengthAllowedPerExclusionSequence = 3;

export function quizIsFinished(quizState:QuizState):boolean {
    /**
     * Let it be Outcomes = {a_1, ..., a_{len(Outcomes)-1}}, \every a_i \in {H, E, M} - meaning Hit, Excluded, Miss
     * 
     * n pseodo-consecutive hits - last consecutive hits from Outcomes \in {miss| miss = M} 
     * Ex: 
     *  - n = 2; [M, M, M, H, E, E, E, H] => is finale? Yes, because last there are 2 consecutive hits in     [M, M, M, H, E, E, E, H].filter(a=>a!=E) = [M, M, M, H, H]
     *  - n = 2; [M, M, M, H, E, M, E, E, H] => is finale? No, because last there NO 2 consecutive hits in [M, M, M, H, E, M, E, E, H].filter(a=>a!=E) = [M, M, M, H, M, H]
     * 
     * n pseodo-consecutive hits without m length exclusion sequences
     * Ex:
     *  - n = 2, m = 2
     *    [M, M, M, H, E, E, E, H] => is finale? No, because there 3 E'S between last 2 H's
     *  - n = 2, m = 5
     *    same example -> is finale? Yes, because there are 3 < 5 sequances between the last 2 H's
     * 
     */
    const wordIsFinished = (word: RoundWord) => {
        console.log(`Start evaluation word ${word.wordProgress.word.text}, with outcomes`, word.outcomes);

        if(word.outcomes.some(o => o === RoundOutcome.Unset))
        {
            throw new Error("Can have sequence with unset outcome");
        }

        let hitCount = 0;
        let excCount = 0;
        let maxExcCount = 0;
        for(let i = word.outcomes.length; i >=0; i--) {
            const current = word.outcomes[i];

            // count the excluded outcome sequence
            if(current === RoundOutcome.Excluded) {
                excCount++;
                continue;
            }
            
            // no more pseudo-consecutive hits possible
            if(current === RoundOutcome.Miss)
            {
                break;
            }

            // count the consecutive hits; this means the current exclusion sequence is done -> reset sequence of excluded sequence
            if(current === RoundOutcome.Hit)
            {
                maxExcCount = excCount > maxExcCount ? excCount : maxExcCount;
                excCount = 0;
                hitCount++;
            }
        }
        maxExcCount = excCount > maxExcCount ? excCount : maxExcCount;

        console.log(`Word has:`, {maxExcCount, hitCount});

        if(hitCount < numOfRequiredConsecuteHits) {
            console.log(`Word not finished due to hitCount(=${hitCount}) < numOfRequiredConsecuteHits(=${numOfRequiredConsecuteHits})`);
            return false;
        } 
        if(maxExcCount < maxLengthAllowedPerExclusionSequence) {
            console.log(`Word not finished. To maxExcCount(=${maxExcCount}) < maxLengthAllowedPerExclusionSequence(=${maxLengthAllowedPerExclusionSequence})`);
            return false;
        } 
        console.log(`Word finished.`);
        return true;
    }

    return quizState.availableRoundWords.every(w => wordIsFinished(w));
}
