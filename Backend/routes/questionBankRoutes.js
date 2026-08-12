import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getQuestionBank,
} from "../controllers/questionBankController.js";

const router = express.Router();

router.get("/", protect, getQuestionBank);

export default router;