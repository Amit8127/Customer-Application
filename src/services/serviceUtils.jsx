import axios from "axios";
import { getJwtToken } from "../auth/auth";

// export const BaseURL = "https://crud-application-for-customer-production.up.railway.app/";
export const BaseURL = "http://localhost:8080"; //for testing purposes

export const auth = axios.create({
  baseURL: BaseURL,
});

export const api = axios.create({
  baseURL: BaseURL,
});

api.interceptors.request.use((config) => {
  const accessToken = getJwtToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
