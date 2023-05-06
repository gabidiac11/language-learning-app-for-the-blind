import { BlockQuizStates, EpilogueQuizStates } from "./ctx.quiz.types";
import { EpilogueQuestionAnswer, Story } from "./ctx.story.types";
import { UserStory } from "./ctx.userStory.types";

export type Context = {
  lessonStories: Story[];
  epilogueAnswers: EpilogueQuestionAnswer[];

  userStories: {
    userId: string;
    stories: UserStory[];
  }[];

  blockQuizStates: {
    [buildingBlockId: string]: BlockQuizStates;
  };
  
  epilogueQuizStates: {
    [epilogueProgressId: string]: EpilogueQuizStates;
  };
};
