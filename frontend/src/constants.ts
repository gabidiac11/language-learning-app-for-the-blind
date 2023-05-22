export const STAGE = process.env.REACT_APP_STAGE;

export const BASE_URL = (() => {
  return `${window.location.origin}/api/`;
})();
