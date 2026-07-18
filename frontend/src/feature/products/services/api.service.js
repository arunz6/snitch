import axios from "axios";

const productapiinstance = axios.create({
  baseURL: "/api/product",
  withCredentials: true,
});

export const createproduct = async (FormData) => {
  const response = await productapiinstance.post("/createproduct", FormData);
  return response.data;
};

export const getproduct = async () => {
  const response = await productapiinstance.get("/getproducs");
  return response.data;
};

export const getallproductsuser = async () => {
  const response = await productapiinstance.get("/allproducts");
  return response.data;
};

export const getproductdetail = async (id) => {
  const response = await productapiinstance.get(`/productdetail/${id}`);
  return response.data;
};

export const addVariant = async (id, formData) => {
  const response = await productapiinstance.post(`/${id}/variants`, formData);
  return response.data;
};

export const updateVariantStock = async (id, variantId, stock) => {
  const response = await productapiinstance.patch(`/${id}/variants/${variantId}/stock`, { stock });
  return response.data;
};

export const deleteVariant = async (id, variantId) => {
  const response = await productapiinstance.delete(`/${id}/variants/${variantId}`);
  return response.data;
};
