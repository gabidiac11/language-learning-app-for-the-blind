import { genUid, getShuffledArray } from "../../../utils";
import {
  Epilogue,
  EpilogueQuestionAnswer,
} from "../../../Data/ctxTypes/ctx.story.types";

const generateEpilogue = async (): Promise<
  [Epilogue, EpilogueQuestionAnswer[]]
> => {
  const epilogue: Epilogue = {
    lang: "fr",
    id: genUid(),

    // NOTE: gets updated afterwards
    audioFile: "",

    name: "Anna's family",
    imageUrl:
      "https://images.pexels.com/photos/3807395/pexels-photo-3807395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageAlt: "Russian family at the dinner table",
    textStoryTale: `La famille d'Anna
  
    Mon nom est Anna. Je vis avec ma famille : maman, papa et frère. Le nom de ma mère est Katya et le nom de mon père est Ivan. Mon frère Alexandre a deux ans de moins que moi.

    Nous aimons passer du temps ensemble. Souvent, nous nous promenons dans le parc, jouons au football et cuisinons de délicieux plats. J'aime cuisiner des crêpes et mon père fait habituellement cuire de la viande sur le gril. Frère Alexandre m'aide à pétrir la pâte.

    Je vais à l'école et j'étudie tous les jours. J'aime apprendre le russe. Je dis "je" quand je parle de moi et "tu" quand je parle à un frère ou à un ami. Ma mère et mon père disent "ils" à propos des autres.

    Quand je rentre à la maison après l'école, je fais généralement mes devoirs et j'aide ma mère à préparer le dîner. Ensuite, nous nous asseyons tous ensemble à table et mangeons de délicieux plats, en parlant de notre journée. J'aime ma famille et j'aime toujours passer du temps avec eux.`,
    questions: [
      {
        lang: "fr",
        id: genUid(),
        text: "Who does Anna live with?",

        // NOTE: gets updated afterwards
        audioFile: "",

        options: [
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Anna's mom and dad",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Anna's brother and sister",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Anna's grandparents",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Anna's aunt and uncle",
          },
        ],
      },
      {
        lang: "fr",
        id: genUid(),
        text: "What is Anna's mom's name?",

        // NOTE: gets updated afterwards
        audioFile: "",

        options: [
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Kate",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Ivan",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Alexander",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Anna",
          },
        ],
      },
      {
        lang: "fr",
        id: genUid(),
        text: "What does Anna like to cook?",

        // NOTE: gets updated afterwards
        audioFile: "",

        options: [
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Pancakes",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Meat on the grill",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Salad",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Pizza",
          },
        ],
      },
      {
        lang: "fr",
        id: genUid(),
        text: "What does Anna's dad usually cook?",

        // NOTE: gets updated afterwards
        audioFile: "",

        options: [
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Meat on the grill",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Pancakes",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Salad",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Pizza",
          },
        ],
      },
      {
        lang: "fr",
        id: genUid(),
        text: "What does Anna's brother help her do?",

        // NOTE: gets updated afterwards
        audioFile: "",

        options: [
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Stir the batter",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Chop vegetables",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Make the salad dressing",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Set the table",
          },
        ],
      },
      {
        lang: "fr",
        id: genUid(),
        text: "What language does Anna like to study?",

        // NOTE: gets updated afterwards
        audioFile: "",

        options: [
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Russian",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "English",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Spanish",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "French",
          },
        ],
      },
      {
        lang: "fr",
        id: genUid(),
        text: "Who does Anna say 'you' to?",

        // NOTE: gets updated afterwards
        audioFile: "",

        options: [
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Her brother",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Her mom and dad",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Her friends",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Her teacher",
          },
        ],
      },
      {
        lang: "fr",
        id: genUid(),
        text: "What pronoun do Anna's mom and dad use to refer to other people?",

        // NOTE: gets updated afterwards
        audioFile: "",

        options: [
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "They",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "I",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "You",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "We",
          },
        ],
      },
      {
        lang: "fr",
        id: genUid(),
        text: "What does Anna usually do when she comes home from school?",

        // NOTE: gets updated afterwards
        audioFile: "",

        options: [
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Do homework and help her mom",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Watch TV",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Play video games",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Go out with friends",
          },
        ],
      },
      {
        lang: "fr",
        id: genUid(),
        text: "What do Anna and her family do after they eat dinner?",

        // NOTE: gets updated afterwards
        audioFile: "",

        options: [
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Talk about their day",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Watch TV",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Play board games",
          },
          {
            // NOTE: gets updated afterwards
            audioFile: "",

            id: genUid(),
            text: "Read books",
          },
        ],
      },
    ],
  };

  const questionAnswers: EpilogueQuestionAnswer[] = [];
  for (const question of epilogue.questions) {
    /*
      NOTE 1.): always first option at this point is the one correct
      Note 2.): 
      given 1. and because genUid() is basically does increse and return of a counter
      someone can easily figure out the correct option id by noticing the smallest id is the correct one
      -> so we'll generate a random order of generating ids for each option so that's out fo the discussion
      because cheating stands against everything this represents!!!
    */
    const randomOrderedIndexes = getShuffledArray(
      question.options.map((item, index) => index)
    );
    for (let index of randomOrderedIndexes) {
      question.options[index].id = genUid();
    }

    const answer: EpilogueQuestionAnswer = {
      id: genUid(),
      questionId: question.id,
      correctOptionId: question.options[0].id,
    };
    questionAnswers.push(answer);
  }

  guardAllQuestionsHaveAnswer(epilogue, questionAnswers);

  return [epilogue, questionAnswers];
};

/**
 * check consistency between data
 * @param epilogue
 * @param questionAnswers
 */
function guardAllQuestionsHaveAnswer(
  epilogue: Epilogue,
  questionAnswers: EpilogueQuestionAnswer[]
) {
  console.log(`Started checking epilogue for data consistency`);

  epilogue.questions.forEach((question) => {
    const answer = questionAnswers.find((a) => a.questionId === question.id);
    if (!answer) {
      console.log(
        `No answer for epilogue question ${question.id}, ${question.text}`,
        { question, questionAnswers }
      );
      throw Error(
        `No answer for epilogue question ${question.id}, ${question.text}`
      );
    }

    const correctOption = question.options.find(
      (o) => o.id === answer.correctOptionId
    );
    if (!correctOption) {
      console.log(
        `Answer doesn't provide correct option for epilogue question ${
          question.id
        }, ${question.text}. Answer: ${JSON.stringify(answer)}`,
        { question, questionAnswers }
      );
      throw Error(
        `Answer doesn't provide correct option for epilogue question ${
          question.id
        }, ${question.text}. Answer: ${JSON.stringify(answer)}`
      );
    }
  });
}

export default generateEpilogue;
