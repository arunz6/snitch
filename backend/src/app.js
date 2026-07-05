import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import authroute from "./routers/auth.route.js";
import config from "./config/config.js";
import passport from "passport";
import cors from "cors";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
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
app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: config.clintIdGoogle,
      clientSecret: config.clintSecretGoogle,
      callbackURL: "/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

app.use("/api/auth", authroute);

export default app;
