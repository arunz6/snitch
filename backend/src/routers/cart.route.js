import { Router } from "express";
import { getme } from "../middleware/auth.middleware.js";
import { validateaddtocart } from "../validator/cart.validator.js";
import { addtocart } from "../controller/cart.controller.js";
const cartroute = Router();

cartroute.post(
  "/add/:productId/:variantId",
  getme,
  validateaddtocart,
  addtocart,
);

export default cartroute;
