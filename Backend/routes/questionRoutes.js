import express from "express";

import {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getQuestionAnalytics,
} from "../controllers/questionController.js";

import protect from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/",
  protect,
  createQuestion
);

router.get(
  "/",
  protect,
  getQuestions
);

router.get(
  "/analytics",
  getQuestionAnalytics
);

router.get(
  "/:id",
  protect,
  getQuestionById
);

router.put(
  "/:id",
  protect,
  updateQuestion
);

router.put(
  "/:id",
  updateQuestion
);

router.delete(
  "/:id",
  protect,
  deleteQuestion
);

router.get(
  "/:id",
  getQuestionById
);

export default router;