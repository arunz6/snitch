import { Router } from "express";
import { getme } from "../middleware/auth.middleware.js";
const cartroute = Router();

cartroute.post("/add/:productId/:variantId", getme);

export default cartroute;
