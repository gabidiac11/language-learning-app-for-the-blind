import { genUid } from "../../../../utils";
import { BuildingBlock } from "../../../ctxTypes/ctx.story.types";

const generateBuildingBlocks = async (): Promise<BuildingBlock[]> => {
  const familyBlock: BuildingBlock = {
    id: genUid(),
    name: "Family",
    imageUrl:
      "https://images.pexels.com/photos/3807561/pexels-photo-3807561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    words: [
      {
        id: genUid(),
        text: "семьей",
        shortTranslation: "family",
        longTranslation:
          "A group consisting of parents and children living together in a household",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "мамой",
        shortTranslation: "mom",
        longTranslation: "One's mother",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "папа",
        shortTranslation: "dad",
        longTranslation: "Used when referring to one's father.",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "братом",
        shortTranslation: "brother",
        longTranslation: "A male sibling",
        lang: "ru",
      },
      //TODO: add more words for uncle, sister and stuff
      {
        id: genUid(),
        text: "зовут",
        shortTranslation: "called",
        longTranslation: "Used to refer to the name or title of someone",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "младше",
        shortTranslation: "younger",
        longTranslation: "Being at an earlier age",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "на два года",
        shortTranslation: "two years younger",
        longTranslation: "Being two years younger than someone else",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "любим",
        shortTranslation: "favorite",
        longTranslation: "Preferred over all others of the same kind",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "людях",
        shortTranslation: "people",
        longTranslation: "Human beings in general or considered collectively",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "рада",
        shortTranslation: "happy",
        longTranslation: "Feeling or showing pleasure or contentment",
        lang: "ru",
      },
    ],
    idsItemsDependentOnThis: [],
    isStarter: false,
    lang: "ru",
  };
  const namesBlock: BuildingBlock = {
    id: genUid(),
    name: "Names",
    imageUrl:
      "https://images.pexels.com/photos/4700108/pexels-photo-4700108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    words: [
      {
        id: genUid(),
        text: "Анна",
        shortTranslation: "Anna",
        longTranslation: "A female given name",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "Катя",
        shortTranslation: "Katya",
        longTranslation: "A female given name",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "Иван",
        shortTranslation: "Ivan",
        longTranslation: "A male given name",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "Александр",
        shortTranslation: "Alexander",
        longTranslation:
          'A male given name of Greek origin, meaning "defender of the people."',
        lang: "ru",
      },
    ],
    idsItemsDependentOnThis: [],
    isStarter: false,
    lang: "ru",
  };
  const pronumsBlock: BuildingBlock = {
    id: genUid(),
    name: "Pronouns",
    imageUrl:
      "https://images.pexels.com/photos/5912615/pexels-photo-5912615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    words: [
      {
        id: genUid(),
        text: "Меня",
        shortTranslation: "me",
        longTranslation:
          "Used when referring to oneself as the object of a verb or preposition.",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "Я",
        shortTranslation: "I",
        longTranslation:
          "Used when referring to oneself as the subject of a verb.",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "со своей",
        shortTranslation: "with my",
        longTranslation:
          "Used to indicate possession of something by the speaker.",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "Моя",
        shortTranslation: "my",
        longTranslation:
          "Used to indicate possession of something by a female speaker.",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "Мой",
        shortTranslation: "my",
        longTranslation:
          "Used to indicate possession of something by a male speaker.",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "меня",
        shortTranslation: "me",
        longTranslation:
          "Used when referring to oneself as the object of a verb or preposition.",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "Мы",
        shortTranslation: "we",
        longTranslation:
          "Used when referring to oneself and others as the subject of a verb.",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "мне",
        shortTranslation: "to me",
        longTranslation:
          "Used when referring to oneself as the recipient of an action.",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "о себе",
        shortTranslation: "about myself",
        longTranslation: "Used when referring to oneself in a general sense.",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "ты",
        shortTranslation: "you",
        longTranslation: "Used when addressing one person informally.",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "к брату",
        shortTranslation: "to brother",
        longTranslation:
          "Used when referring to one's brother in the vocative case.",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "другу",
        shortTranslation: "to friend",
        longTranslation:
          "Used when referring to a male friend in the vocative case.",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "они",
        shortTranslation: "they",
        longTranslation:
          "Used when referring to more than one person or thing as the subject of a verb.",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "маме",
        shortTranslation: "to mom",
        longTranslation:
          "Used when referring to one's mother as the recipient of an action.",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "мы",
        shortTranslation: "we",
        longTranslation:
          "Used when referring to oneself and others as the subject of a verb.",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "все",
        shortTranslation: "all",
        longTranslation:
          "Used to refer to the entirety of a group of people or things.",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "ними",
        shortTranslation: "with them",
        longTranslation: "Used to indicate possession of something by a group.",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "нашем",
        shortTranslation: "our",
        longTranslation: "Belonging to us",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "мою",
        shortTranslation: "my",
        longTranslation: "Belonging to me",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "вместе",
        shortTranslation: "together",
        longTranslation:
          "Indicates a state of being with one or more other people or things",
        lang: "ru",
      },
    ],
    idsItemsDependentOnThis: [],
    isStarter: false,
    lang: "ru",
  };

  const temporalsBlock: BuildingBlock = {
    id: genUid(),
    name: "Temporal words",
    imageUrl:
      "https://images.pexels.com/photos/1095601/pexels-photo-1095601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    words: [
      {
        id: genUid(),
        text: "Часто",
        shortTranslation: "often",
        longTranslation: "Frequently; many times",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "года",
        shortTranslation: "years",
        longTranslation: "A period of 365 or 366 days",
        lang: "ru",
      },
      {
        id: genUid(),
        text: "каждый день",
        shortTranslation: "every day",
        longTranslation: "Happening or done every day",

        lang: "ru",
      },
      {
        id: genUid(),
        text: "Потом",
        shortTranslation: "then",
        longTranslation: "At a time following an earlier time",

        lang: "ru",
      },
      {
        id: genUid(),
        text: "день",
        shortTranslation: "day",
        longTranslation:
          "A period of 24 hours, starting and ending at midnight",

        lang: "ru",
      },
      {
        id: genUid(),
        text: "дне",
        shortTranslation: "during the day",
        longTranslation: "Used to indicate a time period during the day",

        lang: "ru",
      },
      {
        id: genUid(),
        text: "время",
        shortTranslation: "time",
        longTranslation:
          "A continuous, measurable quantity in which events occur in a sequence proceeding from the past through the present to the future",

        lang: "ru",
      },
      {
        id: genUid(),
        text: "обычно",
        shortTranslation: "usually",
        longTranslation: "In the normal or customary manner or order of things",

        lang: "ru",
      },
      {
        id: genUid(),
        text: "языку",
        shortTranslation: "language",
        longTranslation:
          "Refers to the Russian language or any other language being studied or spoken",

        lang: "ru",
      },
      {
        id: genUid(),
        text: "когда",
        shortTranslation: "when",
        longTranslation: "Used to ask or indicate a time or occasion",

        lang: "ru",
      },
      {
        id: genUid(),
        text: "всегда",
        shortTranslation: "always",
        longTranslation:
          "Indicates that something happens without exception or failure",

        lang: "ru",
      },
    ],
    idsItemsDependentOnThis: [],
    isStarter: false,
    lang: "ru",
  };
  const placesBlock: BuildingBlock = {
    id: genUid(),
    name: "Places",
    imageUrl:
      "https://images.pexels.com/photos/52526/sign-places-travel-information-52526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    words: [
      {
        id: genUid(),
        text: "в парке",
        shortTranslation: "in the park",

        lang: "ru",
        longTranslation:
          "Indicates a location inside a park or a visit to a park",
      },
      {
        id: genUid(),
        text: "на гриле",
        shortTranslation: "on the grill",

        lang: "ru",
        longTranslation:
          "Refers to food being cooked or grilled on a grill or barbecue",
      },
      {
        id: genUid(),
        text: "домой",
        shortTranslation: "home",

        lang: "ru",
        longTranslation:
          "Indicates a destination or direction towards one's place of residence or dwelling",
      },
      {
        id: genUid(),
        text: "за стол",
        shortTranslation: "at the table",

        lang: "ru",
        longTranslation:
          "Refers to a location at a table or a gathering around a table",
      },
      {
        id: genUid(),
        text: "школе",
        shortTranslation: "at school",

        lang: "ru",
        longTranslation:
          "Indicates a location or activity taking place in a school or educational setting",
      },
      {
        id: genUid(),
        text: "уроки",
        shortTranslation: "lessons",

        lang: "ru",
        longTranslation:
          "Classes or sessions in which a teacher instructs a student on a particular subject or topic",
      },
    ],
    idsItemsDependentOnThis: [],
    isStarter: false,
    lang: "ru",
  };
  const verbsBlock: BuildingBlock = {
    id: genUid(),
    name: "Verbs",
    imageUrl:
      "https://images.pexels.com/photos/9540541/pexels-photo-9540541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    words: [
      {
        id: genUid(),
        text: "зовут",
        shortTranslation: "is called",

        lang: "ru",
        longTranslation: "Used to introduce or ask for someone's name",
      },
      {
        id: genUid(),
        text: "живу",
        shortTranslation: "live",

        lang: "ru",
        longTranslation:
          "Indicates a present tense state of living in a particular place or residence",
      },
      {
        id: genUid(),
        text: "гуляем",
        shortTranslation: "take a walk",

        lang: "ru",
        longTranslation:
          "Refers to a leisurely walk or stroll, often with company or in a particular location",
      },
      {
        id: genUid(),
        text: "играем",
        shortTranslation: "play",

        lang: "ru",
        longTranslation:
          "Refers to playing a game or engaging in a fun or recreational activity",
      },
      {
        id: genUid(),
        text: "готовим",
        shortTranslation: "cook",

        lang: "ru",
        longTranslation: "Refers to the act of preparing or cooking food",
      },
      {
        id: genUid(),
        text: "люблю готовить",
        shortTranslation: "love to cook",

        lang: "ru",
        longTranslation:
          "Expresses a strong preference or enjoyment for the act of cooking",
      },
      {
        id: genUid(),
        text: "готовит",
        shortTranslation: "cooks",

        lang: "ru",
        longTranslation: "Refers to the act of cooking food",
      },
      {
        id: genUid(),
        text: "помогает",
        shortTranslation: "helps",

        lang: "ru",
        longTranslation:
          "Indicates the act of providing assistance or support to someone",
      },
      {
        id: genUid(),
        text: "учусь",
        shortTranslation: "study",

        lang: "ru",
        longTranslation:
          "Refers to the act of learning or acquiring knowledge or skills",
      },
      {
        id: genUid(),
        text: "занимаюсь",
        shortTranslation: "practice, engage in",

        lang: "ru",
        longTranslation:
          "To spend time regularly doing a particular activity or improving a particular skill",
      },
      {
        id: genUid(),
        text: "нравится учиться",
        shortTranslation: "like to learn",

        lang: "ru",
        longTranslation:
          "To find pleasure or satisfaction in learning something new or acquiring knowledge",
      },
      {
        id: genUid(),
        text: "говорю",
        shortTranslation: "speak",

        lang: "ru",
        longTranslation:
          "To use one's voice to articulate speech sounds in order to express thoughts, feelings, or ideas",
      },
      {
        id: genUid(),
        text: "обращаюсь",
        shortTranslation: "address",

        lang: "ru",
        longTranslation:
          "To speak or write to someone in a particular way, especially formally or respectfully",
      },
      {
        id: genUid(),
        text: "говорят",
        shortTranslation: "say, speak",

        lang: "ru",
        longTranslation:
          "To utter words so as to convey information, an opinion, a feeling or intention",
      },
      {
        id: genUid(),
        text: "возвращаюсь",
        shortTranslation: "return, come back",

        lang: "ru",
        longTranslation:
          "To go or come back to a place or person, especially to where one was before",
      },
      {
        id: genUid(),
        text: "делаю",
        shortTranslation: "do, make",

        lang: "ru",
        longTranslation: "To perform or execute a task, action or activity",
      },
      {
        id: genUid(),
        text: "помогаю",
        shortTranslation: "help, assist",

        lang: "ru",
        longTranslation:
          "To make it easier or possible for someone to do something, by offering assistance or support",
      },
      {
        id: genUid(),
        text: "садимся",
        shortTranslation: "sit down",

        lang: "ru",
        longTranslation:
          "To take a seat, especially on a chair or other piece of furniture",
      },
      {
        id: genUid(),
        text: "едим",
        shortTranslation: "eat",

        lang: "ru",
        longTranslation: "To put food into one's mouth and chew and swallow it",
      },
      {
        id: genUid(),
        text: "проводить",
        shortTranslation: "conduct, hold",

        lang: "ru",
        longTranslation: "To organize or host an event or activity",
      },
      {
        id: genUid(),
        text: "еду",
        shortTranslation: "go, travel",

        lang: "ru",
        longTranslation:
          "To travel or move in a particular direction or to a particular place",
      },
      {
        id: genUid(),
        text: "говорят",
        shortTranslation: "say, speak",

        lang: "ru",
        longTranslation:
          "To utter words so as to convey information, an opinion, a feeling or intention",
      },
      {
        id: genUid(),
        text: "блины",
        shortTranslation: "pancakes",

        lang: "ru",
        longTranslation:
          "A thin, flat cake made of batter and fried on both sides, typically eaten with sweet or savory toppings",
      },
    ],
    idsItemsDependentOnThis: [],
    isStarter: false,
    lang: "ru",
  };
  const connectionWords: BuildingBlock = {
    id: genUid(),
    name: "Connection words",
    imageUrl:
      "https://images.pexels.com/photos/1586951/pexels-photo-1586951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    words: [
      {
        id: genUid(),
        text: "в",
        shortTranslation: "in, at, to",

        lang: "ru",
        longTranslation: "Preposition indicating location or direction.",
      },
      {
        id: genUid(),
        text: "и",
        shortTranslation: "and",

        lang: "ru",
        longTranslation: "Conjunction used to connect words or phrases.",
      },
      {
        id: genUid(),
        text: "или",
        shortTranslation: "or",

        lang: "ru",
        longTranslation: "Conjunction used to present alternatives.",
      },
      {
        id: genUid(),
        text: "о",
        shortTranslation: "about",

        lang: "ru",
        longTranslation:
          "Preposition used to indicate a subject of conversation or discussion.",
      },
      {
        id: genUid(),
        text: "за",
        shortTranslation: "behind, for",

        lang: "ru",
        longTranslation: "Preposition indicating location or purpose.",
      },
      {
        id: genUid(),
        text: "с",
        shortTranslation: "with, from, of",

        lang: "ru",
        longTranslation:
          "Preposition indicating accompaniment, source, or possession.",
      },
    ],
    idsItemsDependentOnThis: [],
    isStarter: false,
    lang: "ru",
  };

  // family block is first to be unlocked because is not dependent on anyone
  // no other block b2 will reference familyBlock id in b2.idsItemsDependentOnThis
  familyBlock.isStarter = true;

  // family unlocks -> pronons and names
  familyBlock.idsItemsDependentOnThis = [namesBlock.id, pronumsBlock.id];

  // pronums unlocks -> temporal
  pronumsBlock.idsItemsDependentOnThis = [temporalsBlock.id];

  // temporal unlocks -> places
  temporalsBlock.idsItemsDependentOnThis = [placesBlock.id];

  // places unlocks -> verbs
  placesBlock.idsItemsDependentOnThis = [verbsBlock.id];

  // verbs unlocks -> connection words
  verbsBlock.idsItemsDependentOnThis = [connectionWords.id];

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