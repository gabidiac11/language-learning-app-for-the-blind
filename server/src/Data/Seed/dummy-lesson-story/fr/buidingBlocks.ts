import { genUid } from "../../../../utils";
import { BuildingBlock } from "../../../ctxTypes/ctx.story.types";

const generateBuildingBlocks = async (): Promise<BuildingBlock[]> => {
  const familyBlock: BuildingBlock = {
    id: genUid(),
    name: "Family",
    imageUrl:
      "https://images.pexels.com/photos/3807561/pexels-photo-3807561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageAlt: "Russian family at dinner.",
    words: [
      {
        id: genUid(),
        text: "famille",
        shortTranslation: "family",
        longTranslation:
          "A group consisting of parents and children living together in a household",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "mère",
        shortTranslation: "mom",
        longTranslation: "One's mother",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "papa",
        shortTranslation: "dad",
        longTranslation: "Used when referring to one's father.",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "frère",
        shortTranslation: "brother",
        longTranslation: "A male sibling",
        lang: "fr",
      },
      //TODO: add more words for uncle, sister and stuff
      {
        id: genUid(),
        text: "nom",
        shortTranslation: "called",
        longTranslation: "Used to refer to the name or title of someone",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "sous",
        shortTranslation: "younger",
        longTranslation: "Being at an earlier age",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "pendant deux ans",
        shortTranslation: "two years younger",
        longTranslation: "Being two years younger than someone else",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "aimer",
        shortTranslation: "favorite",
        longTranslation: "Preferred over all others of the same kind",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "personnes",
        shortTranslation: "people",
        longTranslation: "Human beings in general or considered collectively",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "content",
        shortTranslation: "happy",
        longTranslation: "Feeling or showing pleasure or contentment",
        lang: "fr",
      },
    ],
    idsItemsDependentOnThis: [],
    isStarter: false,
    lang: "fr",
  };
  const namesBlock: BuildingBlock = {
    id: genUid(),
    name: "Names",
    imageUrl:
      "https://images.pexels.com/photos/4700108/pexels-photo-4700108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageAlt: "walk of stars with names on it: hollywood walk of fame",
    words: [
      {
        id: genUid(),
        text: "Anne",
        shortTranslation: "Anna",
        longTranslation: "A female given name",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "Kate",
        shortTranslation: "Katya",
        longTranslation: "A female given name",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "Ivan",
        shortTranslation: "Ivan",
        longTranslation: "A male given name",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "Alexandre",
        shortTranslation: "Alexander",
        longTranslation:
          'A male given name of Greek origin, meaning "defender of the people."',
        lang: "fr",
      },
    ],
    idsItemsDependentOnThis: [],
    isStarter: false,
    lang: "fr",
  };
  const pronumsBlock: BuildingBlock = {
    id: genUid(),
    name: "Pronouns",
    imageUrl:
      "https://images.pexels.com/photos/5912615/pexels-photo-5912615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageAlt: "blackboard with 'we' text",
    words: [
      {
        id: genUid(),
        text: "Moi",
        shortTranslation: "me",
        longTranslation:
          "Used when referring to oneself as the object of a verb or preposition.",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "JE",
        shortTranslation: "I",
        longTranslation:
          "Used when referring to oneself as the subject of a verb.",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "avec son",
        shortTranslation: "with my",
        longTranslation:
          "Used to indicate possession of something by the speaker.",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "Mon",
        shortTranslation: "my",
        longTranslation:
          "Used to indicate possession of something by a female speaker.",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "Mon",
        shortTranslation: "my",
        longTranslation:
          "Used to indicate possession of something by a male speaker.",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "moi",
        shortTranslation: "me",
        longTranslation:
          "Used when referring to oneself as the object of a verb or preposition.",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "Nous",
        shortTranslation: "we",
        longTranslation:
          "Used when referring to oneself and others as the subject of a verb.",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "tome",
        shortTranslation: "to me",
        longTranslation:
          "Used when referring to oneself as the recipient of an action.",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "Sur moi",
        shortTranslation: "about myself",
        longTranslation: "Used when referring to oneself in a general sense.",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "Toi",
        shortTranslation: "you",
        longTranslation: "Used when addressing one person informally.",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "au frère",
        shortTranslation: "to brother",
        longTranslation:
          "Used when referring to one's brother in the vocative case.",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "ami",
        shortTranslation: "to friend",
        longTranslation:
          "Used when referring to a male friend in the vocative case.",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "Ils",
        shortTranslation: "they",
        longTranslation:
          "Used when referring to more than one person or thing as the subject of a verb.",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "maman",
        shortTranslation: "to mom",
        longTranslation:
          "Used when referring to one's mother as the recipient of an action.",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "Nous",
        shortTranslation: "we",
        longTranslation:
          "Used when referring to oneself and others as the subject of a verb.",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "Tous",
        shortTranslation: "all",
        longTranslation:
          "Used to refer to the entirety of a group of people or things.",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "eux",
        shortTranslation: "with them",
        longTranslation: "Used to indicate possession of something by a group.",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "les notres",
        shortTranslation: "our",
        longTranslation: "Belonging to us",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "exploiter",
        shortTranslation: "my",
        longTranslation: "Belonging to me",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "ensemble",
        shortTranslation: "together",
        longTranslation:
          "Indicates a state of being with one or more other people or things",
        lang: "fr",
      },
    ],
    idsItemsDependentOnThis: [],
    isStarter: false,
    lang: "fr",
  };

  const temporalsBlock: BuildingBlock = {
    id: genUid(),
    name: "Temporal words",
    imageUrl:
      "https://images.pexels.com/photos/1095601/pexels-photo-1095601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageAlt: "sand glas",
    words: [
      {
        id: genUid(),
        text: "Souvent",
        shortTranslation: "often",
        longTranslation: "Frequently; many times",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "de l'année",
        shortTranslation: "years",
        longTranslation: "A period of 365 or 366 days",
        lang: "fr",
      },
      {
        id: genUid(),
        text: "tous les jours",
        shortTranslation: "every day",
        longTranslation: "Happening or done every day",

        lang: "fr",
      },
      {
        id: genUid(),
        text: "Après",
        shortTranslation: "then",
        longTranslation: "At a time following an earlier time",

        lang: "fr",
      },
      {
        id: genUid(),
        text: "jour",
        shortTranslation: "day",
        longTranslation:
          "A period of 24 hours, starting and ending at midnight",

        lang: "fr",
      },
      {
        id: genUid(),
        text: "jour",
        shortTranslation: "during the day",
        longTranslation: "Used to indicate a time period during the day",

        lang: "fr",
      },
      {
        id: genUid(),
        text: "temps",
        shortTranslation: "time",
        longTranslation:
          "A continuous, measurable quantity in which events occur in a sequence proceeding from the past through the present to the future",

        lang: "fr",
      },
      {
        id: genUid(),
        text: "généralement",
        shortTranslation: "usually",
        longTranslation: "In the normal or customary manner or order of things",

        lang: "fr",
      },
      {
        id: genUid(),
        text: "langue",
        shortTranslation: "language",
        longTranslation:
          "Refers to the Russian language or any other language being studied or spoken",

        lang: "fr",
      },
      {
        id: genUid(),
        text: "Quand",
        shortTranslation: "when",
        longTranslation: "Used to ask or indicate a time or occasion",

        lang: "fr",
      },
      {
        id: genUid(),
        text: "Toujours",
        shortTranslation: "always",
        longTranslation:
          "Indicates that something happens without exception or failure",

        lang: "fr",
      },
    ],
    idsItemsDependentOnThis: [],
    isStarter: false,
    lang: "fr",
  };
  const placesBlock: BuildingBlock = {
    id: genUid(),
    name: "Places",
    imageUrl:
      "https://images.pexels.com/photos/52526/sign-places-travel-information-52526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageAlt: "road signs",
    words: [
      {
        id: genUid(),
        text: "dans le parc",
        shortTranslation: "in the park",

        lang: "fr",
        longTranslation:
          "Indicates a location inside a park or a visit to a park",
      },
      {
        id: genUid(),
        text: "Grillé",
        shortTranslation: "on the grill",

        lang: "fr",
        longTranslation:
          "Refers to food being cooked or grilled on a grill or barbecue",
      },
      {
        id: genUid(),
        text: "maison",
        shortTranslation: "home",

        lang: "fr",
        longTranslation:
          "Indicates a destination or direction towards one's place of residence or dwelling",
      },
      {
        id: genUid(),
        text: "à la table",
        shortTranslation: "at the table",

        lang: "fr",
        longTranslation:
          "Refers to a location at a table or a gathering around a table",
      },
      {
        id: genUid(),
        text: "école",
        shortTranslation: "at school",

        lang: "fr",
        longTranslation:
          "Indicates a location or activity taking place in a school or educational setting",
      },
      {
        id: genUid(),
        text: "cours",
        shortTranslation: "lessons",

        lang: "fr",
        longTranslation:
          "Classes or sessions in which a teacher instructs a student on a particular subject or topic",
      },
    ],
    idsItemsDependentOnThis: [],
    isStarter: false,
    lang: "fr",
  };
  const verbsBlock: BuildingBlock = {
    id: genUid(),
    name: "Verbs",
    imageUrl:
      "https://images.pexels.com/photos/9540541/pexels-photo-9540541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageAlt: "board game with words",
    words: [
      {
        id: genUid(),
        text: "nom",
        shortTranslation: "is called",

        lang: "fr",
        longTranslation: "Used to introduce or ask for someone's name",
      },
      {
        id: genUid(),
        text: "en direct",
        shortTranslation: "live",

        lang: "fr",
        longTranslation:
          "Indicates a present tense state of living in a particular place or residence",
      },
      {
        id: genUid(),
        text: "nous marchons",
        shortTranslation: "take a walk",

        lang: "fr",
        longTranslation:
          "Refers to a leisurely walk or stroll, often with company or in a particular location",
      },
      {
        id: genUid(),
        text: "jouer",
        shortTranslation: "play",

        lang: "fr",
        longTranslation:
          "Refers to playing a game or engaging in a fun or recreational activity",
      },
      {
        id: genUid(),
        text: "cuisson",
        shortTranslation: "cook",

        lang: "fr",
        longTranslation: "Refers to the act of preparing or cooking food",
      },
      {
        id: genUid(),
        text: "aime cuisiner",
        shortTranslation: "love to cook",

        lang: "fr",
        longTranslation:
          "Expresses a strong preference or enjoyment for the act of cooking",
      },
      {
        id: genUid(),
        text: "les trains",
        shortTranslation: "cooks",

        lang: "fr",
        longTranslation: "Refers to the act of cooking food",
      },
      {
        id: genUid(),
        text: "aide",
        shortTranslation: "helps",

        lang: "fr",
        longTranslation:
          "Indicates the act of providing assistance or support to someone",
      },
      {
        id: genUid(),
        text: "J'étudie",
        shortTranslation: "study",

        lang: "fr",
        longTranslation:
          "Refers to the act of learning or acquiring knowledge or skills",
      },
      {
        id: genUid(),
        text: "action",
        shortTranslation: "practice, engage in",

        lang: "fr",
        longTranslation:
          "To spend time regularly doing a particular activity or improving a particular skill",
      },
      {
        id: genUid(),
        text: "aime étudier",
        shortTranslation: "like to learn",

        lang: "fr",
        longTranslation:
          "To find pleasure or satisfaction in learning something new or acquiring knowledge",
      },
      {
        id: genUid(),
        text: "Je dis",
        shortTranslation: "speak",

        lang: "fr",
        longTranslation:
          "To use one's voice to articulate speech sounds in order to express thoughts, feelings, or ideas",
      },
      {
        id: genUid(),
        text: "je fais appel",
        shortTranslation: "address",

        lang: "fr",
        longTranslation:
          "To speak or write to someone in a particular way, especially formally or respectfully",
      },
      {
        id: genUid(),
        text: "Ils disent",
        shortTranslation: "say, speak",

        lang: "fr",
        longTranslation:
          "To utter words so as to convey information, an opinion, a feeling or intention",
      },
      {
        id: genUid(),
        text: "Je reviens",
        shortTranslation: "return, come back",

        lang: "fr",
        longTranslation:
          "To go or come back to a place or person, especially to where one was before",
      },
      {
        id: genUid(),
        text: "faire",
        shortTranslation: "do, make",

        lang: "fr",
        longTranslation: "To perform or execute a task, action or activity",
      },
      {
        id: genUid(),
        text: "aider",
        shortTranslation: "help, assist",

        lang: "fr",
        longTranslation:
          "To make it easier or possible for someone to do something, by offering assistance or support",
      },
      {
        id: genUid(),
        text: "s'asseoir",
        shortTranslation: "sit down",

        lang: "fr",
        longTranslation:
          "To take a seat, especially on a chair or other piece of furniture",
      },
      {
        id: genUid(),
        text: "manger",
        shortTranslation: "eat",

        lang: "fr",
        longTranslation: "To put food into one's mouth and chew and swallow it",
      },
      {
        id: genUid(),
        text: "conduire",
        shortTranslation: "conduct, hold",

        lang: "fr",
        longTranslation: "To organize or host an event or activity",
      },
      {
        id: genUid(),
        text: "nourriture",
        shortTranslation: "go, travel",

        lang: "fr",
        longTranslation:
          "To travel or move in a particular direction or to a particular place",
      },
      {
        id: genUid(),
        text: "Ils disent",
        shortTranslation: "say, speak",

        lang: "fr",
        longTranslation:
          "To utter words so as to convey information, an opinion, a feeling or intention",
      },
      {
        id: genUid(),
        text: "Crêpes",
        shortTranslation: "pancakes",

        lang: "fr",
        longTranslation:
          "A thin, flat cake made of batter and fried on both sides, typically eaten with sweet or savory toppings",
      },
    ],
    idsItemsDependentOnThis: [],
    isStarter: false,
    lang: "fr",
  };
  const connectionWords: BuildingBlock = {
    id: genUid(),
    name: "Connection words",
    imageUrl:
      "https://images.pexels.com/photos/1586951/pexels-photo-1586951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageAlt: "puzzle pieces",
    words: [
      {
        id: genUid(),
        text: "dans",
        shortTranslation: "in, at, to",

        lang: "fr",
        longTranslation: "Preposition indicating location or direction.",
      },
      {
        id: genUid(),
        text: "Et",
        shortTranslation: "and",

        lang: "fr",
        longTranslation: "Conjunction used to connect words or phrases.",
      },
      {
        id: genUid(),
        text: "ou",
        shortTranslation: "or",

        lang: "fr",
        longTranslation: "Conjunction used to present alternatives.",
      },
      {
        id: genUid(),
        text: "O",
        shortTranslation: "about",

        lang: "fr",
        longTranslation:
          "Preposition used to indicate a subject of conversation or discussion.",
      },
      {
        id: genUid(),
        text: "derrière",
        shortTranslation: "behind, for",

        lang: "fr",
        longTranslation: "Preposition indicating location or purpose.",
      },
      {
        id: genUid(),
        text: "Avec",
        shortTranslation: "with, from, of",

        lang: "fr",
        longTranslation:
          "Preposition indicating accompaniment, source, or possession.",
      },
    ],
    idsItemsDependentOnThis: [],
    isStarter: false,
    lang: "fr",
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
