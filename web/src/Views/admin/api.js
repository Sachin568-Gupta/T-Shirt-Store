import { Http } from "../../AxiosInterceptor";
const API = "http://localhost:8000/api";

//category calls
export const createCategory = async (userId, category) => {
  let response;
  try {
    response = await Http.post(
      `${API}/category/createCategory/${userId}`,
      category
    );
    return response;
  } catch (err) {
    console.error("error while creating category due to", err);
  }
};

export const updateCategory = async (categoryId, userId, categoryName) => {
  let response;
  try {
    response = await Http.put(
      `${API}/category/update/${categoryId}/${userId}`,
      categoryName
    );
    return response;
  } catch (err) {
    console.error("error while getting products due to", err);
  }
};
//get all categories
export const getCategories = async () => {
  let response;
  try {
    response = await Http.get(`${API}/category/getCategories`);
    return response?.data?.data || [];
  } catch (err) {
    console.error("error while getting category due to", err);
  }
};
export const getSingleCategory = async (categoryId) => {
  let response;
  try {
    response = await Http.get(`${API}/category/getCategory/${categoryId}`);
    return response?.data || [];
  } catch (err) {
    console.error("error while getting category due to", err);
  }
};

//products calls

//create a product
export const createaProduct = async (userId, product) => {
  let response;
  try {
    response = await Http.postForm(`${API}/product/create/${userId}`, product);
    return response?.data;
  } catch (err) {
    console.error("error while getting category due to", err);
  }
};

//get all products
export const getProducts = async () => {
  let response;
  try {
    response = await Http.get(`${API}/getAllProducts`);
    return response?.data || [];
  } catch (err) {
    console.error("error while getting products due to", err);
  }
};

//delete a product

export const deleteProduct = async (productId, userId) => {
  let response;
  try {
    response = await Http.deleteRequest(
      `${API}/product/${productId}/${userId}`
    );
    return response;
  } catch (err) {
    console.error("error while getting products due to", err);
  }
};
export const deleteCategory = async (categoryId, userId) => {
  let response;
  try {
    response = await Http.deleteRequest(
      `${API}/category/delete/${categoryId}/${userId}`
    );
    return response;
  } catch (err) {
    console.error("error while getting products due to", err);
  }
};

//get a product

export const getProduct = async (productId) => {
  let response;
  try {
    response = await Http.get(`${API}/product/${productId}`);
    return response?.data;
  } catch (err) {
    console.error("error while getting products due to", err);
  }
};

//update a product

export const updateProduct = async (productId, userId, product) => {
  let response;
  try {
    response = await Http.put(`${API}/product/${productId}/${userId}`, product);
    return response;
  } catch (err) {
    console.error("error while getting products due to", err);
  }
};
