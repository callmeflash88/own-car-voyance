import axios from "axios";
import { addAccessToken, updateAccessToken } from "./interceptors";

// import axiosRetry from "axios-retry";

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: "https://app-api.carvoyance.com/",
  // baseURL: "http://52.52.7.95/",
});

// const RETRY_COUNT = 3;
// axiosRetry(instance, {
//   retries: RETRY_COUNT,
//   retryDelay: (retryCount) => retryCount * 200, // time interval between retries,
//   retryCondition: (error) => Boolean(error),
// });

instance.interceptors.request.use(addAccessToken);
instance.interceptors.response.use((config) => config, updateAccessToken);
