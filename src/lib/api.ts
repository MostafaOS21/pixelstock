import { API_BASE_URL } from "@/constants";
import axios from "axios";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: import.meta.env.VITE_API_KEY,
  },
});

export default api;
