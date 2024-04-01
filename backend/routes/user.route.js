import express from "express";
import { updateUserProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyUser.js";
const router = express.Router();

router.post("/update/:id", verifyToken, updateUserProfile);

export { router as userRouter };
