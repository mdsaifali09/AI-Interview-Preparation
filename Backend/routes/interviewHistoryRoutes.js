import express from "express";

import {
  saveInterview,getInterviewHistory,
  getInterviewById,
} from "../controllers/interviewHistoryController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/save",
  protect,
  saveInterview
);

router.get(
"/",
protect,
getInterviewHistory
);

router.get(
  "/:id",
  protect,
  getInterviewById
);

export default router;