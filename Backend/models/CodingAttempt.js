import mongoose from "mongoose";

const codingAttemptSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CodingQuestion",
  },

  language: String,

  code: String,

  overallScore: Number,

  correctness: Number,

  readability: Number,

  optimization: Number,

  timeComplexity: String,

  spaceComplexity: String,

  feedback: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

export default mongoose.model(
  "CodingAttempt",
  codingAttemptSchema
);