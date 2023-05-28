import { Language } from "../Data/ctxTypes/ctx.story.types";

export class LanguageProvider {
  public language?: Language|"";
  constructor(language?: Language|"") {
    this.language = language;
  }
}
