import axios from "axios";

const cartapiinstance = axios.create({
  baseURL: "/api/cart",
  withCredentials: true,
});

export const additem = async ({ productid, variantid }) => {
  const response = await cartapiinstance.post(
    `/add/${productid}/${variantid}`,
    { quantity: 1 },
  );
  return response.data;
};

export const getusercart = async () => {
  const response = await cartapiinstance.get("/getcart");
  return response.data;
};
