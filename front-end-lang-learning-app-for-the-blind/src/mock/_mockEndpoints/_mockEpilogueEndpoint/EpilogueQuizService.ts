import {
  BuildingBlockProgress,
  EpilogueOption,
  EpilogueProgress,
  EpilogueQuestionAnswer,
  EpilogueQuestionProgress,
  WordProgress,
} from "../../../context";
import {
  QuizOption,
  QuizQuestion,
  QuizRequestBodyAnswer,
  QuizResponse,
  RoundOutcome,
  QuizEpilogueState,
  EpilogueQuestionOutcome,
} from "../../../context/contextTypes/quizTypes";
import { getShuffledArray } from "../../../utils";
import { genId, MockContext, mockContext } from "../../mockContext";
import { log, Result } from "../mockEndpointHelpers";
import ProgressService from "./../ProgressService";

// TODO: refine the algoritm...
// TODO: move these to configs
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

class EpilogueQuizService {
  private _epilogueProgress: EpilogueProgress;
  private _userId: string;
  private _context: MockContext;

  public constructor(userId: string, epilogueProgressId: number) {
    this._epilogueProgress = this.getEpilogueProgress(
      epilogueProgressId,
      userId
    );
    this._userId = userId;
    this._context = mockContext;
  }

  private saveContext() {
    this._context.SaveContext();
    this._epilogueProgress = this.getEpilogueProgress(
      this._epilogueProgress.id,
      this._userId
    );
  }

  //< --START-- >< ---------------- !!! PUBLIC METHODS !!! ---------------- >< --START-->
  public getResumedQuestionFromQuiz(): Result<QuizResponse> {
    // validate user progress permission to the epilogue
    const validationResult = this.getAccessValidatonResult();
    if (validationResult?.errors?.length) return validationResult;

    // check if there is any quiz at all or any unfinished quiz
    // if not -> create a new one
    const hasAnyQuizState = this.epilogueHasAnyQuizState();
    const lastQuizIsFinished = this.epilogueLastQuizIsFinished();
    if (!hasAnyQuizState || lastQuizIsFinished) {
      this.createAndAddNewQuizState();
    }

    // get the first question with outcome unset from the last quiz from the list
    const nextRemainingQuestion = this.getNextUnanswerQuestion();
    if (nextRemainingQuestion?.question) {
      const data = this.convertQuestionToQuizResponse(
        nextRemainingQuestion.question
      );
      return {
        data: data,
      };
    }
    // this would happen only if the implementation is bad
    if (nextRemainingQuestion) {
      throw Error(
        `Something went wrong. Outcome with with no question is wrong.`
      );
    }

    // if there is no remaining questions at this point, it means all the existing questions were already answered
    // new round of questions are generated based on probability algorithm
    this.updateToNextRoundOfQuestions_Or_CompleteQuiz();

    // quiz is finished after updates - no questions is sent
    if (this.epilogueLastQuizIsFinished()) {
      return {
        data: {
          quizId: this.getMostRecentQuiz().id,
          quizCompleted: true,
        },
      };
    }

    // after update: get the first question with outcome unset from the last quiz from the list
    // if there is none, the algorithm is bad
    const nextRemainingQuestionAfterUpdate = this.getNextUnanswerQuestion();
    if (!nextRemainingQuestionAfterUpdate?.question) {
      throw Error(
        `Something went wrong. Outcome with with no question is wrong after UPDATE quiz.`
      );
    }
    const data = this.convertQuestionToQuizResponse(
      nextRemainingQuestionAfterUpdate.question
    );
    return {
      data: data,
    };
  }
  public answerQuestionAndGetNextQuestion(
    request: QuizRequestBodyAnswer
  ): Result<QuizResponse> {
    // validate user progress permission to the block
    const validationResult = this.getAccessValidatonResult();
    if (validationResult?.errors?.length) return validationResult;

    // verify if there is any quiz that is unfinished
    const hasAnyQuizState = this.epilogueHasAnyQuizState();
    const lastQuizIsFinished = this.epilogueLastQuizIsFinished();
    if (!hasAnyQuizState || lastQuizIsFinished) {
      return {
        errors: [
          "Can't answer question because the question is not part of any (unfinished) quiz.",
        ],
      };
    }

    // find question the user wants to answer
    const qs = this.getMostRecentQuiz();
    const targetOutcomeWithQuestion = qs.outcomes.find(
      (o) =>
        o.question?.id === request.questionId &&
        o.outcome !== RoundOutcome.Excluded
    );
    if (!targetOutcomeWithQuestion || !targetOutcomeWithQuestion.question) {
      return {
        errors: [
          "Can't answer question because the question is not part of the last quiz.",
        ],
      };
    }

    // update and save outcome of the word outcome based on response
    if (
      targetOutcomeWithQuestion.question.correctOptionId === request.optionId
    ) {
      targetOutcomeWithQuestion.outcome = RoundOutcome.Hit;
    } else {
      targetOutcomeWithQuestion.outcome = RoundOutcome.Miss;
    }
    this.saveContext();

    // generate next question to be answered
    const dataNextQuestion = this.getResumedQuestionFromQuiz();
    if (dataNextQuestion.errors?.length || !dataNextQuestion.data) {
      return dataNextQuestion;
    }

    // pass the correct answer to the previous question
    const response: QuizResponse = {
      ...dataNextQuestion.data,
      previouslyQuestion_CorrectOptionId:
        targetOutcomeWithQuestion.question.correctOptionId,
    };
    return {
      data: response,
    };
  }
  //< --END-- >< ---------------- !!! PUBLIC METHODS !!! ---------------- >< --END-->

  //< --START-- >< ---------------- VALIDATIONS ---------------- >< --START-->
  private getAccessValidatonResult(): Result<QuizResponse> {
    if (!this._epilogueProgress.timeUnlocked) {
      return {
        errors: ["User is trying to answer a question to a locked epilogue."],
      };
    }
    return {};
  }
  private epilogueHasAnyQuizState(): boolean {
    const hasAnyQuiz =
      !!this._context.getCtx().epilogueQuizStates?.[this._epilogueProgress.id]
        ?.quizStates?.length;
    return hasAnyQuiz;
  }
  private epilogueLastQuizIsFinished(): boolean {
    const quizStates =
      this._context.getCtx().epilogueQuizStates?.[this._epilogueProgress.id]
        ?.quizStates;
    const lastIndex = (quizStates?.length ?? 1) - 1;

    const lastIsFinished = !!quizStates?.[lastIndex]?.timeCompleted;
    return lastIsFinished;
  }
  // < --END-- >< ---------------- VALIDATIONS ---------------- >< --END-->

  //< --START-- >< ---------------- GET NON-NULL STUFF ---------------- >< --START-->
  private getMostRecentQuiz(): QuizEpilogueState {
    const quizStates =
      this._context.getCtx().epilogueQuizStates?.[this._epilogueProgress.id]
        ?.quizStates;
    const lastIndex = (quizStates?.length ?? 1) - 1;
    const lastQuiz = quizStates?.[lastIndex];
    if (!lastQuiz) {
      throw Error("No epilogue quiz for the user");
    }
    return lastQuiz;
  }
  private getEpilogueProgress(
    epilogueProgressId: number,
    userId: string
  ): EpilogueProgress {
    const epilogueProgress = mockContext
      .getCtx()
      .userStories.find((us) => us.userId == userId)
      ?.stories.find(
        (s) => s.epilogueProgress.id == epilogueProgressId
      )?.epilogueProgress;
    if (!epilogueProgress) {
      throw Error(
        `Epilogue progress with id ${epilogueProgressId} for user ${userId} could not be found.`
      );
    }
    return epilogueProgress;
  }
  public getNextUnanswerQuestion(): EpilogueQuestionOutcome | undefined {
    const qs = this.getMostRecentQuiz();
    const question = qs.outcomes.find((o) => o.outcome === RoundOutcome.Unset);
    return question;
  }
  //< --END-- >< ---------------- GET NON-NULL STUFF ---------------- >< --END-->

  //< --START-- >< ---------------- CRUD ACTIONS ---------------- >< --START-->
  private createAndAddNewQuizState() {
    const outcomes = this._epilogueProgress.questionProgressItems.map(
      (epilogueQuestionProgress) => {
        const o = this.generateQuizOutcome_FromEpilogueQuestion(
          epilogueQuestionProgress.id,
          RoundOutcome.Unset
        );
        return o;
      }
    );

    const qs: QuizEpilogueState = {
      id: genId(),
      epilogueProgressId: this._epilogueProgress.id,
      outcomes,
      timeCompleted: undefined,
    };
    this._context.addEpilogueQuizState(qs);
    this.saveContext();

    return qs;
  }

  private updateToNextRoundOfQuestions_Or_CompleteQuiz() {
    const qs = this.getMostRecentQuiz();
    if (this.epilogueQuizCanBeCompleted()) {
      qs.timeCompleted = new Date().getTime();

      const progressService = new ProgressService();
      progressService.setEpilogueCompleted(this._epilogueProgress.id);
      this.saveContext();
      return;
    }

    if (qs.outcomes.length === 0) {
      // TODO: follow all throws to make them accessibile
      throw Error(
        "This method should be called only after passing by at least a round of questions."
      );
    }
    if (qs.outcomes.some((o) => o.outcome === RoundOutcome.Unset)) {
      // TODO: follow all throws to make them accessibile
      throw Error(
        "This method should be called only with all the outcomes decided."
      );
    }
    const wordIds = this._epilogueProgress.questionProgressItems.map(
      (w) => w.id
    );
    const wordIdToProbability: { wordProgressId: number; prob: number }[] =
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
    let newWordOutcomes: EpilogueQuestionOutcome[] = [];
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
    qs.outcomes = [...qs.outcomes, ...newWordOutcomesShuffled];
    this.saveContext();
  }

  private createOutcomesBasedOnProbability(
    wordIdToProbability: { wordProgressId: number; prob: number }[]
  ): EpilogueQuestionOutcome[] {
    const results = wordIdToProbability.map((item) => {
      if (this.randomBinary(item.prob / 100)) {
        const newOutcome = this.generateQuizOutcome_FromEpilogueQuestion(
          item.wordProgressId,
          RoundOutcome.Unset
        );
        newOutcome.prababilityInclusion = item.prob;
        return newOutcome;
      }
      const newOutcome = this.generateQuizOutcome_FromEpilogueQuestion(
        item.wordProgressId,
        RoundOutcome.Excluded
      );
      newOutcome.prababilityInclusion = item.prob;
      return newOutcome;
    });
    return results;
  }

  private epilogueQuizCanBeCompleted(): boolean {
    const qs = this.getMostRecentQuiz();
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
    const wordIsFinished = (wp: EpilogueQuestionProgress) => {
      const outcomes = qs.outcomes
        .filter((o) => o.idQuestionProgress === wp.id)
        .map((o) => o.outcome);
      console.log(
        `Start evaluation epilogue question ${wp.question.text}, with outcomes`,
        outcomes
      );

      if (outcomes.some((o) => o === RoundOutcome.Unset)) {
        console.log(
          `Word has sequence with unset outcome ${wp.question.text}`,
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
          console.log(
            `Word not finished. To countExclusions(=${countExclusions}) < maxLengthAllowedPerExclusionSequence(=${MAX_ALLOWED_LEN_OF_EXCLUSION_SEQUENCE_SEPARATOR})`
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

      console.log(`Word has:`, { hitCount });

      if (hitCount < NUM_OF_REQUIRED_CONSECUTIVE_HITS) {
        console.log(
          `Word not finished due to hitCount(=${hitCount}) < numOfRequiredConsecuteHits(=${NUM_OF_REQUIRED_CONSECUTIVE_HITS})`
        );
        return false;
      }
      console.log(`Word finished.`);
      return true;
    };
    const allFinished =
      this._epilogueProgress.questionProgressItems.every(wordIsFinished);
    return allFinished;
  }
  //< --END-- >< ---------------- CRUD ACTIONS ---------------- >< --END-->

  /**
   * get how much the last outcome of a question which was based around a word
   * OBS: this should not be called before the first round of questions was answered, because it's expected at least 1 outcome for each word
   * and the first round always has one question for each of the words
   * @param idWordProgress
   * @param qs
   * @returns
   */
  private getLastGroupFromOutcomeSequence(
    idWordProgress: number,
    qs: QuizEpilogueState
  ) {
    const outcomes = qs.outcomes
      .filter((q) => q.idQuestionProgress == idWordProgress)
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

  private getEpilogueAnswers(): EpilogueQuestionAnswer[] {
    return this._context.getCtx().epilogueAnswers;
  }

  /**
   * converts an epilogue question and epilogue options to the question into quiz question and quiz options (shuffled)
   * @param idEpilogueQuestionProgress
   * @returns
   */
  private generateQuizQuestion_FromEpilogueQuestion(
    idEpilogueQuestionProgress: number
  ): QuizQuestion {
    const convert_ToQuizOption_FromEpilogueOption = (
      epilogueOption: EpilogueOption
    ): QuizOption => ({
      id: genId(),
      text: epilogueOption.text,
    });

    // find epilogue question progress containing the actual epilogue question object
    const epilogueQuestionProgress =
      this._epilogueProgress.questionProgressItems.find(
        (p) => p.id === idEpilogueQuestionProgress
      );
    if (!epilogueQuestionProgress)
      throw Error(
        `Epilgoue question progress with id ${idEpilogueQuestionProgress} doesn't have exist.`
      );

    const epilogueQuestion = epilogueQuestionProgress.question;
    const epilogueQuestionId = epilogueQuestion.id;

    // find the answer to the question - NOTE: it always has to be one; otherwise it was setup wrong when the data was seeded
    const allAnswers = this.getEpilogueAnswers();
    const epilogueQuestionAnswer = allAnswers.find(
      (a) => a.questionId === epilogueQuestionId
    );
    if (!epilogueQuestionAnswer)
      throw Error(
        `Epilgoue question with id: ${epilogueQuestionId}, text: ${epilogueQuestion.text} doesn't have answers.`
      );

    // find correct epilogue option and convert it to quiz options
    const correctEpilogueOption = epilogueQuestion.options.find(
      (o) => o.id === epilogueQuestionAnswer.correctOptionId
    );
    if (!correctEpilogueOption)
      throw Error(
        `Epilgoue question with id: ${epilogueQuestionId}, text: ${epilogueQuestion.text} doesn't have the correct option indicated by answer id: ${epilogueQuestionAnswer.id}.`
      );
    const correctQuizOption = convert_ToQuizOption_FromEpilogueOption(
      correctEpilogueOption
    );

    //TODO: delete this or make this env-based
    window.cheat_correctEpilogueOptions = {
      ...(window.cheat_correctEpilogueOptions ?? {}),
      [correctQuizOption.id]: true,
    };

    // find wrong epilogue options and convert them to quiz options:
    const wrongEpilogueOptions = epilogueQuestion.options.filter(
      (o) => o.id !== correctEpilogueOption.id
    );
    const wrongQuizOptions = wrongEpilogueOptions.map(
      convert_ToQuizOption_FromEpilogueOption
    );

    // final options shuffled:
    const options = getShuffledArray([correctQuizOption, ...wrongQuizOptions]);
    const question: QuizQuestion = {
      id: genId(),
      correctOptionId: correctQuizOption.id,
      options,
      text: epilogueQuestion.text,
    };
    return question;
  }

  private generateQuizOutcome_FromEpilogueQuestion(
    idEpilogueQuestionProgress: number,
    outcome: RoundOutcome
  ): EpilogueQuestionOutcome {
    const epilogueQuestionProgress =
      this._epilogueProgress.questionProgressItems.find(
        (w) => w.id === idEpilogueQuestionProgress
      );

    const newWordOutcome: EpilogueQuestionOutcome = {
      id: genId(),
      idQuestionProgress: idEpilogueQuestionProgress,
      outcome,
      // these are for tracing - not intended for usage
      wordTxt: epilogueQuestionProgress?.question.text ?? "",
      prababilityInclusion: 0,
    };
    if (newWordOutcome.outcome != RoundOutcome.Excluded) {
      newWordOutcome.question = this.generateQuizQuestion_FromEpilogueQuestion(
        idEpilogueQuestionProgress
      );
    }
    return newWordOutcome;
  }

  private convertQuestionToQuizResponse(question: QuizQuestion): QuizResponse {
    const data: QuizResponse = {
      questionText: question.text,
      questionId: question.id,
      options: question.options,
      quizCompleted: false,
      previouslyQuestion_CorrectOptionId: undefined,
    };
    return data;
  }

  private randomBinary(p: number) {
    const rand = Math.random();
    log("randomBinary", { rand, p });
    return rand <= p ? true : false;
  }
}

export default EpilogueQuizService;
