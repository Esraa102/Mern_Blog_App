import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MOGODB_CONNECTION_URI);
    console.log("Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
