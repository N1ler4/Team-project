import Cookies from "js-cookie";

export const getDataFromCookie = (title) => {
  return Cookies.get(title);
};
export const saveDataToCookie = (title, value) => {
  Cookies.set(title, value);
};
export const deleteDataFromCookie = (title) => {
  Cookies.remove(title);
};
