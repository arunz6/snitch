import { Router } from "express";
import { getme } from "../middleware/auth.middleware.js";
import {
  validateaddtocart,
  validateincrementcartquantity,
} from "../validator/cart.validator.js";
import {
  addtocart,
  getcart,
  incrementcartquantity,
  decrementcartquantity,
} from "../controller/cart.controller.js";
const cartroute = Router();

cartroute.post(
  "/add/:productId/:variantId",
  getme,
  validateaddtocart,
  addtocart,
);

cartroute.get("/getcart", getme, getcart);

cartroute.patch(
  "/quantity/increment/:productId/:variantId",
  getme,
  validateincrementcartquantity,
  incrementcartquantity,
);
cartroute.patch(
  "/quantity/decrement/:productId/:variantId",
  getme,
  validateincrementcartquantity,
  decrementcartquantity,
);

export default cartroute;
