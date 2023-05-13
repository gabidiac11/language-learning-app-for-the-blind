export enum RoundOutcome {
  Unset,
  Hit,
  Miss,
  Excluded,
}
export type QuizQuestion = {
  id: string;
  text: string;
  correctOptionId: string;
  options: QuizOption[];
};

export type QuizOption = {
  // this id is mapped to a word id - to avoid exposing the correct option
  id: string;
  text: string;
};
