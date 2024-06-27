import { create } from "zustand";
import http from "@http";
import { saveDataToCookie } from "@token-service";

const useCreateStore = create(() => ({
  basic: async (payload) => {
    try {
      const response = await http.post(`/resume/basic`, payload);
      if (response.status === 200) {
        saveDataToCookie("basic-id" , response.data.basic_redis_id);
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
  updateUser: async (payload) => {
    try {
      const res = await http.put(`/users`, payload);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  uploadImg: async (payload) => {
    try {
      const res = await http.post(`/media/user-photo`, payload);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useCreateStore;
