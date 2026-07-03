import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import authroute from "./routers/auth.route.js";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // your Vite frontend URL
    credentials: true, // allows cookies/auth headers to be sent
  }),
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authroute);

export default app;
