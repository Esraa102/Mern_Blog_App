import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectToDB } from "./config/connectDB.js";
import { userRouter } from "./routes/user.route.js";

const app = express();
connectToDB();

app.use(express.json());
app.use("/api/auth", userRouter);
app.listen(5000, () => {
  console.log("Server Is Running On 5000");
});
