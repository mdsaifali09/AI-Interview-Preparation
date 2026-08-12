import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getCodingHistory } from "../controllers/codingHistoryController.js";

const router = express.Router();

router.get("/", protect, getCodingHistory);

export default router;