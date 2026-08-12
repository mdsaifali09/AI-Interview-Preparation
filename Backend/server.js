import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import interviewHistoryRoutes from "./routes/interviewHistoryRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import codingRoutes from "./routes/codingRoutes.js";
import codingReviewRoutes from "./routes/codingReviewRoutes.js";
import codingQuestionRoutes from "./routes/codingQuestionRoutes.js";
import codingHistoryRoutes from "./routes/codingHistoryRoutes.js";
import questionBankRoutes from "./routes/questionBankRoutes.js";
import favoriteQuestionRoutes from "./routes/favoriteQuestionRoutes.js";
import codingSubmissionRoutes from "./routes/codingSubmissionRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import aiChatRoutes from "./routes/aiChatRoutes.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/interview-history",interviewHistoryRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/resume", resumeRoutes);
//app.use("/api/coding", codingRoutes);
app.use("/api/coding", codingReviewRoutes);
app.use("/api/coding-history", codingHistoryRoutes);
app.use("/api/question-bank",questionBankRoutes);
app.use( "/api/favorite-question",favoriteQuestionRoutes);
app.use("/api/coding-question",codingQuestionRoutes);
app.use("/api/coding-submissions",codingSubmissionRoutes);
app.use("/api/coding", codingRoutes);
app.use("/api/images",imageRoutes);
app.use("/api/ai-chat", aiChatRoutes);


app.get("/", (req, res) => {
  res.send("AI Prep Pro Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});