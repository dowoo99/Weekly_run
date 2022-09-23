import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

instance.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    config.headers.common["Authorization"] = ` ${accessToken}`;
  }
  return config;
});
