import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import protect from "../middleware/authMiddleware.js";
import { getResumeHistory, getResumeReport, uploadResume } from "../controllers/resumeController.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("resume"),
  uploadResume
);

router.get(
  "/history",
  protect,
  getResumeHistory
);

router.get(
  "/history/:id",
  protect,
  getResumeReport
);

export default router;