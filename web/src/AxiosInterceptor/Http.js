import axios from "axios";

export const setRequestHeaders = () => {
  const token = JSON.parse(localStorage.getItem("UserInfo"))?.token || "";
  return {
    "Content-Type": "application/json",
    authorization: "Bearer " + token,
  };
};
export const setFormHeaders = () => {
  const token = JSON.parse(localStorage.getItem("UserInfo"))?.token || "";
  return {
    Accept: "application/json",
    authorization: "Bearer " + token,
  };
};

export const get = (url) => {
  try {
    const requestHeader = setRequestHeaders();
    return axios.get(url, { headers: requestHeader });
  } catch (error) {
    console.log("Error in get method of HTTP" + error);
    throw error;
  }
};

export const post = (url, data) => {
  try {
    const requestHeader = setRequestHeaders();
    return axios.post(url, data, { headers: requestHeader });
  } catch (error) {
    console.log("Error in post method of HTTP" + error);
    throw error;
  }
};

export const put = (url, data) => {
  try {
    const requestHeader = setRequestHeaders();
    return axios.put(url, data, { headers: requestHeader });
  } catch (error) {
    console.log("Error in put method of HTTP" + error);
    throw error;
  }
};

export const deleteRequest = (url) => {
  try {
    const requestHeader = setRequestHeaders();
    return axios.delete(url, { headers: requestHeader });
  } catch (error) {
    console.log("Error in delete method of HTTP" + error);
    throw error;
  }
};

export const postForm = (url, data) => {
  try {
    const requestHeader = setFormHeaders();
    return axios.post(url, data, { headers: requestHeader });
  } catch (error) {
    console.log("Error in post method of HTTP" + error);
    throw error;
  }
};
