import { genUid, getShuffledArray } from "../../../utils";
import { Epilogue, EpilogueQuestionAnswer } from "../../ctx.story.types";


const generateEpilogue = async (): Promise<[Epilogue, EpilogueQuestionAnswer[]]> => {
  const epilogue: Epilogue = {
    id: genUid(),
    name: "Anna's family",
    textStoryTale: `"Семья Анны"
  
      Меня зовут Анна. Я живу вместе со своей семьей: мамой, папой и братом. Моя мама зовут Катя, а папа - Иван. Мой брат Александр младше меня на два года.
  
      Мы любим проводить время вместе. Часто мы гуляем в парке, играем в футбол и готовим вкусную еду. Я люблю готовить блины, а папа обычно готовит мясо на гриле. Брат Александр помогает мне смешивать тесто.
  
      Я учусь в школе и занимаюсь каждый день. Мне нравится учиться русскому языку. Я говорю "я", когда говорю о себе, и "ты", когда обращаюсь к брату или другу. Моя мама и папа говорят "они" о других людях.
  
      Когда я возвращаюсь домой после школы, я обычно делаю уроки и помогаю маме приготовить ужин. Потом мы все вместе садимся за стол и едим вкусную еду, говоря о нашем дне. Я люблю мою семью и всегда рада проводить время вместе с ними.`,
    questions: [
      {
        id: genUid(),
        text: "Who does Anna live with?",
        options: [
          { id: genUid(), text: "Anna's mom and dad" },
          { id: genUid(), text: "Anna's brother and sister" },
          { id: genUid(), text: "Anna's grandparents" },
          { id: genUid(), text: "Anna's aunt and uncle" },
        ],
      },
      {
        id: genUid(),
        text: "What is Anna's mom's name?",
        options: [
          { id: genUid(), text: "Kate" },
          { id: genUid(), text: "Ivan" },
          { id: genUid(), text: "Alexander" },
          { id: genUid(), text: "Anna" },
        ],
      },
      {
        id: genUid(),
        text: "What does Anna like to cook?",
        options: [
          { id: genUid(), text: "Pancakes" },
          { id: genUid(), text: "Meat on the grill" },
          { id: genUid(), text: "Salad" },
          { id: genUid(), text: "Pizza" },
        ],
      },
      {
        id: genUid(),
        text: "What does Anna's dad usually cook?",
        options: [
          { id: genUid(), text: "Meat on the grill" },
          { id: genUid(), text: "Pancakes" },
          { id: genUid(), text: "Salad" },
          { id: genUid(), text: "Pizza" },
        ],
      },
      {
        id: genUid(),
        text: "What does Anna's brother help her do?",
        options: [
          { id: genUid(), text: "Stir the batter" },
          { id: genUid(), text: "Chop vegetables" },
          { id: genUid(), text: "Make the salad dressing" },
          { id: genUid(), text: "Set the table" },
        ],
      },
      {
        id: genUid(),
        text: "What language does Anna like to study?",
        options: [
          { id: genUid(), text: "Russian" },
          { id: genUid(), text: "English" },
          { id: genUid(), text: "Spanish" },
          { id: genUid(), text: "French" },
        ],
      },
      {
        id: genUid(),
        text: "Who does Anna say 'you' to?",
        options: [
          { id: genUid(), text: "Her brother" },
          { id: genUid(), text: "Her mom and dad" },
          { id: genUid(), text: "Her friends" },
          { id: genUid(), text: "Her teacher" },
        ],
      },
      {
        id: genUid(),
        text: "What pronoun do Anna's mom and dad use to refer to other people?",
        options: [
          { id: genUid(), text: "They" },
          { id: genUid(), text: "I" },
          { id: genUid(), text: "You" },
          { id: genUid(), text: "We" },
        ],
      },
      {
        id: genUid(),
        text: "What does Anna usually do when she comes home from school?",
        options: [
          { id: genUid(), text: "Do homework and help her mom" },
          { id: genUid(), text: "Watch TV" },
          { id: genUid(), text: "Play video games" },
          { id: genUid(), text: "Go out with friends" },
        ],
      },
      {
        id: genUid(),
        text: "What do Anna and her family do after they eat dinner?",
        options: [
          { id: genUid(), text: "Talk about their day" },
          { id: genUid(), text: "Watch TV" },
          { id: genUid(), text: "Play board games" },
          { id: genUid(), text: "Read books" },
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
