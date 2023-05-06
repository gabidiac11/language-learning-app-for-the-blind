import axios from "axios";
import { BASE_URL } from "./constants";
const axiosLiveInstance = axios.create();

axiosLiveInstance.defaults.baseURL = BASE_URL;

export default axiosLiveInstance;
