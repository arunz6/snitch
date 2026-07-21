import { additem, getusercart } from "../service/cart.api";
import { useDispatch } from "react-redux";
import { additem as addditemtocart } from "../state/cart.slice";

const useCart = () => {
  const dispatch = useDispatch();

  async function handeladdtocart({ productid, variantid }) {
    const data = await additem({ productid, variantid });
    dispatch(addditemtocart(data));
  }

  return { handeladdtocart };
};

export default useCart;
