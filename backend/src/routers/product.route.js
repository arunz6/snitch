import { Router } from "express";
import {
  createProduct,
  getproducs,
  getAllProducts,
  getProductDeta,
  addVariant,
  updateVariantStock,
  deleteVariant,
} from "../controller/product.controller.js";
import { isSeller } from "../middleware/auth.middleware.js";
import multer from "multer";
import { createProductValidator } from "../validator/product.validator.js";
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

const productroutes = new Router();

// http://localhost:3000/api/product/createproduct
productroutes.post(
  "/createproduct",
  isSeller,
  upload.array("images", 5),
  createProductValidator,
  createProduct,
);

//http://localhost:3000/api/product/getproducs
productroutes.get("/getproducs", isSeller, getproducs);

//http://localhost:3000/api/product/allproducts
productroutes.get("/allproducts", getAllProducts);

//http://localhost:3000/api/product/productdetail/:id
productroutes.get("/productdetail/:id", getProductDeta);

// Add variant
productroutes.post(
  "/:id/variants",
  isSeller,
  upload.array("images", 5),
  addVariant
);

// Update variant stock
productroutes.patch(
  "/:id/variants/:variantId/stock",
  isSeller,
  updateVariantStock
);

// Delete variant
productroutes.delete(
  "/:id/variants/:variantId",
  isSeller,
  deleteVariant
);

export default productroutes;
