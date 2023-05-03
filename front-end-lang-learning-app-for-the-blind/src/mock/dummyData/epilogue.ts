import {
  Epilogue,
  EpilogueQuestionAnswer,
} from "../../context/contextTypes/ctxTypes";
import { getShuffledArray } from "../../utils";
import { genId } from "../mockContext";

const epilogue = (): [Epilogue, EpilogueQuestionAnswer[]] => {
  const epilogue: Epilogue = {
    id: genId(),
    name: "Anna's family",
    textStoryTale: `"Семья Анны"
  
      Меня зовут Анна. Я живу вместе со своей семьей: мамой, папой и братом. Моя мама зовут Катя, а папа - Иван. Мой брат Александр младше меня на два года.
  
      Мы любим проводить время вместе. Часто мы гуляем в парке, играем в футбол и готовим вкусную еду. Я люблю готовить блины, а папа обычно готовит мясо на гриле. Брат Александр помогает мне смешивать тесто.
  
      Я учусь в школе и занимаюсь каждый день. Мне нравится учиться русскому языку. Я говорю "я", когда говорю о себе, и "ты", когда обращаюсь к брату или другу. Моя мама и папа говорят "они" о других людях.
  
      Когда я возвращаюсь домой после школы, я обычно делаю уроки и помогаю маме приготовить ужин. Потом мы все вместе садимся за стол и едим вкусную еду, говоря о нашем дне. Я люблю мою семью и всегда рада проводить время вместе с ними.`,
    questions: [
      {
        id: genId(),
        text: "Who does Anna live with?",
        options: [
          { id: genId(), text: "Anna's mom and dad" },
          { id: genId(), text: "Anna's brother and sister" },
          { id: genId(), text: "Anna's grandparents" },
          { id: genId(), text: "Anna's aunt and uncle" },
        ],
      },
      {
        id: genId(),
        text: "What is Anna's mom's name?",
        options: [
          { id: genId(), text: "Kate" },
          { id: genId(), text: "Ivan" },
          { id: genId(), text: "Alexander" },
          { id: genId(), text: "Anna" },
        ],
      },
      {
        id: genId(),
        text: "What does Anna like to cook?",
        options: [
          { id: genId(), text: "Pancakes" },
          { id: genId(), text: "Meat on the grill" },
          { id: genId(), text: "Salad" },
          { id: genId(), text: "Pizza" },
        ],
      },
      {
        id: genId(),
        text: "What does Anna's dad usually cook?",
        options: [
          { id: genId(), text: "Meat on the grill" },
          { id: genId(), text: "Pancakes" },
          { id: genId(), text: "Salad" },
          { id: genId(), text: "Pizza" },
        ],
      },
      {
        id: genId(),
        text: "What does Anna's brother help her do?",
        options: [
          { id: genId(), text: "Stir the batter" },
          { id: genId(), text: "Chop vegetables" },
          { id: genId(), text: "Make the salad dressing" },
          { id: genId(), text: "Set the table" },
        ],
      },
      {
        id: genId(),
        text: "What language does Anna like to study?",
        options: [
          { id: genId(), text: "Russian" },
          { id: genId(), text: "English" },
          { id: genId(), text: "Spanish" },
          { id: genId(), text: "French" },
        ],
      },
      {
        id: genId(),
        text: "Who does Anna say 'you' to?",
        options: [
          { id: genId(), text: "Her brother" },
          { id: genId(), text: "Her mom and dad" },
          { id: genId(), text: "Her friends" },
          { id: genId(), text: "Her teacher" },
        ],
      },
      {
        id: genId(),
        text: "What pronoun do Anna's mom and dad use to refer to other people?",
        options: [
          { id: genId(), text: "They" },
          { id: genId(), text: "I" },
          { id: genId(), text: "You" },
          { id: genId(), text: "We" },
        ],
      },
      {
        id: genId(),
        text: "What does Anna usually do when she comes home from school?",
        options: [
          { id: genId(), text: "Do homework and help her mom" },
          { id: genId(), text: "Watch TV" },
          { id: genId(), text: "Play video games" },
          { id: genId(), text: "Go out with friends" },
        ],
      },
      {
        id: genId(),
        text: "What do Anna and her family do after they eat dinner?",
        options: [
          { id: genId(), text: "Talk about their day" },
          { id: genId(), text: "Watch TV" },
          { id: genId(), text: "Play board games" },
          { id: genId(), text: "Read books" },
        ],
      },
    ],
  };

  const questionAnswers: EpilogueQuestionAnswer[] = epilogue.questions.map(
    (question) => {
      /*
      NOTE 1.): always first option at this point is the one correct
      Note 2.): 
      given 1. and because genId() is basically does increse and return of a counter
      someone can easily figure out the correct option id by noticing the smallest id is the correct one
      -> so we'll generate a random order of generating ids for each option so that's out fo the discussion
      because cheating stands against everything this represents!!!
    */
      const randomOrderedIndexes = getShuffledArray(
        question.options.map((item, index) => index)
      );
      randomOrderedIndexes.forEach((index) => {
        question.options[index].id = genId();
      });

      const answer: EpilogueQuestionAnswer = {
        id: genId(),
        questionId: question.id,
        correctOptionId: question.options[0].id,
      };
      return answer;
    }
  );

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

export default epilogue;
