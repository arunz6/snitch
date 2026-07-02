import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}
if (!process.env.PORT) {
  throw new Error("PORT is not defined in the environment variables");
}
if (!process.env.JWTSECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

const config = {
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT,
  jwtSecret: process.env.JWTSECRET,
};

export default config;
