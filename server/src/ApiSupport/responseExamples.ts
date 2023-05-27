import { EpilogueProgress } from "../Data/ctxTypes/ctx.userStory.types";
import {
  BuildingBlockProgressOutput,
  EpilogueProgressOutput,
  UserStoryOutput,
} from "../Models/output.userStory.types";
import {
  QuizCompletedStatsResponse,
  QuizResponse,
} from "../Models/quiz.models";

export const userStory: UserStoryOutput = {
  id: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
  idsDependentOnThisUserStory: [
    "e99cf33b-d850-438f-9324-356c4b3f4116",
    "aa278c3d-f899-4c19-9a88-a3ff519df1a2",
    "afc7585d-f9e1-419b-a213-4a7cf66f0d14",
    "cf315d89-e763-41fb-a111-8d43bc8e0b96",
  ],
  imageUrl:
    "some url/3807395/pexels-photo-3807395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  name: "My family #1",
  numOfBlocksCompleted: 7,
  numOfTotalBlocks: 7,
  order: 0,
  storyId: "ca4e66d9-1d53-44cd-bc1d-b2cd9f035f3c",
  timeCompleted: 1684716464631,
  timeStarted: 1684716464631,
  timeUnlocked: 1684716464631,
  buildingBlocksProgressItems: [
    {
      blockId: "2f1407f7-5d62-43e0-a7ea-1520bebdddf2",
      id: "b08bd582-8f2e-47fe-adba-f16c30d87ac0",
      isStarter: true,
      lessonStoryId: "ca4e66d9-1d53-44cd-bc1d-b2cd9f035f3c",
      order: 0,
      timeCompleted: 1684716464631,
      timeStarted: 1684716464631,
      timeSummaryCompleted: 1684716464631,
      timeUnlocked: 1684716464631,
      userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
      wordProgressItems: [
        {
          id: "e49ef4ed-1999-4db8-aa4c-3740063b8efa",
          order: 0,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "62364798-e974-4739-ad8e-b3aac079fed5",
          word: {
            id: "62364798-e974-4739-ad8e-b3aac079fed5",
            longTranslation:
              "A group consisting of parents and children living together in a household",
            shortTranslation: "family",
            text: "семьей",
          },
        },
      ],
      block: {
        id: "2f1407f7-5d62-43e0-a7ea-1520bebdddf2",
        idsItemsDependentOnThis: [
          "28e74a16-6114-4c50-815e-631cfd7b3a5e",
          "c22b3077-b670-4ac8-8f21-a0a10125cb9e",
        ],
        imageUrl:
          "some url/3807561/pexels-photo-3807561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        isStarter: true,
        name: "Family",
        words: [
          {
            id: "62364798-e974-4739-ad8e-b3aac079fed5",
            longTranslation:
              "A group consisting of parents and children living together in a household",
            shortTranslation: "family",
            text: "семьей",
          },
        ],
      },
    },
  ],
  description: "Example: COMPLETED",
  epilogueProgress: {
    epilogueId: "51c76980-f429-4b41-8300-22af4bee00a3",
    id: "524291bb-0ff9-4323-abf4-d90dbc88ad77",
    lessonStoryId: "ca4e66d9-1d53-44cd-bc1d-b2cd9f035f3c",
    questionProgressItems: [
      {
        id: "c1cd814e-c4e7-49f1-811b-89869ee04669",
        order: 0,
        questionId: "023ab9c9-0e57-4f89-96a1-8bf6072d59cd",
        userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
        question: {
          id: "023ab9c9-0e57-4f89-96a1-8bf6072d59cd",
          options: [
            {
              id: "39d5eda3-8a0e-45aa-9d4d-a52f4d8b5e8c",
              text: "Anna's mom and dad",
            },
            {
              id: "553d4c68-44fc-4b5c-ada8-c3d78873a886",
              text: "Anna's brother and sister",
            },
            {
              id: "48a32a2d-a0fb-42a6-87a4-e2f8014fa3c1",
              text: "Anna's grandparents",
            },
            {
              id: "31bb47d5-141a-4bd5-a0d0-b5a5956c5162",
              text: "Anna's aunt and uncle",
            },
          ],
          text: "Who does Anna live with?",
        },
      },
    ],
    timeCompleted: 1684716464631,
    timeStarted: 1684716464631,
    timeSummaryCompleted: 1684716464631,
    timeUnlocked: 1684716464631,
    userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
    epilogue: {
      id: "51c76980-f429-4b41-8300-22af4bee00a3",
      name: "Anna's family",
      questions: [
        {
          id: "023ab9c9-0e57-4f89-96a1-8bf6072d59cd",
          options: [
            {
              id: "39d5eda3-8a0e-45aa-9d4d-a52f4d8b5e8c",
              text: "Anna's mom and dad",
            },
            {
              id: "553d4c68-44fc-4b5c-ada8-c3d78873a886",
              text: "Anna's brother and sister",
            },
            {
              id: "48a32a2d-a0fb-42a6-87a4-e2f8014fa3c1",
              text: "Anna's grandparents",
            },
            {
              id: "31bb47d5-141a-4bd5-a0d0-b5a5956c5162",
              text: "Anna's aunt and uncle",
            },
          ],
          text: "Who does Anna live with?",
        },
      ],
      textStoryTale:
        '"Семья Анны"\n  \n      Меня зовут Анна. Я живу вместе со своей семьей: мамой, папой и братом. Моя мама зовут Катя, а папа - Иван. Мой брат Александр младше меня на два года.\n  \n      Мы любим проводить время вместе. Часто мы гуляем в парке, играем в футбол и готовим вкусную еду. Я люблю готовить блины, а папа обычно готовит мясо на гриле. Брат Александр помогает мне смешивать тесто.\n  \n      Я учусь в школе и занимаюсь каждый день. Мне нравится учиться русскому языку. Я говорю "я", когда говорю о себе, и "ты", когда обращаюсь к брату или другу. Моя мама и папа говорят "они" о других людях.\n  \n      Когда я возвращаюсь домой после школы, я обычно делаю уроки и помогаю маме приготовить ужин. Потом мы все вместе садимся за стол и едим вкусную еду, говоря о нашем дне. Я люблю мою семью и всегда рада проводить время вместе с ними.',
    },
  },
};

export const userStories: UserStoryOutput[] = [userStory];

export const epilogueQuizRequestQuestionExample: QuizResponse = {
  questionText: "Who does Anna live with?",
  questionId: "3a2f933f-f2ba-4e22-9971-de6cfb26e87a",
  options: [
    {
      id: "38e04232-aa11-429a-8cab-e5b9dc9d904d",
      text: "Anna's brother and sister",
    },
    {
      id: "ce9256a4-5a09-405c-82e6-8abf2c2a911e",
      text: "Anna's grandparents",
    },
    {
      id: "a059835f-4682-421b-ac69-e5d2141960e6",
      text: "Anna's aunt and uncle",
    },
    {
      id: "0dcd1d8b-5916-4380-8d0c-cf1f0cf3f38e",
      text: "Anna's mom and dad",
    },
  ],
  quizCompleted: false,
};

export const epilogueQuizRequestQuestionExampleCompleted: QuizResponse = {
  quizCompleted: true,
  quizId: "aeec4d13-3cc3-429c-bcdd-ef4333eab5d4",
  previouslyQuestion_CorrectOptionId: "94e1ff5c-9e37-4b71-a84a-21916f9c5847",

  options: [],
  questionId: "",
  questionText: "",
};

export const epilogueCompletedResponse: QuizCompletedStatsResponse = {
  blockCompletedStoryRefId: "e99cf33b-d850-438f-9324-356c4b3f4116",
  userStoriesUnlocked: [userStory],
};

export const epilogueProgress: EpilogueProgressOutput = {
  epilogueId: "205cdadc-b1e2-481a-a88a-0fb88cb250ca",
  id: "cce4e047-32db-4e5b-9d74-3b7901e8705a",
  lessonStoryId: "d188f7fb-d8be-40f3-aa02-fa6f2ed41c0e",
  questionProgressItems: [
    {
      id: "a131b37c-00eb-4431-98a4-77e4266a5f91",
      order: 0,
      questionId: "471dff51-c04b-4c76-8c12-ef9aa97d2a8b",
      userStoryId: "aa278c3d-f899-4c19-9a88-a3ff519df1a2",
      question: {
        id: "471dff51-c04b-4c76-8c12-ef9aa97d2a8b",
        options: [
          {
            id: "91910c90-6458-4938-bf5f-e5dcecbea4ba",
            text: "Anna's mom and dad",
          },
          {
            id: "908c8be1-6915-49f8-b9fd-cbfaa977c66f",
            text: "Anna's brother and sister",
          },
          {
            id: "3fd4e238-90c1-4290-8eb7-46cde353ada8",
            text: "Anna's grandparents",
          },
          {
            id: "d5c34512-dce8-45de-a8f3-40777465e522",
            text: "Anna's aunt and uncle",
          },
        ],
        text: "Who does Anna live with?",
      },
    },
  ],
  timeCompleted: 1685209698600,
  timeStarted: 1685204295040,
  timeSummaryCompleted: 1685204294895,
  timeUnlocked: 1684716464631,
  userStoryId: "aa278c3d-f899-4c19-9a88-a3ff519df1a2",
  epilogue: {
    id: "205cdadc-b1e2-481a-a88a-0fb88cb250ca",
    name: "Anna's family",
    questions: [
      {
        id: "471dff51-c04b-4c76-8c12-ef9aa97d2a8b",
        options: [
          {
            id: "91910c90-6458-4938-bf5f-e5dcecbea4ba",
            text: "Anna's mom and dad",
          },
          {
            id: "908c8be1-6915-49f8-b9fd-cbfaa977c66f",
            text: "Anna's brother and sister",
          },
          {
            id: "3fd4e238-90c1-4290-8eb7-46cde353ada8",
            text: "Anna's grandparents",
          },
          {
            id: "d5c34512-dce8-45de-a8f3-40777465e522",
            text: "Anna's aunt and uncle",
          },
        ],
        text: "Who does Anna live with?",
      },
    ],
    textStoryTale:
      '"Семья Анны"\n  \n      Меня зовут Анна. Я живу вместе со своей семьей: мамой, папой и братом. Моя мама зовут Катя, а папа - Иван. Мой брат Александр младше меня на два года.\n  \n      Мы любим проводить время вместе. Часто мы гуляем в парке, играем в футбол и готовим вкусную еду. Я люблю готовить блины, а папа обычно готовит мясо на гриле. Брат Александр помогает мне смешивать тесто.\n  \n      Я учусь в школе и занимаюсь каждый день. Мне нравится учиться русскому языку. Я говорю "я", когда говорю о себе, и "ты", когда обращаюсь к брату или другу. Моя мама и папа говорят "они" о других людях.\n  \n      Когда я возвращаюсь домой после школы, я обычно делаю уроки и помогаю маме приготовить ужин. Потом мы все вместе садимся за стол и едим вкусную еду, говоря о нашем дне. Я люблю мою семью и всегда рада проводить время вместе с ними.',
  },
};

export const blockProgress: BuildingBlockProgressOutput = {
  blockId: "2f1407f7-5d62-43e0-a7ea-1520bebdddf2",
  id: "b08bd582-8f2e-47fe-adba-f16c30d87ac0",
  isStarter: true,
  lessonStoryId: "ca4e66d9-1d53-44cd-bc1d-b2cd9f035f3c",
  order: 0,
  timeCompleted: 1684716464631,
  timeStarted: 1684716464631,
  timeSummaryCompleted: 1684716464631,
  timeUnlocked: 1684716464631,
  userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
  wordProgressItems: [
    {
      id: "e49ef4ed-1999-4db8-aa4c-3740063b8efa",
      order: 0,
      userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
      wordId: "62364798-e974-4739-ad8e-b3aac079fed5",
      word: {
        id: "62364798-e974-4739-ad8e-b3aac079fed5",
        longTranslation:
          "A group consisting of parents and children living together in a household",
        shortTranslation: "family",
        text: "семьей",
      },
    },
  ],
  block: {
    id: "2f1407f7-5d62-43e0-a7ea-1520bebdddf2",
    idsItemsDependentOnThis: [
      "28e74a16-6114-4c50-815e-631cfd7b3a5e",
      "c22b3077-b670-4ac8-8f21-a0a10125cb9e",
    ],
    imageUrl:
      // TODO: remove all image references
      "https://images.pexels.com/photos/3807561/pexels-photo-3807561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    isStarter: true,
    name: "Family",
    words: [
      {
        id: "62364798-e974-4739-ad8e-b3aac079fed5",
        longTranslation:
          "A group consisting of parents and children living together in a household",
        shortTranslation: "family",
        text: "семьей",
      },
      {
        id: "279f747d-3645-4f65-8d71-f6940fe78a3e",
        longTranslation: "One's mother",
        shortTranslation: "mom",
        text: "мамой",
      },
      {
        id: "d49a781a-738f-4147-84c1-3fb8c20d9b85",
        longTranslation: "Used when referring to one's father.",
        shortTranslation: "dad",
        text: "папа",
      },
      {
        id: "02596544-f41a-4fe7-8392-7ebc0aa44427",
        longTranslation: "A male sibling",
        shortTranslation: "brother",
        text: "братом",
      },
      {
        id: "f14c0b51-9249-428a-95d2-569a47952304",
        longTranslation: "Used to refer to the name or title of someone",
        shortTranslation: "called",
        text: "зовут",
      },
      {
        id: "22d34d02-8625-4416-b439-80541cf61cc3",
        longTranslation: "Being at an earlier age",
        shortTranslation: "younger",
        text: "младше",
      },
      {
        id: "c7cfe2ff-8dc6-4d21-9ca4-a3e32fbe465b",
        longTranslation: "Being two years younger than someone else",
        shortTranslation: "two years younger",
        text: "на два года",
      },
      {
        id: "a7d239a7-3451-4871-8e4c-61e1baa00655",
        longTranslation: "Preferred over all others of the same kind",
        shortTranslation: "favorite",
        text: "любим",
      },
      {
        id: "19dc3ee2-3d09-4e99-aa9a-536e9eb6577a",
        longTranslation: "Human beings in general or considered collectively",
        shortTranslation: "people",
        text: "людях",
      },
      {
        id: "49eaae87-a13f-496b-9072-abaae0105eda",
        longTranslation: "Feeling or showing pleasure or contentment",
        shortTranslation: "happy",
        text: "рада",
      },
    ],
  },
};

export const blockQuizRequestQuestionExample: QuizResponse = {
  questionText: "What does 'семьей' mean?",
  questionId: "ab32d8ae-577c-4dd6-ba2a-3b1c3c8907fb",
  options: [
    {
      id: "536a6882-e740-4396-9781-f82e2c0c901c",
      text: "family - A group consisting of parents and children living together in a household",
    },
    {
      id: "beefa831-b824-4554-9abb-94ccce11e4e7",
      text: "two years younger - Being two years younger than someone else",
    },
    {
      id: "96b7fb6c-f594-45d5-b8b9-8efc19af5937",
      text: "dad - Used when referring to one's father.",
    },
    { id: "09066e0a-c44e-4f1f-ae28-44c870ce008e", text: "mom - One's mother" },
  ],
  quizCompleted: false,
};

export const blockQuizRequestQuestionExampleCompleted: QuizResponse = {
  options: [],
  questionId: "",
  questionText: "",
  quizId: "64c65e06-988b-4964-8acd-cb79c086e44e",
  quizCompleted: true,
  previouslyQuestion_CorrectOptionId: "8c1c3c58-1bb5-408e-ac1d-83daaaa69be5",
};

export const blockCompletedResponse: QuizCompletedStatsResponse = {
  blockCompletedStoryRefId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
  blockCompleted: {
    blockId: "2f1407f7-5d62-43e0-a7ea-1520bebdddf2",
    id: "b08bd582-8f2e-47fe-adba-f16c30d87ac0",
    isStarter: true,
    lessonStoryId: "ca4e66d9-1d53-44cd-bc1d-b2cd9f035f3c",
    order: 0,
    timeCompleted: 1684716464631,
    timeStarted: 1684716464631,
    timeSummaryCompleted: 1684716464631,
    timeUnlocked: 1684716464631,
    userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
    wordProgressItems: {
      "029228ae-fd4c-47b6-bf11-7585c8dda17f": {
        id: "029228ae-fd4c-47b6-bf11-7585c8dda17f",
        order: 7,
        userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
        wordId: "a7d239a7-3451-4871-8e4c-61e1baa00655",
        word: {
          id: "a7d239a7-3451-4871-8e4c-61e1baa00655",
          longTranslation: "Preferred over all others of the same kind",
          shortTranslation: "favorite",
          text: "любим",
        },
      },
    },
    block: {
      id: "2f1407f7-5d62-43e0-a7ea-1520bebdddf2",
      idsItemsDependentOnThis: [
        "28e74a16-6114-4c50-815e-631cfd7b3a5e",
        "c22b3077-b670-4ac8-8f21-a0a10125cb9e",
      ],
      imageUrl:
        "https://images.pexels.com/photos/3807561/pexels-photo-3807561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      isStarter: true,
      name: "Family",
      words: [
        {
          id: "62364798-e974-4739-ad8e-b3aac079fed5",
          longTranslation:
            "A group consisting of parents and children living together in a household",
          shortTranslation: "family",
          text: "семьей",
        },
      ],
    },
  },
  blockProgressUnlockedItems: [
    {
      blockId: "28e74a16-6114-4c50-815e-631cfd7b3a5e",
      id: "6842372a-0bea-4492-8350-a9f2723c0a26",
      isDependentOnNames: ["Family"],
      isStarter: false,
      lessonStoryId: "ca4e66d9-1d53-44cd-bc1d-b2cd9f035f3c",
      order: 1,
      timeCompleted: 1684716464631,
      timeStarted: 1684716464631,
      timeSummaryCompleted: 1684716464631,
      timeUnlocked: 1684716464631,
      userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
      wordProgressItems: {
        "26058805-e1ae-47e7-b8ca-bbf54502cd55": {
          id: "26058805-e1ae-47e7-b8ca-bbf54502cd55",
          order: 1,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "d75ba16c-279d-4ee1-9526-297c4fc001e8",
          word: {
            id: "d75ba16c-279d-4ee1-9526-297c4fc001e8",
            longTranslation: "A female given name",
            shortTranslation: "Katya",
            text: "Катя",
          },
        },
      },
      block: {
        id: "28e74a16-6114-4c50-815e-631cfd7b3a5e",
        imageUrl:
          "https://images.pexels.com/photos/4700108/pexels-photo-4700108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        isStarter: false,
        name: "Names",
        words: [
          {
            id: "4087672f-6426-4db7-a8e9-649282b5e207",
            longTranslation: "A female given name",
            shortTranslation: "Anna",
            text: "Анна",
          },
        ],
      },
    },
    {
      blockId: "c22b3077-b670-4ac8-8f21-a0a10125cb9e",
      id: "8d309f66-c144-4dd3-b243-36b4905d6b99",
      isDependentOnNames: ["Family"],
      isStarter: false,
      lessonStoryId: "ca4e66d9-1d53-44cd-bc1d-b2cd9f035f3c",
      order: 2,
      timeCompleted: 1684716464631,
      timeStarted: 1684716464631,
      timeSummaryCompleted: 1684716464631,
      timeUnlocked: 1684716464631,
      userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
      wordProgressItems: {
        "02b69db6-ae22-4615-bbd6-15e3d4d6ad5d": {
          id: "02b69db6-ae22-4615-bbd6-15e3d4d6ad5d",
          order: 3,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "7bd64e35-4f23-4f82-8654-201e5f5b9216",
          word: {
            id: "7bd64e35-4f23-4f82-8654-201e5f5b9216",
            longTranslation:
              "Used to indicate possession of something by a female speaker.",
            shortTranslation: "my",
            text: "Моя",
          },
        },
        "10e5584b-56d7-4184-a71b-217d96734c99": {
          id: "10e5584b-56d7-4184-a71b-217d96734c99",
          order: 16,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "a589ebd9-e48c-4966-9271-c6b80c758779",
          word: {
            id: "a589ebd9-e48c-4966-9271-c6b80c758779",
            longTranslation:
              "Used to indicate possession of something by a group.",
            shortTranslation: "with them",
            text: "ними",
          },
        },
        "122a9f36-683b-444e-8ac8-4132e951ec1d": {
          id: "122a9f36-683b-444e-8ac8-4132e951ec1d",
          order: 18,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "932b021f-d78e-45a9-9fb7-4dee3fcdabbc",
          word: {
            id: "932b021f-d78e-45a9-9fb7-4dee3fcdabbc",
            longTranslation: "Belonging to me",
            shortTranslation: "my",
            text: "мою",
          },
        },
        "28bcb131-f8ae-4afd-97d8-52e1d9c7021e": {
          id: "28bcb131-f8ae-4afd-97d8-52e1d9c7021e",
          order: 11,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "d08d9192-27b8-4323-94c1-246b25139188",
          word: {
            id: "d08d9192-27b8-4323-94c1-246b25139188",
            longTranslation:
              "Used when referring to a male friend in the vocative case.",
            shortTranslation: "to friend",
            text: "другу",
          },
        },
        "4260ba58-832b-4fd4-ab02-c006855e2437": {
          id: "4260ba58-832b-4fd4-ab02-c006855e2437",
          order: 13,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "14c4c060-96f6-433a-a391-f1f30b2dfb5f",
          word: {
            id: "14c4c060-96f6-433a-a391-f1f30b2dfb5f",
            longTranslation:
              "Used when referring to one's mother as the recipient of an action.",
            shortTranslation: "to mom",
            text: "маме",
          },
        },
        "54a452be-5bc2-4b5b-91b2-17e470c4f299": {
          id: "54a452be-5bc2-4b5b-91b2-17e470c4f299",
          order: 19,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "4e7bf8ca-ed55-478e-87e1-b9060fbfc2fd",
          word: {
            id: "4e7bf8ca-ed55-478e-87e1-b9060fbfc2fd",
            longTranslation:
              "Indicates a state of being with one or more other people or things",
            shortTranslation: "together",
            text: "вместе",
          },
        },
        "67be74fb-96ba-4a2b-8d9e-006226421f87": {
          id: "67be74fb-96ba-4a2b-8d9e-006226421f87",
          order: 0,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "b2eaf1ad-1af7-4546-ab28-438a1bf4e0bb",
          word: {
            id: "b2eaf1ad-1af7-4546-ab28-438a1bf4e0bb",
            longTranslation:
              "Used when referring to oneself as the object of a verb or preposition.",
            shortTranslation: "me",
            text: "Меня",
          },
        },
        "68cdf1de-51f2-4390-bc7d-f1230bb3ad71": {
          id: "68cdf1de-51f2-4390-bc7d-f1230bb3ad71",
          order: 1,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "181a2f80-7c69-481c-b841-899cf0de2b20",
          word: {
            id: "181a2f80-7c69-481c-b841-899cf0de2b20",
            longTranslation:
              "Used when referring to oneself as the subject of a verb.",
            shortTranslation: "I",
            text: "Я",
          },
        },
        "8d064f41-11d7-49be-9c1c-dafd811ef79d": {
          id: "8d064f41-11d7-49be-9c1c-dafd811ef79d",
          order: 5,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "81d2f1f3-1ff1-4168-8f70-e724bc4e1c21",
          word: {
            id: "81d2f1f3-1ff1-4168-8f70-e724bc4e1c21",
            longTranslation:
              "Used when referring to oneself as the object of a verb or preposition.",
            shortTranslation: "me",
            text: "меня",
          },
        },
        "90af76b7-3e09-4c59-9062-f77c083d32af": {
          id: "90af76b7-3e09-4c59-9062-f77c083d32af",
          order: 12,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "bcd199d3-86d7-4912-8ec4-9bc080483610",
          word: {
            id: "bcd199d3-86d7-4912-8ec4-9bc080483610",
            longTranslation:
              "Used when referring to more than one person or thing as the subject of a verb.",
            shortTranslation: "they",
            text: "они",
          },
        },
        "96020d4c-5b68-4f95-bf04-aab511e028fe": {
          id: "96020d4c-5b68-4f95-bf04-aab511e028fe",
          order: 7,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "4bf66549-6c5a-488d-8f52-972ae91fe426",
          word: {
            id: "4bf66549-6c5a-488d-8f52-972ae91fe426",
            longTranslation:
              "Used when referring to oneself as the recipient of an action.",
            shortTranslation: "to me",
            text: "мне",
          },
        },
        "99cbd8a3-4708-4108-a6f3-e49944e4266c": {
          id: "99cbd8a3-4708-4108-a6f3-e49944e4266c",
          order: 15,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "f6f708d0-aebe-4b9f-bc94-68dcb71df61f",
          word: {
            id: "f6f708d0-aebe-4b9f-bc94-68dcb71df61f",
            longTranslation:
              "Used to refer to the entirety of a group of people or things.",
            shortTranslation: "all",
            text: "все",
          },
        },
        "9f60e6e6-6de7-4fbe-a7a4-377c149d9000": {
          id: "9f60e6e6-6de7-4fbe-a7a4-377c149d9000",
          order: 17,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "6b3afd23-d4fe-42bd-a039-506d8c00f19c",
          word: {
            id: "6b3afd23-d4fe-42bd-a039-506d8c00f19c",
            longTranslation: "Belonging to us",
            shortTranslation: "our",
            text: "нашем",
          },
        },
        "c054fef6-269a-4088-a3c3-ccf2fa6d11be": {
          id: "c054fef6-269a-4088-a3c3-ccf2fa6d11be",
          order: 8,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "25868002-5d0a-48ba-a77c-1c703eac6aef",
          word: {
            id: "25868002-5d0a-48ba-a77c-1c703eac6aef",
            longTranslation:
              "Used when referring to oneself in a general sense.",
            shortTranslation: "about myself",
            text: "о себе",
          },
        },
        "c96c8eb6-7e9b-480e-8c2c-ff0e358e9e33": {
          id: "c96c8eb6-7e9b-480e-8c2c-ff0e358e9e33",
          order: 9,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "30035876-8871-4d21-a189-70f46c9dddbb",
          word: {
            id: "30035876-8871-4d21-a189-70f46c9dddbb",
            longTranslation: "Used when addressing one person informally.",
            shortTranslation: "you",
            text: "ты",
          },
        },
        "d6afc6ba-adce-41f4-9c75-52a2a855e8d0": {
          id: "d6afc6ba-adce-41f4-9c75-52a2a855e8d0",
          order: 10,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "46c8421e-b571-43cd-92d9-56698199145b",
          word: {
            id: "46c8421e-b571-43cd-92d9-56698199145b",
            longTranslation:
              "Used when referring to one's brother in the vocative case.",
            shortTranslation: "to brother",
            text: "к брату",
          },
        },
        "e3f4dd6e-c662-41a4-80d9-484d526876d6": {
          id: "e3f4dd6e-c662-41a4-80d9-484d526876d6",
          order: 6,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "4fcbf441-dd4c-4776-a862-06afc06893ca",
          word: {
            id: "4fcbf441-dd4c-4776-a862-06afc06893ca",
            longTranslation:
              "Used when referring to oneself and others as the subject of a verb.",
            shortTranslation: "we",
            text: "Мы",
          },
        },
        "eceee406-2665-4cd3-8518-4306be551ead": {
          id: "eceee406-2665-4cd3-8518-4306be551ead",
          order: 2,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "f1bbebee-3863-42b1-93ac-766d8773811b",
          word: {
            id: "f1bbebee-3863-42b1-93ac-766d8773811b",
            longTranslation:
              "Used to indicate possession of something by the speaker.",
            shortTranslation: "with my",
            text: "со своей",
          },
        },
        "ee9a1aa4-7121-49a6-804d-eb57e36b7842": {
          id: "ee9a1aa4-7121-49a6-804d-eb57e36b7842",
          order: 4,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "5d8a474c-c8ff-464d-ae5b-a276b23c81b0",
          word: {
            id: "5d8a474c-c8ff-464d-ae5b-a276b23c81b0",
            longTranslation:
              "Used to indicate possession of something by a male speaker.",
            shortTranslation: "my",
            text: "Мой",
          },
        },
        "fd79c3d7-2cb2-4878-ac3f-89a8fea240ab": {
          id: "fd79c3d7-2cb2-4878-ac3f-89a8fea240ab",
          order: 14,
          userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
          wordId: "b276b604-d7f0-4a36-9225-716cf8ed7ca8",
          word: {
            id: "b276b604-d7f0-4a36-9225-716cf8ed7ca8",
            longTranslation:
              "Used when referring to oneself and others as the subject of a verb.",
            shortTranslation: "we",
            text: "мы",
          },
        },
      },
      block: {
        id: "c22b3077-b670-4ac8-8f21-a0a10125cb9e",
        idsItemsDependentOnThis: ["f876cde3-feaa-41dc-9720-d18f8eb975a9"],
        imageUrl:
          "https://images.pexels.com/photos/5912615/pexels-photo-5912615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        isStarter: false,
        name: "Pronouns",
        words: [
          {
            id: "b2eaf1ad-1af7-4546-ab28-438a1bf4e0bb",
            longTranslation:
              "Used when referring to oneself as the object of a verb or preposition.",
            shortTranslation: "me",
            text: "Меня",
          },
          {
            id: "181a2f80-7c69-481c-b841-899cf0de2b20",
            longTranslation:
              "Used when referring to oneself as the subject of a verb.",
            shortTranslation: "I",
            text: "Я",
          },
          {
            id: "f1bbebee-3863-42b1-93ac-766d8773811b",
            longTranslation:
              "Used to indicate possession of something by the speaker.",
            shortTranslation: "with my",
            text: "со своей",
          },
          {
            id: "7bd64e35-4f23-4f82-8654-201e5f5b9216",
            longTranslation:
              "Used to indicate possession of something by a female speaker.",
            shortTranslation: "my",
            text: "Моя",
          },
          {
            id: "5d8a474c-c8ff-464d-ae5b-a276b23c81b0",
            longTranslation:
              "Used to indicate possession of something by a male speaker.",
            shortTranslation: "my",
            text: "Мой",
          },
          {
            id: "81d2f1f3-1ff1-4168-8f70-e724bc4e1c21",
            longTranslation:
              "Used when referring to oneself as the object of a verb or preposition.",
            shortTranslation: "me",
            text: "меня",
          },
          {
            id: "4fcbf441-dd4c-4776-a862-06afc06893ca",
            longTranslation:
              "Used when referring to oneself and others as the subject of a verb.",
            shortTranslation: "we",
            text: "Мы",
          },
          {
            id: "4bf66549-6c5a-488d-8f52-972ae91fe426",
            longTranslation:
              "Used when referring to oneself as the recipient of an action.",
            shortTranslation: "to me",
            text: "мне",
          },
          {
            id: "25868002-5d0a-48ba-a77c-1c703eac6aef",
            longTranslation:
              "Used when referring to oneself in a general sense.",
            shortTranslation: "about myself",
            text: "о себе",
          },
          {
            id: "30035876-8871-4d21-a189-70f46c9dddbb",
            longTranslation: "Used when addressing one person informally.",
            shortTranslation: "you",
            text: "ты",
          },
          {
            id: "46c8421e-b571-43cd-92d9-56698199145b",
            longTranslation:
              "Used when referring to one's brother in the vocative case.",
            shortTranslation: "to brother",
            text: "к брату",
          },
          {
            id: "d08d9192-27b8-4323-94c1-246b25139188",
            longTranslation:
              "Used when referring to a male friend in the vocative case.",
            shortTranslation: "to friend",
            text: "другу",
          },
          {
            id: "bcd199d3-86d7-4912-8ec4-9bc080483610",
            longTranslation:
              "Used when referring to more than one person or thing as the subject of a verb.",
            shortTranslation: "they",
            text: "они",
          },
          {
            id: "14c4c060-96f6-433a-a391-f1f30b2dfb5f",
            longTranslation:
              "Used when referring to one's mother as the recipient of an action.",
            shortTranslation: "to mom",
            text: "маме",
          },
          {
            id: "b276b604-d7f0-4a36-9225-716cf8ed7ca8",
            longTranslation:
              "Used when referring to oneself and others as the subject of a verb.",
            shortTranslation: "we",
            text: "мы",
          },
          {
            id: "f6f708d0-aebe-4b9f-bc94-68dcb71df61f",
            longTranslation:
              "Used to refer to the entirety of a group of people or things.",
            shortTranslation: "all",
            text: "все",
          },
          {
            id: "a589ebd9-e48c-4966-9271-c6b80c758779",
            longTranslation:
              "Used to indicate possession of something by a group.",
            shortTranslation: "with them",
            text: "ними",
          },
          {
            id: "6b3afd23-d4fe-42bd-a039-506d8c00f19c",
            longTranslation: "Belonging to us",
            shortTranslation: "our",
            text: "нашем",
          },
          {
            id: "932b021f-d78e-45a9-9fb7-4dee3fcdabbc",
            longTranslation: "Belonging to me",
            shortTranslation: "my",
            text: "мою",
          },
          {
            id: "4e7bf8ca-ed55-478e-87e1-b9060fbfc2fd",
            longTranslation:
              "Indicates a state of being with one or more other people or things",
            shortTranslation: "together",
            text: "вместе",
          },
        ],
      },
    },
  ],
  epilogueProgressUnlocked: {
    epilogueId: "51c76980-f429-4b41-8300-22af4bee00a3",
    id: "524291bb-0ff9-4323-abf4-d90dbc88ad77",
    lessonStoryId: "ca4e66d9-1d53-44cd-bc1d-b2cd9f035f3c",
    questionProgressItems: {
      "0edce8a9-fa1a-47db-b799-fed00879b905": {
        id: "0edce8a9-fa1a-47db-b799-fed00879b905",
        order: 1,
        questionId: "d2cc9a07-91a9-4d16-8b1a-1e0ed3f53f7b",
        userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
        question: {
          id: "d2cc9a07-91a9-4d16-8b1a-1e0ed3f53f7b",
          options: [
            { id: "33563cd0-6be8-4c88-b810-62b047150b91", text: "Kate" },
            { id: "779e8dd9-6805-4ef1-ad21-464a092b2dc2", text: "Ivan" },
            { id: "d96556b6-deae-4744-b001-abe326fbf86e", text: "Alexander" },
            { id: "d7a746b0-373f-404c-be9a-ae7b99ddbffa", text: "Anna" },
          ],
          text: "What is Anna's mom's name?",
        },
      },
      "148764b0-84f2-48fd-a0c4-78310a6ea99e": {
        id: "148764b0-84f2-48fd-a0c4-78310a6ea99e",
        order: 7,
        questionId: "06146f01-adb9-465d-97e8-4abe8b88ac29",
        userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
        question: {
          id: "06146f01-adb9-465d-97e8-4abe8b88ac29",
          options: [
            { id: "9cbb1e16-dd4d-4311-85bb-3415f4f4eb28", text: "They" },
            { id: "517f9b0b-5ac1-4ffb-81a5-091d11cdb3e0", text: "I" },
            { id: "55a86f05-b628-4c36-b8d9-9040e313f1e7", text: "You" },
            { id: "8185d289-7014-4da0-9fd1-7350a956fa94", text: "We" },
          ],
          text: "What pronoun do Anna's mom and dad use to refer to other people?",
        },
      },
      "33adb5e6-36ba-441c-af9b-cbd42cb45aa4": {
        id: "33adb5e6-36ba-441c-af9b-cbd42cb45aa4",
        order: 3,
        questionId: "c2f178c3-cbb3-4a6b-8013-8758f1a19fb6",
        userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
        question: {
          id: "c2f178c3-cbb3-4a6b-8013-8758f1a19fb6",
          options: [
            {
              id: "9fa15979-34fc-445f-b953-a82afcb15e01",
              text: "Meat on the grill",
            },
            { id: "25a3d8bf-ce47-4635-9991-3ba189aca8ad", text: "Pancakes" },
            { id: "479c74ff-b6d7-4c19-976e-89bb4123de21", text: "Salad" },
            { id: "1a5d5296-28c0-4e2e-bac1-f15004819f85", text: "Pizza" },
          ],
          text: "What does Anna's dad usually cook?",
        },
      },
      "352390c2-a051-4765-ab7a-7c9bc437093e": {
        id: "352390c2-a051-4765-ab7a-7c9bc437093e",
        order: 9,
        questionId: "bf346f71-4071-4b13-950f-684442837cc9",
        userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
        question: {
          id: "bf346f71-4071-4b13-950f-684442837cc9",
          options: [
            {
              id: "d7e8143f-d921-4aea-b161-b15a08a978a6",
              text: "Talk about their day",
            },
            { id: "74d26c59-5307-4db1-88f6-7dcef371baeb", text: "Watch TV" },
            {
              id: "d6335d82-64fd-4f4e-a7df-cf9d7b17ad86",
              text: "Play board games",
            },
            { id: "2a7634ca-d5a6-48de-8656-7bc99fe67c43", text: "Read books" },
          ],
          text: "What do Anna and her family do after they eat dinner?",
        },
      },
      "7c66e503-ff70-478e-bd11-2346859060da": {
        id: "7c66e503-ff70-478e-bd11-2346859060da",
        order: 4,
        questionId: "c79a7f6e-9f22-4ce4-882e-9224d89f9f64",
        userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
        question: {
          id: "c79a7f6e-9f22-4ce4-882e-9224d89f9f64",
          options: [
            {
              id: "94d05237-4f0b-47ff-a5d4-20f082d5eef1",
              text: "Stir the batter",
            },
            {
              id: "a14fc7fa-e083-4a3c-aceb-45bed0081407",
              text: "Chop vegetables",
            },
            {
              id: "d226f519-fafb-496d-a4da-df7f900440e1",
              text: "Make the salad dressing",
            },
            {
              id: "717dfab3-7504-43b9-81bf-d2a2423ab334",
              text: "Set the table",
            },
          ],
          text: "What does Anna's brother help her do?",
        },
      },
      "7d4abbb7-f667-4b40-8dc7-6b72a4839164": {
        id: "7d4abbb7-f667-4b40-8dc7-6b72a4839164",
        order: 5,
        questionId: "6b2626b5-d0cc-4500-bb40-3c32e86a08c1",
        userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
        question: {
          id: "6b2626b5-d0cc-4500-bb40-3c32e86a08c1",
          options: [
            { id: "45962939-60bc-42c4-ac55-6bd068c76a05", text: "Russian" },
            { id: "5cf995df-8794-445c-87c9-eb52e2a4886c", text: "English" },
            { id: "18d9ebfd-a11e-47be-bd66-0a271e8efd9d", text: "Spanish" },
            { id: "ec061e02-5388-4e01-a7b9-68643b6b6f64", text: "French" },
          ],
          text: "What language does Anna like to study?",
        },
      },
      "8c2c7770-8901-4dae-914a-71f17d599346": {
        id: "8c2c7770-8901-4dae-914a-71f17d599346",
        order: 8,
        questionId: "6354b25b-c439-4a99-a15b-5acbda0d4e5f",
        userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
        question: {
          id: "6354b25b-c439-4a99-a15b-5acbda0d4e5f",
          options: [
            {
              id: "7b3b8d55-1ee8-4e3c-9435-20450a56c9f7",
              text: "Do homework and help her mom",
            },
            { id: "a918f0af-9868-4ef0-bd03-9f35d2daae4d", text: "Watch TV" },
            {
              id: "dfa6f88c-2483-4d3a-9d5f-d4fddaf25835",
              text: "Play video games",
            },
            {
              id: "febfdad0-94f2-425f-b15b-1a4a9027ab4c",
              text: "Go out with friends",
            },
          ],
          text: "What does Anna usually do when she comes home from school?",
        },
      },
      "a4aa445c-0985-4536-b4b3-f1cf473f6556": {
        id: "a4aa445c-0985-4536-b4b3-f1cf473f6556",
        order: 6,
        questionId: "67ddfdd1-9c75-42c2-8e2f-953d75ca5152",
        userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
        question: {
          id: "67ddfdd1-9c75-42c2-8e2f-953d75ca5152",
          options: [
            { id: "a364ae42-9f0a-432d-adf2-7df99e631ed0", text: "Her brother" },
            {
              id: "2dae6548-3a6c-4c27-91fc-dfab87f3547c",
              text: "Her mom and dad",
            },
            { id: "2c6fb28c-2874-4e6b-8739-4a2018175c9a", text: "Her friends" },
            { id: "3e769b82-eaef-4575-bb19-8be6a58d7af4", text: "Her teacher" },
          ],
          text: "Who does Anna say 'you' to?",
        },
      },
      "c1cd814e-c4e7-49f1-811b-89869ee04669": {
        id: "c1cd814e-c4e7-49f1-811b-89869ee04669",
        order: 0,
        questionId: "023ab9c9-0e57-4f89-96a1-8bf6072d59cd",
        userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
        question: {
          id: "023ab9c9-0e57-4f89-96a1-8bf6072d59cd",
          options: [
            {
              id: "39d5eda3-8a0e-45aa-9d4d-a52f4d8b5e8c",
              text: "Anna's mom and dad",
            },
            {
              id: "553d4c68-44fc-4b5c-ada8-c3d78873a886",
              text: "Anna's brother and sister",
            },
            {
              id: "48a32a2d-a0fb-42a6-87a4-e2f8014fa3c1",
              text: "Anna's grandparents",
            },
            {
              id: "31bb47d5-141a-4bd5-a0d0-b5a5956c5162",
              text: "Anna's aunt and uncle",
            },
          ],
          text: "Who does Anna live with?",
        },
      },
      "d1fb19d9-b280-4a19-9a02-451b844e02f8": {
        id: "d1fb19d9-b280-4a19-9a02-451b844e02f8",
        order: 2,
        questionId: "7d2d8e2a-bc4a-4307-9664-914b08766098",
        userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
        question: {
          id: "7d2d8e2a-bc4a-4307-9664-914b08766098",
          options: [
            { id: "122a6a37-3dc8-4434-94e4-c2a6ac4db801", text: "Pancakes" },
            {
              id: "268a533f-02b2-4de1-a735-3eb0907ff9e0",
              text: "Meat on the grill",
            },
            { id: "140b94a7-f56f-40ee-b51a-4c7b1f58c5af", text: "Salad" },
            { id: "084d133e-e69f-4b78-928f-3cd907c4f9e9", text: "Pizza" },
          ],
          text: "What does Anna like to cook?",
        },
      },
    },
    timeCompleted: 1684716464631,
    timeStarted: 1684716464631,
    timeSummaryCompleted: 1684716464631,
    timeUnlocked: 1685212972217,
    userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
    epilogue: {
      id: "51c76980-f429-4b41-8300-22af4bee00a3",
      name: "Anna's family",
      questions: [
        {
          id: "023ab9c9-0e57-4f89-96a1-8bf6072d59cd",
          options: [
            {
              id: "39d5eda3-8a0e-45aa-9d4d-a52f4d8b5e8c",
              text: "Anna's mom and dad",
            },
            {
              id: "553d4c68-44fc-4b5c-ada8-c3d78873a886",
              text: "Anna's brother and sister",
            },
            {
              id: "48a32a2d-a0fb-42a6-87a4-e2f8014fa3c1",
              text: "Anna's grandparents",
            },
            {
              id: "31bb47d5-141a-4bd5-a0d0-b5a5956c5162",
              text: "Anna's aunt and uncle",
            },
          ],
          text: "Who does Anna live with?",
        },
      ],
      textStoryTale:
        '"Семья Анны"\n  \n      Меня зовут Анна. Я живу вместе со своей семьей: мамой, папой и братом. Моя мама зовут Катя, а папа - Иван. Мой брат Александр младше меня на два года.\n  \n      Мы любим проводить время вместе. Часто мы гуляем в парке, играем в футбол и готовим вкусную еду. Я люблю готовить блины, а папа обычно готовит мясо на гриле. Брат Александр помогает мне смешивать тесто.\n  \n      Я учусь в школе и занимаюсь каждый день. Мне нравится учиться русскому языку. Я говорю "я", когда говорю о себе, и "ты", когда обращаюсь к брату или другу. Моя мама и папа говорят "они" о других людях.\n  \n      Когда я возвращаюсь домой после школы, я обычно делаю уроки и помогаю маме приготовить ужин. Потом мы все вместе садимся за стол и едим вкусную еду, говоря о нашем дне. Я люблю мою семью и всегда рада проводить время вместе с ними.',
    },
  },
};
