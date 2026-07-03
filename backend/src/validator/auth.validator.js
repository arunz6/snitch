import { body, validationResult } from "express-validator";

function validaterequest(req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }
  next();
}

export const validateregisteruser = [
  body("email").isEmail().withMessage("invalid email formate"),
  body("contact").notEmpty().withMessage("contact is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 latter"),
  body("fullname")
    .notEmpty()
    .withMessage("fullname is required ")
    .isLength({ min: 3 })
    .withMessage("fullname must be 3 charactor "),
  body("isseller").isBoolean().withMessage("is seller is must a boolean value"),
  validaterequest,
];

export const validateLoginUser = [
  body("email").isEmail().withMessage("invalid email formate"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 latter"),
  validaterequest,
];
