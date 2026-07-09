import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useproduct } from "../hook/use.product";
import { useNavigate } from "react-router-dom";

const Sellerproductdetails = () => {
  const { handleGetProducts } = useproduct();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sellerproduct = useSelector((state) => state.product.sellersproduct);
  useEffect(() => {
    handleGetProducts("6a4de855e9e743bf484ed923");
  }, [sellerproduct]);
  console.log(sellerproduct)
  return <div></div>;
};

export default Sellerproductdetails;
