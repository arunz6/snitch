import { setsellerproducts, seterror } from "../state/product.slice";
import { useDispatch } from "react-redux";
import { createproduct, getproduct } from "../services/api.service";

export const useproduct = () => {
  const dispatch = useDispatch();
  async function handlecreateproduct(FormData) {
    const data = await createproduct(FormData);
    return data.product;
  }

  async function handleGetProducts() {
    const data = await getproduct();
    dispatch(setsellerproducts(data.products));
    return data.products;
  }
  return {
    handlecreateproduct,
    handleGetProducts,
  };
};
