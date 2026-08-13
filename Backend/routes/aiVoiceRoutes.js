import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  voiceChat,
} from "../controllers/aiVoiceController.js";

const router = express.Router();

router.post(
  "/chat",
  protect,
  voiceChat
);

export default router;