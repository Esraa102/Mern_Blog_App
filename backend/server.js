import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import path from "path";
import { connectToDB } from "./config/connectDB.js";
import { authRouter } from "./routes/auth.route.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { userRouter } from "./routes/user.route.js";

const app = express();
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
connectToDB();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);
app.listen(5000, () => {
  console.log("Server Is Running On 5000");
});
