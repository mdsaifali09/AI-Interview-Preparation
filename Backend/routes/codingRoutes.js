import express from "express";
import { runCode } from "../controllers/codingController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/run", protect, runCode);

export default router;