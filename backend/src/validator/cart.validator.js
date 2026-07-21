import { param, body, validationResult } from "express-validator";

const validateRrequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateaddtocart = [
  param("productId").isMongoId().withMessage("invalid product id"),
  param("variantId").isMongoId().withMessage("invalid variant id"),
  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("quantity must be at least 1"),
  validateRrequest,
];
