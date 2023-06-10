import {
  LanguageData,
  LanguageDataItem,
} from "../Data/ctxTypes/ctx.story.types";
import {
  BuildingBlockProgressOutput,
  EpilogueProgressOutput,
  UserStoryOutput,
} from "../Models/output.userStory.types";
import {
  QuizCompletedStatsResponse,
  QuizResponse,
} from "../Models/quiz.models";
import {
  AudioUserCommandType,
  UserVoiceCommandResponse,
} from "../Models/voiceCommand.types";

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
  imageAlt: "image alt",
  name: "My family #1",
  numOfBlocksCompleted: 7,
  numOfTotalBlocks: 7,
  order: 0,
  storyId: "ca4e66d9-1d53-44cd-bc1d-b2cd9f035f3c",
  timeCompleted: 1684716464631,
  timeStarted: 1684716464631,
  timeUnlocked: 1684716464631,
  audioFile: ":path-to-storage/stories/:lang/:story.mp3",
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
            audioFileTranslation:
              ":path-to-storage/stories/:lang/:story/:block/words/:word-translation.mp3",
            audioFile:
              ":path-to-storage/stories/:lang/:story/:block/words/:word.mp3",

            id: "62364798-e974-4739-ad8e-b3aac079fed5",

            longTranslation:
              "A group consisting of parents and children living together in a household",
            shortTranslation: "family",
            text: "семьей",
            lang: "ru",
          },
          lang: "ru",
        },
      ],
      block: {
        audioFile: ":path-to-storage/stories/:lang/:story/:block.mp3",
        id: "2f1407f7-5d62-43e0-a7ea-1520bebdddf2",
        idsItemsDependentOnThis: [
          "28e74a16-6114-4c50-815e-631cfd7b3a5e",
          "c22b3077-b670-4ac8-8f21-a0a10125cb9e",
        ],
        imageUrl:
          "some url/3807561/pexels-photo-3807561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        imageAlt: "image alt",
        isStarter: true,
        name: "Family",
        words: [
          {
            audioFileTranslation:
              ":path-to-storage/stories/:lang/:story/:block/words/:word-translation.mp3",
            audioFile:
              ":path-to-storage/stories/:lang/:story/:block/words/:word.mp3",
            id: "62364798-e974-4739-ad8e-b3aac079fed5",

            longTranslation:
              "A group consisting of parents and children living together in a household",
            shortTranslation: "family",
            text: "семьей",
            lang: "ru",
          },
        ],
        lang: "ru",
      },
      lang: "ru",
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
          audioFile:
            ":path-to-storage/stories/:lang/:story/epilogue/:question.mp3",
          id: "023ab9c9-0e57-4f89-96a1-8bf6072d59cd",
          options: [
            {
              id: "39d5eda3-8a0e-45aa-9d4d-a52f4d8b5e8c",
              text: "Anna's mom and dad",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
            {
              id: "553d4c68-44fc-4b5c-ada8-c3d78873a886",
              text: "Anna's brother and sister",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
            {
              id: "48a32a2d-a0fb-42a6-87a4-e2f8014fa3c1",
              text: "Anna's grandparents",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
            {
              id: "31bb47d5-141a-4bd5-a0d0-b5a5956c5162",
              text: "Anna's aunt and uncle",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
          ],
          text: "Who does Anna live with?",
          lang: "ru",
        },
        lang: "ru",
      },
    ],
    timeCompleted: 1684716464631,
    timeStarted: 1684716464631,
    timeSummaryCompleted: 1684716464631,
    timeUnlocked: 1684716464631,
    userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
    epilogue: {
      audioFile: ":path-to-storage/stories/:lang/:story/epilogue/epilogue.mp3",
      id: "51c76980-f429-4b41-8300-22af4bee00a3",
      name: "Anna's family",
      imageUrl: "https://dummy-link",
      imageAlt: "Russian family at the dinner table",

      questions: [
        {
          id: "023ab9c9-0e57-4f89-96a1-8bf6072d59cd",
          audioFile:
            ":path-to-storage/stories/:lang/:story/epilogue/:question.mp3",
          options: [
            {
              id: "39d5eda3-8a0e-45aa-9d4d-a52f4d8b5e8c",
              text: "Anna's mom and dad",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
            {
              id: "553d4c68-44fc-4b5c-ada8-c3d78873a886",
              text: "Anna's brother and sister",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
            {
              id: "48a32a2d-a0fb-42a6-87a4-e2f8014fa3c1",
              text: "Anna's grandparents",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
            {
              id: "31bb47d5-141a-4bd5-a0d0-b5a5956c5162",
              text: "Anna's aunt and uncle",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
          ],
          text: "Who does Anna live with?",
          lang: "ru",
        },
      ],
      textStoryTale:
        '"Семья Анны"\n  \n      Меня зовут Анна. Я живу вместе со своей семьей: мамой, папой и братом. Моя мама зовут Катя, а папа - Иван. Мой брат Александр младше меня на два года.\n  \n      Мы любим проводить время вместе. Часто мы гуляем в парке, играем в футбол и готовим вкусную еду. Я люблю готовить блины, а папа обычно готовит мясо на гриле. Брат Александр помогает мне смешивать тесто.\n  \n      Я учусь в школе и занимаюсь каждый день. Мне нравится учиться русскому языку. Я говорю "я", когда говорю о себе, и "ты", когда обращаюсь к брату или другу. Моя мама и папа говорят "они" о других людях.\n  \n      Когда я возвращаюсь домой после школы, я обычно делаю уроки и помогаю маме приготовить ужин. Потом мы все вместе садимся за стол и едим вкусную еду, говоря о нашем дне. Я люблю мою семью и всегда рада проводить время вместе с ними.',
      lang: "ru",
    },
    lang: "ru",
  },
  lang: "ru",
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
  playableApiMessages: [],
  previousQuestionOutcomePlaybaleMessages: [],
  quizCompleted: false,
  lang: "ru",
};

export const epilogueQuizRequestQuestionExampleCompleted: QuizResponse = {
  quizCompleted: true,
  quizId: "aeec4d13-3cc3-429c-bcdd-ef4333eab5d4",
  previouslyQuestion_CorrectOptionId: "94e1ff5c-9e37-4b71-a84a-21916f9c5847",
  previousQuestionOutcomePlaybaleMessages: [
    {
      filePath: "",
      text: "Right answer. Next question is...",
      uniqueName: "quizYouAnsweredRight",
    },
  ],

  options: [],
  questionId: "",
  questionText: "",
  lang: "ru",

  playableApiMessages: [],
};

export const epilogueCompletedResponse: QuizCompletedStatsResponse = {
  blockCompletedStoryRefId: "e99cf33b-d850-438f-9324-356c4b3f4116",
  userStoriesUnlocked: [userStory],
  playableApiMessages: [],
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
        audioFile:
          ":path-to-storage/stories/:lang/:story/epilogue/:question.mp3",
        id: "471dff51-c04b-4c76-8c12-ef9aa97d2a8b",
        options: [
          {
            id: "91910c90-6458-4938-bf5f-e5dcecbea4ba",
            text: "Anna's mom and dad",
            audioFile:
              ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
          },
          {
            id: "908c8be1-6915-49f8-b9fd-cbfaa977c66f",
            text: "Anna's brother and sister",
            audioFile:
              ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
          },
          {
            id: "3fd4e238-90c1-4290-8eb7-46cde353ada8",
            text: "Anna's grandparents",
            audioFile:
              ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
          },
          {
            id: "d5c34512-dce8-45de-a8f3-40777465e522",
            text: "Anna's aunt and uncle",
            audioFile:
              ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
          },
        ],
        text: "Who does Anna live with?",
        lang: "ru",
      },
      lang: "ru",
    },
  ],
  timeCompleted: 1685209698600,
  timeStarted: 1685204295040,
  timeSummaryCompleted: 1685204294895,
  timeUnlocked: 1684716464631,
  userStoryId: "aa278c3d-f899-4c19-9a88-a3ff519df1a2",
  epilogue: {
    audioFile: ":path-to-storage/stories/:lang/:story/epilogue/epilogue.mp3",
    id: "205cdadc-b1e2-481a-a88a-0fb88cb250ca",
    name: "Anna's family",
    imageUrl: "https://dummy-link",
    imageAlt: "Russian family at the dinner table",
    questions: [
      {
        id: "471dff51-c04b-4c76-8c12-ef9aa97d2a8b",
        audioFile:
          ":path-to-storage/stories/:lang/:story/epilogue/:question.mp3",
        options: [
          {
            id: "91910c90-6458-4938-bf5f-e5dcecbea4ba",
            text: "Anna's mom and dad",
            audioFile:
              ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
          },
          {
            id: "908c8be1-6915-49f8-b9fd-cbfaa977c66f",
            text: "Anna's brother and sister",
            audioFile:
              ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
          },
          {
            id: "3fd4e238-90c1-4290-8eb7-46cde353ada8",
            text: "Anna's grandparents",
            audioFile:
              ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
          },
          {
            id: "d5c34512-dce8-45de-a8f3-40777465e522",
            text: "Anna's aunt and uncle",
            audioFile:
              ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
          },
        ],
        text: "Who does Anna live with?",
        lang: "ru",
      },
    ],
    textStoryTale:
      '"Семья Анны"\n  \n      Меня зовут Анна. Я живу вместе со своей семьей: мамой, папой и братом. Моя мама зовут Катя, а папа - Иван. Мой брат Александр младше меня на два года.\n  \n      Мы любим проводить время вместе. Часто мы гуляем в парке, играем в футбол и готовим вкусную еду. Я люблю готовить блины, а папа обычно готовит мясо на гриле. Брат Александр помогает мне смешивать тесто.\n  \n      Я учусь в школе и занимаюсь каждый день. Мне нравится учиться русскому языку. Я говорю "я", когда говорю о себе, и "ты", когда обращаюсь к брату или другу. Моя мама и папа говорят "они" о других людях.\n  \n      Когда я возвращаюсь домой после школы, я обычно делаю уроки и помогаю маме приготовить ужин. Потом мы все вместе садимся за стол и едим вкусную еду, говоря о нашем дне. Я люблю мою семью и всегда рада проводить время вместе с ними.',
    lang: "ru",
  },
  lang: "ru",
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
        audioFileTranslation:
          ":path-to-storage/stories/:lang/:story/:block/words/:word-translation.mp3",
        audioFile:
          ":path-to-storage/stories/:lang/:story/:block/words/:word.mp3",
        id: "62364798-e974-4739-ad8e-b3aac079fed5",

        longTranslation:
          "A group consisting of parents and children living together in a household",
        shortTranslation: "family",
        text: "семьей",
        lang: "ru",
      },
      lang: "ru",
    },
  ],
  block: {
    audioFile: ":path-to-storage/stories/:lang/:story/:block.mp3",
    id: "2f1407f7-5d62-43e0-a7ea-1520bebdddf2",
    idsItemsDependentOnThis: [
      "28e74a16-6114-4c50-815e-631cfd7b3a5e",
      "c22b3077-b670-4ac8-8f21-a0a10125cb9e",
    ],
    imageUrl:
      // TODO: remove all image references
      "https://images.pexels.com/photos/3807561/pexels-photo-3807561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageAlt: "image alt",
    isStarter: true,
    name: "Family",
    words: [
      {
        id: "62364798-e974-4739-ad8e-b3aac079fed5",

        audioFileTranslation:
          ":path-to-storage/stories/:lang/:story/:block/words/:word-translation.mp3",
        audioFile:
          ":path-to-storage/stories/:lang/:story/:block/words/:word.mp3",

        longTranslation:
          "A group consisting of parents and children living together in a household",
        shortTranslation: "family",
        text: "семьей",
        lang: "ru",
      },
    ],
    lang: "ru",
  },
  lang: "ru",
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
  lang: "ru",
  playableApiMessages: [],
  previousQuestionOutcomePlaybaleMessages: [],
};

export const blockQuizRequestQuestionExampleCompleted: QuizResponse = {
  options: [],
  questionId: "",
  questionText: "",
  quizId: "64c65e06-988b-4964-8acd-cb79c086e44e",
  quizCompleted: true,
  previouslyQuestion_CorrectOptionId: "8c1c3c58-1bb5-408e-ac1d-83daaaa69be5",
  previousQuestionOutcomePlaybaleMessages: [
    {
      filePath: "",
      text: "Right answer. Next question is...",
      uniqueName: "quizYouAnsweredRight",
    },
  ],
  lang: "ru",
  playableApiMessages: [],
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
          audioFileTranslation:
            ":path-to-storage/stories/:lang/:story/:block/words/:word-translation.mp3",
          audioFile:
            ":path-to-storage/stories/:lang/:story/:block/words/:word.mp3",
          id: "a7d239a7-3451-4871-8e4c-61e1baa00655",

          longTranslation: "Preferred over all others of the same kind",
          shortTranslation: "favorite",
          text: "любим",
          lang: "ru",
        },
        lang: "ru",
      },
    },
    block: {
      audioFile: ":path-to-storage/stories/:lang/:story/:block.mp3",
      id: "2f1407f7-5d62-43e0-a7ea-1520bebdddf2",
      idsItemsDependentOnThis: [
        "28e74a16-6114-4c50-815e-631cfd7b3a5e",
        "c22b3077-b670-4ac8-8f21-a0a10125cb9e",
      ],
      imageUrl:
        "https://images.pexels.com/photos/3807561/pexels-photo-3807561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      imageAlt: "image alt",
      isStarter: true,
      name: "Family",
      words: [
        {
          id: "62364798-e974-4739-ad8e-b3aac079fed5",

          audioFileTranslation:
            ":path-to-storage/stories/:lang/:story/:block/words/:word-translation.mp3",
          audioFile:
            ":path-to-storage/stories/:lang/:story/:block/words/:word.mp3",

          longTranslation:
            "A group consisting of parents and children living together in a household",
          shortTranslation: "family",
          text: "семьей",
          lang: "ru",
        },
      ],
      lang: "ru",
    },
    lang: "ru",
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
            audioFileTranslation:
              ":path-to-storage/stories/:lang/:story/:block/words/:word-translation.mp3",
            audioFile:
              ":path-to-storage/stories/:lang/:story/:block/words/:word.mp3",
            id: "d75ba16c-279d-4ee1-9526-297c4fc001e8",

            longTranslation: "A female given name",
            shortTranslation: "Katya",
            text: "Катя",
            lang: "ru",
          },
          lang: "ru",
        },
      },
      block: {
        audioFile: ":path-to-storage/stories/:lang/:story/:block.mp3",
        id: "28e74a16-6114-4c50-815e-631cfd7b3a5e",
        imageUrl:
          "https://images.pexels.com/photos/4700108/pexels-photo-4700108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        imageAlt: "image alt",
        isStarter: false,
        name: "Names",
        words: [
          {
            id: "4087672f-6426-4db7-a8e9-649282b5e207",

            audioFileTranslation:
              ":path-to-storage/stories/:lang/:story/:block/words/:word-translation.mp3",
            audioFile:
              ":path-to-storage/stories/:lang/:story/:block/words/:word.mp3",

            longTranslation: "A female given name",
            shortTranslation: "Anna",
            text: "Анна",
            lang: "ru",
          },
        ],
        lang: "ru",
      },
      lang: "ru",
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
            audioFileTranslation:
              ":path-to-storage/stories/:lang/:story/:block/words/:word-translation.mp3",
            audioFile:
              ":path-to-storage/stories/:lang/:story/:block/words/:word.mp3",
            id: "7bd64e35-4f23-4f82-8654-201e5f5b9216",

            longTranslation:
              "Used to indicate possession of something by a female speaker.",
            shortTranslation: "my",
            text: "Моя",
            lang: "ru",
          },
          lang: "ru",
        },
      },
      block: {
        audioFile: ":path-to-storage/stories/:lang/:story/:block.mp3",
        id: "c22b3077-b670-4ac8-8f21-a0a10125cb9e",
        idsItemsDependentOnThis: ["f876cde3-feaa-41dc-9720-d18f8eb975a9"],
        imageUrl:
          "https://images.pexels.com/photos/5912615/pexels-photo-5912615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        imageAlt: "image alt",
        isStarter: false,
        name: "Pronouns",
        words: [
          {
            id: "b2eaf1ad-1af7-4546-ab28-438a1bf4e0bb",

            audioFileTranslation:
              ":path-to-storage/stories/:lang/:story/:block/words/:word-translation.mp3",
            audioFile:
              ":path-to-storage/stories/:lang/:story/:block/words/:word.mp3",

            longTranslation:
              "Used when referring to oneself as the object of a verb or preposition.",
            shortTranslation: "me",
            text: "Меня",
            lang: "ru",
          },
          {
            id: "181a2f80-7c69-481c-b841-899cf0de2b20",

            audioFileTranslation:
              ":path-to-storage/stories/:lang/:story/:block/words/:word-translation.mp3",
            audioFile:
              ":path-to-storage/stories/:lang/:story/:block/words/:word.mp3",

            longTranslation:
              "Used when referring to oneself as the subject of a verb.",
            shortTranslation: "I",
            text: "Я",
            lang: "ru",
          },
          {
            id: "f1bbebee-3863-42b1-93ac-766d8773811b",

            audioFileTranslation:
              ":path-to-storage/stories/:lang/:story/:block/words/:word-translation.mp3",
            audioFile:
              ":path-to-storage/stories/:lang/:story/:block/words/:word.mp3",

            longTranslation:
              "Used to indicate possession of something by the speaker.",
            shortTranslation: "with my",
            text: "со своей",
            lang: "ru",
          },
          {
            id: "7bd64e35-4f23-4f82-8654-201e5f5b9216",

            audioFileTranslation:
              ":path-to-storage/stories/:lang/:story/:block/words/:word-translation.mp3",
            audioFile:
              ":path-to-storage/stories/:lang/:story/:block/words/:word.mp3",

            longTranslation:
              "Used to indicate possession of something by a female speaker.",
            shortTranslation: "my",
            text: "Моя",
            lang: "ru",
          },
          {
            id: "5d8a474c-c8ff-464d-ae5b-a276b23c81b0",

            audioFileTranslation:
              ":path-to-storage/stories/:lang/:story/:block/words/:word-translation.mp3",
            audioFile:
              ":path-to-storage/stories/:lang/:story/:block/words/:word.mp3",

            longTranslation:
              "Used to indicate possession of something by a male speaker.",
            shortTranslation: "my",
            text: "Мой",
            lang: "ru",
          },
          {
            id: "81d2f1f3-1ff1-4168-8f70-e724bc4e1c21",

            audioFileTranslation:
              ":path-to-storage/stories/:lang/:story/:block/words/:word-translation.mp3",
            audioFile:
              ":path-to-storage/stories/:lang/:story/:block/words/:word.mp3",

            longTranslation:
              "Used when referring to oneself as the object of a verb or preposition.",
            shortTranslation: "me",
            text: "меня",
            lang: "ru",
          },
          {
            id: "4fcbf441-dd4c-4776-a862-06afc06893ca",

            audioFileTranslation:
              ":path-to-storage/stories/:lang/:story/:block/words/:word-translation.mp3",
            audioFile:
              ":path-to-storage/stories/:lang/:story/:block/words/:word.mp3",

            longTranslation:
              "Used when referring to oneself and others as the subject of a verb.",
            shortTranslation: "we",
            text: "Мы",
            lang: "ru",
          },
          {
            id: "4bf66549-6c5a-488d-8f52-972ae91fe426",

            audioFileTranslation:
              ":path-to-storage/stories/:lang/:story/:block/words/:word-translation.mp3",
            audioFile:
              ":path-to-storage/stories/:lang/:story/:block/words/:word.mp3",

            longTranslation:
              "Used when referring to oneself as the recipient of an action.",
            shortTranslation: "to me",
            text: "мне",
            lang: "ru",
          },
        ],
        lang: "ru",
      },
      lang: "ru",
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
          audioFile:
            ":path-to-storage/stories/:lang/:story/epilogue/:question.mp3",
          id: "d2cc9a07-91a9-4d16-8b1a-1e0ed3f53f7b",
          options: [
            {
              id: "33563cd0-6be8-4c88-b810-62b047150b91",
              text: "Kate",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
            {
              id: "779e8dd9-6805-4ef1-ad21-464a092b2dc2",
              text: "Ivan",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
            {
              id: "d96556b6-deae-4744-b001-abe326fbf86e",
              text: "Alexander",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
            {
              id: "d7a746b0-373f-404c-be9a-ae7b99ddbffa",
              text: "Anna",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
          ],
          text: "What is Anna's mom's name?",
          lang: "ru",
        },
        lang: "ru",
      },
      "33adb5e6-36ba-441c-af9b-cbd42cb45aa4": {
        id: "33adb5e6-36ba-441c-af9b-cbd42cb45aa4",
        order: 3,
        questionId: "c2f178c3-cbb3-4a6b-8013-8758f1a19fb6",
        userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
        question: {
          audioFile:
            ":path-to-storage/stories/:lang/:story/epilogue/:question.mp3",
          id: "c2f178c3-cbb3-4a6b-8013-8758f1a19fb6",
          options: [
            {
              id: "9fa15979-34fc-445f-b953-a82afcb15e01",
              text: "Meat on the grill",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
            {
              id: "25a3d8bf-ce47-4635-9991-3ba189aca8ad",
              text: "Pancakes",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
            {
              id: "479c74ff-b6d7-4c19-976e-89bb4123de21",
              text: "Salad",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
            {
              id: "1a5d5296-28c0-4e2e-bac1-f15004819f85",
              text: "Pizza",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
          ],
          text: "What does Anna's dad usually cook?",
          lang: "ru",
        },
        lang: "ru",
      },
      "352390c2-a051-4765-ab7a-7c9bc437093e": {
        id: "352390c2-a051-4765-ab7a-7c9bc437093e",
        order: 9,
        questionId: "bf346f71-4071-4b13-950f-684442837cc9",
        userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
        question: {
          audioFile:
            ":path-to-storage/stories/:lang/:story/epilogue/:question.mp3",
          id: "bf346f71-4071-4b13-950f-684442837cc9",
          options: [
            {
              id: "d7e8143f-d921-4aea-b161-b15a08a978a6",
              text: "Talk about their day",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
            {
              id: "74d26c59-5307-4db1-88f6-7dcef371baeb",
              text: "Watch TV",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
            {
              id: "d6335d82-64fd-4f4e-a7df-cf9d7b17ad86",
              text: "Play board games",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
            {
              id: "2a7634ca-d5a6-48de-8656-7bc99fe67c43",
              text: "Read books",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
          ],
          text: "What do Anna and her family do after they eat dinner?",
          lang: "ru",
        },
        lang: "ru",
      },
    },
    timeCompleted: 1684716464631,
    timeStarted: 1684716464631,
    timeSummaryCompleted: 1684716464631,
    timeUnlocked: 1685212972217,
    userStoryId: "c0afe77d-8cbe-4a16-9e71-efb4a3a01b82",
    epilogue: {
      audioFile: ":path-to-storage/stories/:lang/:story/epilogue/epilogue.mp3",
      id: "51c76980-f429-4b41-8300-22af4bee00a3",
      name: "Anna's family",
      imageUrl: "https://dummy-link",
      imageAlt: "Russian family at the dinner table",
      questions: [
        {
          id: "023ab9c9-0e57-4f89-96a1-8bf6072d59cd",
          audioFile:
            ":path-to-storage/stories/:lang/:story/epilogue/:question.mp3",
          options: [
            {
              id: "39d5eda3-8a0e-45aa-9d4d-a52f4d8b5e8c",
              text: "Anna's mom and dad",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
            {
              id: "553d4c68-44fc-4b5c-ada8-c3d78873a886",
              text: "Anna's brother and sister",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
            {
              id: "48a32a2d-a0fb-42a6-87a4-e2f8014fa3c1",
              text: "Anna's grandparents",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
            {
              id: "31bb47d5-141a-4bd5-a0d0-b5a5956c5162",
              text: "Anna's aunt and uncle",
              audioFile:
                ":path-to-storage/stories/:lang/:story/epilogue/:question-option:name.mp3",
            },
          ],
          text: "Who does Anna live with?",
          lang: "ru",
        },
      ],
      textStoryTale:
        '"Семья Анны"\n  \n      Меня зовут Анна. Я живу вместе со своей семьей: мамой, папой и братом. Моя мама зовут Катя, а папа - Иван. Мой брат Александр младше меня на два года.\n  \n      Мы любим проводить время вместе. Часто мы гуляем в парке, играем в футбол и готовим вкусную еду. Я люблю готовить блины, а папа обычно готовит мясо на гриле. Брат Александр помогает мне смешивать тесто.\n  \n      Я учусь в школе и занимаюсь каждый день. Мне нравится учиться русскому языку. Я говорю "я", когда говорю о себе, и "ты", когда обращаюсь к брату или другу. Моя мама и папа говорят "они" о других людях.\n  \n      Когда я возвращаюсь домой после школы, я обычно делаю уроки и помогаю маме приготовить ужин. Потом мы все вместе садимся за стол и едим вкусную еду, говоря о нашем дне. Я люблю мою семью и всегда рада проводить время вместе с ними.',
      lang: "ru",
    },
    lang: "ru",
  },
  playableApiMessages: [],
};

export const languages: LanguageDataItem[] = [
  {
    id: "ru",
    name: "Russian",
    active: true,
    imageUrl:
      "https://images.pexels.com/photos/3810971/pexels-photo-3810971.jpeg",
    alt: "Russian church image.",
    order: 0,
  },
  {
    id: "fr",
    name: "French",
    active: true,
    imageUrl:
      "https://images.pexels.com/photos/4983083/pexels-photo-4983083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "French Eiffel Tower and a flower by.",
    order: 1,
  },
  {
    id: "de",
    name: "German",
    active: true,
    imageUrl:
      "https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "German flag image.",
    order: 2,
  },
];
