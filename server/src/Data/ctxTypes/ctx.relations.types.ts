export type StorySubItemLink = {
  userStoryId: string;
};

export type BlockQuizQuestionLink = {
  quizId: string;
  blockProgressId: string;
  userStoryId: string;
};

export type BlockQuizLink = {
  blockProgressId: string;
  userStoryId: string;
};
