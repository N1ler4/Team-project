import { create } from "zustand";
import http from "@http";
import { saveDataToCookie } from "@token-service";
import axios from "axios";

const useCreateStore = create(() => ({
  basic: async (payload) => {
    try {
      const response = await http.post(`/resume/basic`, payload);
      if (response.status === 200) {
        saveDataToCookie("basic-id", response.data.basic_redis_id);
        saveDataToCookie("main-id", response.data.main_redis_id);
        return response;
      }
    } catch (err) {
      console.error(err);
    }
  },
  postImg: async (payload) => {
    try {
      const res = await http.post(`/resume/resume-photo`, payload);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  postToMain: async (payload) => {
    try {
      const res = await http.post(`/resume/main`, payload);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  FinalResume: async (payload) => {
    try {
      const res = await http.post("/resume/generate", payload);

      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useCreateStore;
