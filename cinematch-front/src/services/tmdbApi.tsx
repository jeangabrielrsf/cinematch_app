import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_TMDB_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    Accept: "application/json",
  },
});

export default instance;
