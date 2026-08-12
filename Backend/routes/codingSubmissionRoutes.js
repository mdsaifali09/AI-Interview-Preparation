
import express from "express";

import protect from "../middleware/authMiddleware.js";


import {
  createSubmission,
  getSubmissionHistory,
  getSubmissionById,
} from "../controllers/codingSubmissionController.js";

import {
  getCodingAnalytics,
} from "../controllers/codingAnalyticsController.js";


const router = express.Router();

router.post(
  "/",
  protect,
  createSubmission
);



router.get(
  "/history",
  protect,
  getSubmissionHistory
);


router.get(
  "/analytics",
  protect,
  getCodingAnalytics
);



router.get(
  "/:id",
  protect,
  getSubmissionById
);



export default router;

