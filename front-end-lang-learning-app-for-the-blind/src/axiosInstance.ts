import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const axiosMockInstance = axios.create();
const axiosLiveInstance = axios.create();
export const axiosMockAdapterInstance = new AxiosMockAdapter(
  axiosMockInstance,
  { delayResponse: 0 }
);

//TODO: add env variables for axios
export default process.env.isAxioMock ?? true
  ? axiosMockInstance
  : axiosLiveInstance;
