import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createImage,
} from "../controllers/imageController.js";

const router = express.Router();

router.post(
  "/generate",
  protect,
  createImage
);

export default router;