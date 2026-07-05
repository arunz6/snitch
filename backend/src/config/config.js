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
if (!process.env.CLINTIDGOOGLE) {
  throw new Error("CLINTIDGOOGLE is not defined in the environment variables");
}
if (!process.env.CLINTSECRETGOOGLE) {
  throw new Error(
    "CLINTSECRETGOOGLE is not defined in the environment variables",
  );
}
if (!process.env.NODE_ENV) {
  throw new Error("NODE_ENV is not defined in the environment variables");
}

const config = {
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT,
  jwtSecret: process.env.JWTSECRET,
  clintIdGoogle: process.env.CLINTIDGOOGLE,
  clintSecretGoogle: process.env.CLINTSECRETGOOGLE,
  nodeEnv: process.env.NODE_ENV || "development",
};

export default config;
