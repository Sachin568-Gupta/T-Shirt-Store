import { Http } from "../../../AxiosInterceptor";
const API = "http://localhost:8000/api";

export const getProducts = async () => {
  let response;
  try {
    response = await Http.get(`${API}/getAllProducts`);
  } catch (err) {
    console.error("error while getting product due to", err);
  }
  return response?.data?.data || [];
};

export const createOrder = async (userId, orderData) => {
  let response;
  try {
    response = await Http.post(`${API}/order/create/${userId}`, {
      order: orderData,
    });
  } catch (err) {
    console.error("error while getting product due to", err);
  }
  return response?.data || [];
};
