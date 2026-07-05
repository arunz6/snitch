import { Router } from "express";
import {
  validateregisteruser,
  validateLoginUser,
} from "../validator/auth.validator.js";
import {
  registercontroller,
  loginController,
  googlecallback,
} from "../controller/auth.controller.js";
import passport from "passport";
const authrouter = Router();

// http://localhost:3000/api/auth/register
authrouter.post("/register", validateregisteruser, registercontroller);

//http://localhost:3000/api/auth/login
authrouter.post("/login", validateLoginUser, loginController);

//http://localhost:3000/api/auth/google
authrouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authrouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googlecallback,
);

export default authrouter;
