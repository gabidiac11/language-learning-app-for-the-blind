export const STAGE = process.env.REACT_APP_STAGE;

export const BASE_URL = (() => {
  return `${window.location.origin}/api/`;
})();

declare global {
  interface Window {
    cheat_correctEpilogueOptions?: { [key: string]: true };
    cheat_correctBlockOptions?: { [key: string]: true };
  }
}
