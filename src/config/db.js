import config from "./config.js";
import mongoose from "mongoose";

async function connectDB() {
  try {
    const conn = await mongoose.connect(config.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
   
  }
}
