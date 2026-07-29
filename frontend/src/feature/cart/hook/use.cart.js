import { additem, getusercart, incrementCartItemApi ,decrementcartitemapi } from "../service/cart.api";
import { useDispatch } from "react-redux";
import { additem as addditemtocart, setitems , incrementCartItem,decrementCartItem} from "../state/cart.slice";

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
    async function handleDecrementCartItem({ productId, variantId }) {
      await decrementcartitemapi({ productId, variantId })
      dispatch(decrementCartItem({ productId, variantId }))
    }

  return { handeladdtocart, handlegetcart ,handleIncrementCartItem,handleDecrementCartItem };
};

export default useCart;
