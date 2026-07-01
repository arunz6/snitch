import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import authroute from "./routers/auth.route.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser);

app.use("/api/auth", authroute);

export default app;
