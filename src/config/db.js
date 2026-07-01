import config from "./config.js";
import mongoose from "mongoose";

async function connectDB() {
  try {
    const conn = await mongoose.connect(config.mongoURI);
    console.log("database is connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

export default connectDB;
