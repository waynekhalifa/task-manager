import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
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