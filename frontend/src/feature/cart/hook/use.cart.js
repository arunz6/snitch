import { additem, getusercart, incrementCartItemApi } from "../service/cart.api";
import { useDispatch } from "react-redux";
import { additem as addditemtocart, setitems , incrementCartItem} from "../state/cart.slice";

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

    async function handleIncrementCartItem({ productId, variantId }) {
        await incrementCartItemApi({ productId, variantId })
        dispatch(incrementCartItem({ productId, variantId }))
    }

  return { handeladdtocart, handlegetcart ,handleIncrementCartItem };
};

export default useCart;
