import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  generateCodingQuestion,
} from "../controllers/codingQuestionController.js";

const router = express.Router();

router.post(
  "/generate",
  protect,
  generateCodingQuestion
);

export default router;