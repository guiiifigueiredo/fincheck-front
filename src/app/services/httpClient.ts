import axios from "axios";

axios.post("auth/signin");

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
