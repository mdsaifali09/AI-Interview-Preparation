import express from "express";

import {
  generateInterviewQuestion,
  evaluateInterviewAnswer,
} from "../controllers/interviewController.js";

const router = express.Router();

router.post(
  "/generate-question",
  generateInterviewQuestion
);

router.post(
  "/evaluate-answer",
  evaluateInterviewAnswer
);

export default router;