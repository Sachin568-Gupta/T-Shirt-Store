import { Http } from "../../AxiosInterceptor";
const API = "http://localhost:8000/api";

export const signup = (user) => {
  try {
    let response;
    response = Http.post(`${API}/signup`, user);
    return response;
  } catch (error) {
    console.log("error while signup due to", error);
  }
};

export const signin = (user) => {
  try {
    let response;
    response = Http.post(`${API}/signin`, user);
    return response;
  } catch (error) {
    console.log("error while signup due to", error);
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("UserInfo", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("UserInfo");
    next();
    try {
      let response;
      response = Http.get(`${API}/signout`);
      return response?.data;
    } catch (error) {
      console.log("error while signup due to", error);
    }
  }
};

export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("UserInfo")) {
    return JSON.parse(localStorage.getItem("UserInfo"));
  } else {
    return false;
  }
};
