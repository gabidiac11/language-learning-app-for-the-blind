import { StateType, UserStory } from "./ctxTypes";

const words = [
    // Pronouns
    { text: "Она", shortTranslation: "She", longTranslation: "" },
    { text: "Он", shortTranslation: "He", longTranslation: "" },
    { text: "Они", shortTranslation: "They", longTranslation: "" },
    { text: "Мы", shortTranslation: "We", longTranslation: "" },
    { text: "Тебе", shortTranslation: "To you", longTranslation: "" },
    { text: "Мне", shortTranslation: "To me", longTranslation: "" },
  
    // Family
    { text: "Мама", shortTranslation: "Mom", longTranslation: "" },
    { text: "Папа", shortTranslation: "Dad", longTranslation: "" },
    { text: "Сестра", shortTranslation: "Sister", longTranslation: "" },
    { text: "Брат", shortTranslation: "Brother", longTranslation: "" },
    { text: "Дочь", shortTranslation: "Daughter", longTranslation: "" },
    { text: "Сын", shortTranslation: "Son", longTranslation: "" },
    { text: "Родители", shortTranslation: "Parents", longTranslation: "" },
    { text: "Бабушка", shortTranslation: "Grandmother", longTranslation: "" },
    { text: "Дедушка", shortTranslation: "Grandfather", longTranslation: "" },
  
    // Temporal
    { text: "Вчера", shortTranslation: "Yesterday", longTranslation: "" },
    { text: "Сегодня", shortTranslation: "Today", longTranslation: "" },
    { text: "Завтра", shortTranslation: "Tomorrow", longTranslation: "" },
    { text: "Часто", shortTranslation: "Often", longTranslation: "" },
    { text: "Года", shortTranslation: "Years", longTranslation: "" },
    { text: "Месяцы", shortTranslation: "Months", longTranslation: "" },
    { text: "Дни", shortTranslation: "Days", longTranslation: "" },
  
    // Places
    { text: "Дом", shortTranslation: "Home", longTranslation: "" },
    { text: "Школа", shortTranslation: "School", longTranslation: "" },
    { text: "Работа", shortTranslation: "Work", longTranslation: "" },
    { text: "Магазин", shortTranslation: "Store", longTranslation: "" },
    { text: "Улица", shortTranslation: "Street", longTranslation: "" },
    { text: "Дверь", shortTranslation: "Door", longTranslation: "" },
  
    // Verbs
    { text: "Есть", shortTranslation: "To eat", longTranslation: "" },
    { text: "Пить", shortTranslation: "To drink", longTranslation: "" },
    { text: "Гулять", shortTranslation: "To walk", longTranslation: "" },
    { text: "Работать", shortTranslation: "To work", longTranslation: "" },
    { text: "Учиться", shortTranslation: "To study", longTranslation: "" },
    { text: "Смотреть", shortTranslation: "To watch", longTranslation: "" },
    { text: "Играть", shortTranslation: "To play", longTranslation: ""}
];

export default {
    language: "en",
    userStories: []
} as StateType;
