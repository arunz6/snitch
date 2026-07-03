import { Router } from "express";
import {
  validateregisteruser,
  validateLoginUser,
} from "../validator/auth.validator.js";
import {
  registercontroller,
  loginController,
} from "../controller/auth.controller.js";
const authrouter = Router();

// http://localhost:3000/api/auth/register
authrouter.post("/register", validateregisteruser, registercontroller);

//http://localhost:3000/api/auth/login
authrouter.post("/login", validateLoginUser, loginController);

export default authrouter;
