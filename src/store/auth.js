import { create } from "zustand";
import { saveDataToCookie } from "@token-service";
import http from "@http";

const useAuthStore = create(() => ({
  signin: async (payload) => {
    try {
      const response = await http.post("/users/login", payload);
      if (response.status === 200) {
        console.log(response);
        saveDataToCookie("token", response?.data?.access_token);
        saveDataToCookie("refresh-token", response?.data?.refresh_token);
        saveDataToCookie("id", response?.data?.id);
        return response;
      }
    } catch (err) {
      console.error(err);
    }
  },
  signup: async (payload) => {
    try {
      const res = await http.post("/users/register", payload);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  verify: async(code , email)=>{
    try{
      const res = await http.get(`/users/verify?code=${code}&email=${email}`);
      if(res.status === 201){
        return res;
      }
    }catch(err){
      console.log(err)
    }
  }
}));

export default useAuthStore;
