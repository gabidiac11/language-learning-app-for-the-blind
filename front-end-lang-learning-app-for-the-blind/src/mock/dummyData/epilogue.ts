import { Epilogue } from "../../context/contextTypes/ctxTypes";
import { genId } from "../mockContext";

const epilogue = (): Epilogue => ({
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
        "Anna's mom and dad",
        "Anna's brother and sister",
        "Anna's grandparents",
        "Anna's aunt and uncle",
      ],
      correctOption: "Anna's mom and dad",
    },
    {
      id: genId(),
      text: "What is Anna's mom's name?",
      options: ["Kate", "Ivan", "Alexander", "Anna"],
      correctOption: "Kate",
    },
    {
      id: genId(),
      text: "What does Anna like to cook?",
      options: ["Pancakes", "Meat on the grill", "Salad", "Pizza"],
      correctOption: "Pancakes",
    },
    {
      id: genId(),
      text: "What does Anna's dad usually cook?",
      options: ["Pancakes", "Meat on the grill", "Salad", "Pizza"],
      correctOption: "Meat on the grill",
    },
    {
      id: genId(),
      text: "What does Anna's brother help her do?",
      options: [
        "Stir the batter",
        "Chop vegetables",
        "Make the salad dressing",
        "Set the table",
      ],
      correctOption: "Stir the batter",
    },
    {
      id: genId(),
      text: "What language does Anna like to study?",
      options: ["English", "Russian", "Spanish", "French"],
      correctOption: "Russian",
    },
    {
      id: genId(),
      text: "Who does Anna say 'you' to?",
      options: ["Her mom and dad", "Her brother", "Her friends", "Her teacher"],
      correctOption: "Her brother",
    },
    {
      id: genId(),
      text: "What pronoun do Anna's mom and dad use to refer to other people?",
      options: ["I", "You", "They", "We"],
      correctOption: "They",
    },
    {
      id: genId(),
      text: "What does Anna usually do when she comes home from school?",
      options: [
        "Watch TV",
        "Play video games",
        "Do homework and help her mom",
        "Go out with friends",
      ],
      correctOption: "Do homework and help her mom",
    },
    {
      id: genId(),
      text: "What do Anna and her family do after they eat dinner?",
      options: [
        "Watch TV",
        "Play board games",
        "Read books",
        "Talk about their day",
      ],
      correctOption: "Talk about their day",
    },
  ],
});

export default epilogue;
