import { create } from "zustand";
import http from "@http";
import axios from "axios";
import { saveDataToCookie } from "@token-service";

const useForgotStore = create(() => ({
  getByEmail: async (email) => {
    try {
      const response = await axios.get(`https://api.cvmaker.uz/v1/users/set/{email}?email=${email}`);
      if (response.status === 200) {
        saveDataToCookie("email" , email)
        return response;
      }
    } catch (err) {
      console.error(err);
    }
  },
  getByCode: async (email , code) => {
    try {
      const res = await http.get(`/users/code?code=${code}&email=${email}`);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  updatePassword: async (password, email) => {
    try {
      const res = await http.put(`/users/password?email=${email}&password=${password}`);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useForgotStore;
