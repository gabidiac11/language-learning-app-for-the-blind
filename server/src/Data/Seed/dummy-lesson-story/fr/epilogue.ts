import { genUid, getShuffledArray } from "../../../../utils";
import { Epilogue, EpilogueQuestionAnswer } from "../../../ctxTypes/ctx.story.types";

const generateEpilogue = async (): Promise<
  [Epilogue, EpilogueQuestionAnswer[]]
> => {
  const epilogue: Epilogue = {
    lang: "fr",
    id: genUid(),
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
        options: [
          {
            lang: "fr",
            id: genUid(),
            text: "Anna's mom and dad",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Anna's brother and sister",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Anna's grandparents",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Anna's aunt and uncle",
          },
        ],
      },
      {
        lang: "fr",
        id: genUid(),
        text: "What is Anna's mom's name?",
        options: [
          {
            lang: "fr",
            id: genUid(),
            text: "Kate",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Ivan",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Alexander",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Anna",
          },
        ],
      },
      {
        lang: "fr",
        id: genUid(),
        text: "What does Anna like to cook?",
        options: [
          {
            lang: "fr",
            id: genUid(),
            text: "Pancakes",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Meat on the grill",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Salad",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Pizza",
          },
        ],
      },
      {
        lang: "fr",
        id: genUid(),
        text: "What does Anna's dad usually cook?",
        options: [
          {
            lang: "fr",
            id: genUid(),
            text: "Meat on the grill",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Pancakes",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Salad",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Pizza",
          },
        ],
      },
      {
        lang: "fr",
        id: genUid(),
        text: "What does Anna's brother help her do?",
        options: [
          {
            lang: "fr",
            id: genUid(),
            text: "Stir the batter",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Chop vegetables",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Make the salad dressing",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Set the table",
          },
        ],
      },
      {
        lang: "fr",
        id: genUid(),
        text: "What language does Anna like to study?",
        options: [
          {
            lang: "fr",
            id: genUid(),
            text: "Russian",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "English",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Spanish",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "French",
          },
        ],
      },
      {
        lang: "fr",
        id: genUid(),
        text: "Who does Anna say 'you' to?",
        options: [
          {
            lang: "fr",
            id: genUid(),
            text: "Her brother",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Her mom and dad",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Her friends",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Her teacher",
          },
        ],
      },
      {
        lang: "fr",
        id: genUid(),
        text: "What pronoun do Anna's mom and dad use to refer to other people?",
        options: [
          {
            lang: "fr",
            id: genUid(),
            text: "They",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "I",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "You",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "We",
          },
        ],
      },
      {
        lang: "fr",
        id: genUid(),
        text: "What does Anna usually do when she comes home from school?",
        options: [
          {
            lang: "fr",
            id: genUid(),
            text: "Do homework and help her mom",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Watch TV",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Play video games",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Go out with friends",
          },
        ],
      },
      {
        lang: "fr",
        id: genUid(),
        text: "What do Anna and her family do after they eat dinner?",
        options: [
          {
            lang: "fr",
            id: genUid(),
            text: "Talk about their day",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Watch TV",
          },
          {
            lang: "fr",
            id: genUid(),
            text: "Play board games",
          },
          {
            lang: "fr",
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
