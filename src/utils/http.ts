import axios from "axios";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Change request data/error here
http.interceptors.request.use(
  (config) => {
    // @ts-expect-error
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;