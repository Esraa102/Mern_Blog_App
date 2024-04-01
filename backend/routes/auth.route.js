import express from "express";

import {
  registerUser,
  loginUser,
  googleAuth,
  logOutUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);
router.get("/logout", logOutUser);

export { router as authRouter };
