import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useproduct } from "../hook/use.product";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Sellerproductdetails = () => {
  const { handleGetProducts ,handlegetproductdetail } = useproduct();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id}=useParams()
  const sellerproduct = useSelector((state) => state.product.sellersproduct);
  useEffect(() => {
 handlegetproductdetail("6a4e220ef8c3be2faf116f55");

  }, []);
 
  return <div></div>;
};

export default Sellerproductdetails;
