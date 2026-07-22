import { additem, getusercart } from "../service/cart.api";
import { useDispatch } from "react-redux";
import { additem as addditemtocart, setitems } from "../state/cart.slice";

const useCart = () => {
  const dispatch = useDispatch();

  async function handeladdtocart({ productid, variantid }) {
    const data = await additem({ productid, variantid });
    dispatch(addditemtocart(data));
  }

  async function handlegetcart() {
    const data = await getusercart();
    dispatch(setitems(data));
  }

  return { handeladdtocart, handlegetcart };
};

export default useCart;
