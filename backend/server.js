import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectToDB } from "./config/connectDB.js";
import { authRouter } from "./routes/auth.route.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
connectToDB();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use(errorHandler);
app.listen(5000, () => {
  console.log("Server Is Running On 5000");
});
