import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectToDB } from "./config/connectDB.js";

const app = express();

connectToDB();
app.listen(5000, () => {
  console.log("Server Is Running On 5000");
});
