import { create } from "zustand";
import http from "@http";
import { getDataFromCookie } from "@token-service";


const useUserStore = create(() => ({
  getUser: async (id) => {
    try {
      const response = await http.get(`/users/${id}`);
      if (response.status === 200) {
        return response;
      }
    } catch (err) {
      console.error(err);
    }
  },
  deleteUser: async (id) => {
    try {
      const res = await http.delete(`/users/{id}?id=${id}`);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  updateUser: async (payload) => {
    try {
      const res = await http.put(`/users` , payload);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  uploadImg : async (payload) => {
    try {
      const res = await http.post(`/media/user-photo`, payload);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  }
}));

export default useUserStore;
