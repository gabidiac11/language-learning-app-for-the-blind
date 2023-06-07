import { LanguageData } from "../ctxTypes/ctx.story.types";

export const languages: LanguageData = {
    ru: {
      id: "ru",
      name: "Russian",
      active: true,
      imageUrl:
        "https://storage.googleapis.com/big-depth-387415.appspot.com/images/pexels-elina-fairytale-3810971%20(1).jpg",
      alt: "Russian church image.",
      order: 0,
    },
    fr: {
      id: "fr",
      name: "French",
      active: true,
      imageUrl:
        "https://storage.googleapis.com/big-depth-387415.appspot.com/images/pexels-joshua-woroniecki-4983083.jpg",
      alt: "French Eiffel Tower and a flower by.",
      order: 1,
    },
    de: {
      id: "de",
      name: "German",
      active: true,
      imageUrl:
        // TODO: find smaller images
        "https://storage.googleapis.com/big-depth-387415.appspot.com/images/pexels-ingo-joseph-109629.jpg",
      alt: "German flag image.",
      order: 2,
    },
  }