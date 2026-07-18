import {
  setsellerproducts,
  setallproducts,
  setproductdetail,
} from "../state/product.slice";
import { useDispatch } from "react-redux";
import {
  createproduct,
  getproduct,
  getallproductsuser,
  getproductdetail,
  addVariant,
  updateVariantStock,
  deleteVariant,
} from "../services/api.service";

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

  async function handlgetallproductuser() {
    const data = await getallproductsuser();
    dispatch(setallproducts(data.products));

    return data.products;
  }

  async function handlegetproductdetail(id) {
    const data = await getproductdetail(id);
    dispatch(setproductdetail(data.product));
    return data.product;
  }

  async function handlecreatevariant(id, formData) {
    const data = await addVariant(id, formData);
    dispatch(setproductdetail(data.product));
    return data.product;
  }

  async function handleupdatevariantstock(id, variantId, stock) {
    const data = await updateVariantStock(id, variantId, stock);
    dispatch(setproductdetail(data.product));
    return data.product;
  }

  async function handledeletevariant(id, variantId) {
    const data = await deleteVariant(id, variantId);
    dispatch(setproductdetail(data.product));
    return data.product;
  }

  return {
    handlecreateproduct,
    handleGetProducts,
    handlgetallproductuser,
    handlegetproductdetail,
    handlecreatevariant,
    handleupdatevariantstock,
    handledeletevariant,
  };
};
