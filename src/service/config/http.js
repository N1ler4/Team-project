import axios from "axios";
import { getDataFromCookie } from "@token-service";

const http = axios.create({
  baseURL: "https://dostonshernazarov.jprq.app/v1",
});

http.interceptors.request.use((config) => {
  let token = getDataFromCookie("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http