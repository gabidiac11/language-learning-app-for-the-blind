import { UserStoryOutput } from "../Models/output.userStory.types";

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
