import express from "express";
import {
  updateUserProfile,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyUser.js";
const router = express.Router();

router.post("/update/:id", verifyToken, updateUserProfile);
router.delete("/delete/:id", verifyToken, deleteUser);

export { router as userRouter };
