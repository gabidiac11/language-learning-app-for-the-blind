import { BuildingBlock } from "../../ctx.story.types";
import { genId } from "../../ContextFileBased/FileStorageContext";

const generateBuildingBlocks = async (): Promise<BuildingBlock[]> => {
  const familyBlock: BuildingBlock = {
    id: await genId(),
    name: "Family",
    imageUrl:
      "https://images.pexels.com/photos/3807561/pexels-photo-3807561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    words: [
      {
        id: await genId(),
        text: "семьей",
        shortTranslation: "family",
        longTranslation:
          "A group consisting of parents and children living together in a household",
      },
      {
        id: await genId(),
        text: "мамой",
        shortTranslation: "mom",
        longTranslation: "One's mother",
      },
      {
        id: await genId(),
        text: "папа",
        shortTranslation: "dad",
        longTranslation: "Used when referring to one's father.",
      },
      {
        id: await genId(),
        text: "братом",
        shortTranslation: "brother",
        longTranslation: "A male sibling",
      },
      //TODO: add more words for ungle, sister and stuff
      {
        id: await genId(),
        text: "зовут",
        shortTranslation: "called",
        longTranslation: "Used to refer to the name or title of someone",
      },
      {
        id: await genId(),
        text: "младше",
        shortTranslation: "younger",
        longTranslation: "Being at an earlier age",
      },
      {
        id: await genId(),
        text: "на два года",
        shortTranslation: "two years younger",
        longTranslation: "Being two years younger than someone else",
      },
      {
        id: await genId(),
        text: "любим",
        shortTranslation: "favorite",
        longTranslation: "Preferred over all others of the same kind",
      },
      {
        id: await genId(),
        text: "людях",
        shortTranslation: "people",
        longTranslation: "Human beings in general or considered collectively",
      },
      {
        id: await genId(),
        text: "рада",
        shortTranslation: "happy",
        longTranslation: "Feeling or showing pleasure or contentment",
      },
    ],
  };
  const namesBlock: BuildingBlock = {
    id: await genId(),
    name: "Names",
    imageUrl:
      "https://images.pexels.com/photos/4700108/pexels-photo-4700108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    words: [
      {
        id: await genId(),
        text: "Анна",
        shortTranslation: "Anna",
        longTranslation: "A female given name",
      },
      {
        id: await genId(),
        text: "Катя",
        shortTranslation: "Katya",
        longTranslation: "A female given name",
      },
      {
        id: await genId(),
        text: "Иван",
        shortTranslation: "Ivan",
        longTranslation: "A male given name",
      },
      {
        id: await genId(),
        text: "Александр",
        shortTranslation: "Alexander",
        longTranslation:
          'A male given name of Greek origin, meaning "defender of the people."',
      },
    ],
  };
  const pronumsBlock: BuildingBlock = {
    id: await genId(),
    name: "Pronouns",
    imageUrl:
      "https://images.pexels.com/photos/5912615/pexels-photo-5912615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    words: [
      {
        id: await genId(),
        text: "Меня",
        shortTranslation: "me",
        longTranslation:
          "Used when referring to oneself as the object of a verb or preposition.",
      },
      {
        id: await genId(),
        text: "Я",
        shortTranslation: "I",
        longTranslation:
          "Used when referring to oneself as the subject of a verb.",
      },
      {
        id: await genId(),
        text: "со своей",
        shortTranslation: "with my",
        longTranslation:
          "Used to indicate possession of something by the speaker.",
      },
      {
        id: await genId(),
        text: "Моя",
        shortTranslation: "my",
        longTranslation:
          "Used to indicate possession of something by a female speaker.",
      },
      {
        id: await genId(),
        text: "Мой",
        shortTranslation: "my",
        longTranslation:
          "Used to indicate possession of something by a male speaker.",
      },
      {
        id: await genId(),
        text: "меня",
        shortTranslation: "me",
        longTranslation:
          "Used when referring to oneself as the object of a verb or preposition.",
      },
      {
        id: await genId(),
        text: "Мы",
        shortTranslation: "we",
        longTranslation:
          "Used when referring to oneself and others as the subject of a verb.",
      },
      {
        id: await genId(),
        text: "мне",
        shortTranslation: "to me",
        longTranslation:
          "Used when referring to oneself as the recipient of an action.",
      },
      {
        id: await genId(),
        text: "о себе",
        shortTranslation: "about myself",
        longTranslation: "Used when referring to oneself in a general sense.",
      },
      {
        id: await genId(),
        text: "ты",
        shortTranslation: "you",
        longTranslation: "Used when addressing one person informally.",
      },
      {
        id: await genId(),
        text: "к брату",
        shortTranslation: "to brother",
        longTranslation:
          "Used when referring to one's brother in the vocative case.",
      },
      {
        id: await genId(),
        text: "другу",
        shortTranslation: "to friend",
        longTranslation:
          "Used when referring to a male friend in the vocative case.",
      },
      {
        id: await genId(),
        text: "они",
        shortTranslation: "they",
        longTranslation:
          "Used when referring to more than one person or thing as the subject of a verb.",
      },
      {
        id: await genId(),
        text: "маме",
        shortTranslation: "to mom",
        longTranslation:
          "Used when referring to one's mother as the recipient of an action.",
      },
      {
        id: await genId(),
        text: "мы",
        shortTranslation: "we",
        longTranslation:
          "Used when referring to oneself and others as the subject of a verb.",
      },
      {
        id: await genId(),
        text: "все",
        shortTranslation: "all",
        longTranslation:
          "Used to refer to the entirety of a group of people or things.",
      },
      {
        id: await genId(),
        text: "ними",
        shortTranslation: "with them",
        longTranslation: "Used to indicate possession of something by a group.",
      },
      {
        id: await genId(),
        text: "нашем",
        shortTranslation: "our",
        longTranslation: "Belonging to us",
      },
      {
        id: await genId(),
        text: "мою",
        shortTranslation: "my",
        longTranslation: "Belonging to me",
      },
      {
        id: await genId(),
        text: "вместе",
        shortTranslation: "together",
        longTranslation:
          "Indicates a state of being with one or more other people or things",
      },
    ],
  };

  const temporalsBlock: BuildingBlock = {
    id: await genId(),
    name: "Temporal words",
    imageUrl:
      "https://images.pexels.com/photos/1095601/pexels-photo-1095601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    words: [
      {
        id: await genId(),
        text: "Часто",
        shortTranslation: "often",
        longTranslation: "Frequently; many times",
      },
      {
        id: await genId(),
        text: "года",
        shortTranslation: "years",
        longTranslation: "A period of 365 or 366 days",
      },
      {
        id: await genId(),
        text: "каждый день",
        shortTranslation: "every day",
        longTranslation: "Happening or done every day",
      },
      {
        id: await genId(),
        text: "Потом",
        shortTranslation: "then",
        longTranslation: "At a time following an earlier time",
      },
      {
        id: await genId(),
        text: "день",
        shortTranslation: "day",
        longTranslation:
          "A period of 24 hours, starting and ending at midnight",
      },
      {
        id: await genId(),
        text: "дне",
        shortTranslation: "during the day",
        longTranslation: "Used to indicate a time period during the day",
      },
      {
        id: await genId(),
        text: "время",
        shortTranslation: "time",
        longTranslation:
          "A continuous, measurable quantity in which events occur in a sequence proceeding from the past through the present to the future",
      },
      {
        id: await genId(),
        text: "обычно",
        shortTranslation: "usually",
        longTranslation: "In the normal or customary manner or order of things",
      },
      {
        id: await genId(),
        text: "языку",
        shortTranslation: "language",
        longTranslation:
          "Refers to the Russian language or any other language being studied or spoken",
      },
      {
        id: await genId(),
        text: "когда",
        shortTranslation: "when",
        longTranslation: "Used to ask or indicate a time or occasion",
      },
      {
        id: await genId(),
        text: "всегда",
        shortTranslation: "always",
        longTranslation:
          "Indicates that something happens without exception or failure",
      },
    ],
  };
  const placesBlock: BuildingBlock = {
    id: await genId(),
    name: "Places",
    imageUrl:
      "https://images.pexels.com/photos/52526/sign-places-travel-information-52526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    words: [
      {
        id: await genId(),
        text: "в парке",
        shortTranslation: "in the park",
        longTranslation:
          "Indicates a location inside a park or a visit to a park",
      },
      {
        id: await genId(),
        text: "на гриле",
        shortTranslation: "on the grill",
        longTranslation:
          "Refers to food being cooked or grilled on a grill or barbecue",
      },
      {
        id: await genId(),
        text: "домой",
        shortTranslation: "home",
        longTranslation:
          "Indicates a destination or direction towards one's place of residence or dwelling",
      },
      {
        id: await genId(),
        text: "за стол",
        shortTranslation: "at the table",
        longTranslation:
          "Refers to a location at a table or a gathering around a table",
      },
      {
        id: await genId(),
        text: "школе",
        shortTranslation: "at school",
        longTranslation:
          "Indicates a location or activity taking place in a school or educational setting",
      },
      {
        id: await genId(),
        text: "уроки",
        shortTranslation: "lessons",
        longTranslation:
          "Classes or sessions in which a teacher instructs a student on a particular subject or topic",
      },
    ],
  };
  const verbsBlock: BuildingBlock = {
    id: await genId(),
    name: "Verbs",
    imageUrl:
      "https://images.pexels.com/photos/9540541/pexels-photo-9540541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    words: [
      {
        id: await genId(),
        text: "зовут",
        shortTranslation: "is called",
        longTranslation: "Used to introduce or ask for someone's name",
      },
      {
        id: await genId(),
        text: "живу",
        shortTranslation: "live",
        longTranslation:
          "Indicates a present tense state of living in a particular place or residence",
      },
      {
        id: await genId(),
        text: "гуляем",
        shortTranslation: "take a walk",
        longTranslation:
          "Refers to a leisurely walk or stroll, often with company or in a particular location",
      },
      {
        id: await genId(),
        text: "играем",
        shortTranslation: "play",
        longTranslation:
          "Refers to playing a game or engaging in a fun or recreational activity",
      },
      {
        id: await genId(),
        text: "готовим",
        shortTranslation: "cook",
        longTranslation: "Refers to the act of preparing or cooking food",
      },
      {
        id: await genId(),
        text: "люблю готовить",
        shortTranslation: "love to cook",
        longTranslation:
          "Expresses a strong preference or enjoyment for the act of cooking",
      },
      {
        id: await genId(),
        text: "готовит",
        shortTranslation: "cooks",
        longTranslation: "Refers to the act of cooking food",
      },
      {
        id: await genId(),
        text: "помогает",
        shortTranslation: "helps",
        longTranslation:
          "Indicates the act of providing assistance or support to someone",
      },
      {
        id: await genId(),
        text: "учусь",
        shortTranslation: "study",
        longTranslation:
          "Refers to the act of learning or acquiring knowledge or skills",
      },
      {
        id: await genId(),
        text: "занимаюсь",
        shortTranslation: "practice, engage in",
        longTranslation:
          "To spend time regularly doing a particular activity or improving a particular skill",
      },
      {
        id: await genId(),
        text: "нравится учиться",
        shortTranslation: "like to learn",
        longTranslation:
          "To find pleasure or satisfaction in learning something new or acquiring knowledge",
      },
      {
        id: await genId(),
        text: "говорю",
        shortTranslation: "speak",
        longTranslation:
          "To use one's voice to articulate speech sounds in order to express thoughts, feelings, or ideas",
      },
      {
        id: await genId(),
        text: "обращаюсь",
        shortTranslation: "address",
        longTranslation:
          "To speak or write to someone in a particular way, especially formally or respectfully",
      },
      {
        id: await genId(),
        text: "говорят",
        shortTranslation: "say, speak",
        longTranslation:
          "To utter words so as to convey information, an opinion, a feeling or intention",
      },
      {
        id: await genId(),
        text: "возвращаюсь",
        shortTranslation: "return, come back",
        longTranslation:
          "To go or come back to a place or person, especially to where one was before",
      },
      {
        id: await genId(),
        text: "делаю",
        shortTranslation: "do, make",
        longTranslation: "To perform or execute a task, action or activity",
      },
      {
        id: await genId(),
        text: "помогаю",
        shortTranslation: "help, assist",
        longTranslation:
          "To make it easier or possible for someone to do something, by offering assistance or support",
      },
      {
        id: await genId(),
        text: "садимся",
        shortTranslation: "sit down",
        longTranslation:
          "To take a seat, especially on a chair or other piece of furniture",
      },
      {
        id: await genId(),
        text: "едим",
        shortTranslation: "eat",
        longTranslation: "To put food into one's mouth and chew and swallow it",
      },
      {
        id: await genId(),
        text: "проводить",
        shortTranslation: "conduct, hold",
        longTranslation: "To organize or host an event or activity",
      },
      {
        id: await genId(),
        text: "еду",
        shortTranslation: "go, travel",
        longTranslation:
          "To travel or move in a particular direction or to a particular place",
      },
      {
        id: await genId(),
        text: "говорят",
        shortTranslation: "say, speak",
        longTranslation:
          "To utter words so as to convey information, an opinion, a feeling or intention",
      },
      {
        id: await genId(),
        text: "блины",
        shortTranslation: "pancakes",
        longTranslation:
          "A thin, flat cake made of batter and fried on both sides, typically eaten with sweet or savory toppings",
      },
    ],
  };
  const connectionWords: BuildingBlock = {
    id: await genId(),
    name: "Connection words",
    imageUrl:
      "https://images.pexels.com/photos/1586951/pexels-photo-1586951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    words: [
      {
        id: await genId(),
        text: "в",
        shortTranslation: "in, at, to",
        longTranslation: "Preposition indicating location or direction.",
      },
      {
        id: await genId(),
        text: "и",
        shortTranslation: "and",
        longTranslation: "Conjunction used to connect words or phrases.",
      },
      {
        id: await genId(),
        text: "или",
        shortTranslation: "or",
        longTranslation: "Conjunction used to present alternatives.",
      },
      {
        id: await genId(),
        text: "о",
        shortTranslation: "about",
        longTranslation:
          "Preposition used to indicate a subject of conversation or discussion.",
      },
      {
        id: await genId(),
        text: "за",
        shortTranslation: "behind, for",
        longTranslation: "Preposition indicating location or purpose.",
      },
      {
        id: await genId(),
        text: "с",
        shortTranslation: "with, from, of",
        longTranslation:
          "Preposition indicating accompaniment, source, or possession.",
      },
    ],
  };

  // family block is first unlocked:
  familyBlock.isStarter = true;

  // family unlocks -> pronons and names
  familyBlock.dependentOnIds = [namesBlock.id, pronumsBlock.id];

  // pronums unlocks -> temporal
  pronumsBlock.dependentOnIds = [temporalsBlock.id];

  // temporal unlocks -> places
  temporalsBlock.dependentOnIds = [placesBlock.id];

  // places unlocks -> verbs
  placesBlock.dependentOnIds = [verbsBlock.id];

  // verbs unlocks -> connection words
  verbsBlock.dependentOnIds = [connectionWords.id];

  const blocks = [
    familyBlock,
    namesBlock,
    pronumsBlock,
    temporalsBlock,
    placesBlock,
    verbsBlock,
    connectionWords,
  ];

  return blocks;
};

export default generateBuildingBlocks;
