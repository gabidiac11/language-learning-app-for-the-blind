export const STAGE = process.env.REACT_APP_STAGE;

const LOCAL = "http://localhost:5001/api/";

export const BASE_URL = (() => {
  // TODO: use based on environment
  return LOCAL;
})();

declare global {
  interface Window {
    cheat_correctEpilogueOptions?: { [key: string]: true };
    cheat_correctBlockOptions?: { [key: string]: true };
  }
}
