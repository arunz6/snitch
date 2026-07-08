import { Router } from "express";
import {
  validateregisteruser,
  validateLoginUser,
} from "../validator/auth.validator.js";
import config from "../config/config.js";
import {
  registercontroller,
  loginController,
  googlecallback,
  getmecontroller,
} from "../controller/auth.controller.js";
import { getme } from "../middleware/auth.middleware.js";
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
  passport.authenticate("google", {
    session: false,
    failureRedirect:
      config.nodeEnv === "development"
        ? "http://localhost:5173/login"
        : "/login",
  }),
  googlecallback,
);

//http://localhost:3000/api/auth/me
authrouter.get("/me", getme, getmecontroller);

export default authrouter;
