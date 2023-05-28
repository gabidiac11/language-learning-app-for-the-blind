import { Language } from "./context";

export const STAGE = process.env.REACT_APP_STAGE;

export const BASE_URL = (() => {
  if (window.location.origin.indexOf("localhost:") > -1) {
    return `http://localhost:5001/api/`;
  }
  return `${window.location.origin}/api/`;
})();

export const languages: { id: Language; name: string }[] = [
  {
    id: "ru",
    name: "Russian",
  },
  {
    id: "fr",
    name: "French",
  },
  {
    id: "de",
    name: "German",
  },
];

export const lessonLanguageHeader = "lesson-language";