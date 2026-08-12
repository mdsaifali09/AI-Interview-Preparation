import express from "express";
import protect from "../middleware/authMiddleware.js";
import { toggleFavorite } from "../controllers/favoriteQuestionController.js";

const router = express.Router();

router.post("/", protect, toggleFavorite);

export default router;