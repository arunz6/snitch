import axios from "axios";

const productapiinstance = axios.create({
  baseURL: "/api/product",
  withCredentials: true,
});

export const createproduct = async (
FormData
) => {
  const response = await productapiinstance.post("/createproduct", FormData);
  return response.data;
};

export const getproduct = async () => {
  const response = await productapiinstance.get("/getproducs");
  return response.data;
};
