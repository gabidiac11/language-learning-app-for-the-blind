export const STAGE = process.env.REACT_APP_STAGE;

const LIVE = "";
const LOCAL = "http://localhost:5001/api/";
const MOCK = "https://mock/api/";

export const BASE_URL = (() => {
  // TODO: use based on environment
  // switch (STAGE) {
    // case "local":
      // return LOCAL;
      return MOCK;

    // case "dev":
    //   return LIVE;

    // default:
    //   return LIVE;
  // }
})();
