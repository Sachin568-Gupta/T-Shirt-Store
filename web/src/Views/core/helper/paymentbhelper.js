import { Http } from "../../../AxiosInterceptor";
const API = "http://localhost:8000/api";

export const getmeToken = async (userId) => {
  let response;
  try {
    response = await Http.get(`${API}/payment/gettoken/${userId}`);
  } catch (err) {
    console.error("error while getting product due to", err);
  }
  return response?.data || [];
};

export const processPayment = async (userId, paymentInfo) => {
  let response;
  try {
    response = await Http.post(
      `${API}/payment/braintree/${userId}`,
      paymentInfo
    );
  } catch (err) {
    console.error("error while getting product due to", err);
  }
  return response?.data || [];
};
