export const STAGE = process.env.REACT_APP_STAGE;

export const BASE_URL = (() => {
  if(window.location.origin.indexOf("localhost:") > -1) {
    return `http://localhost:5001/api/`;
  }
  return `${window.location.origin}/api/`;
})();
