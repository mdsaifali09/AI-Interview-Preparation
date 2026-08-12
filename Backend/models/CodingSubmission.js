
import mongoose from "mongoose";

const codingSubmissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CodingQuestion",
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    verdict: {
      type: String,
      enum: [
        "Accepted",
        "Wrong Answer",
        "Compilation Error",
        "Runtime Error",
        "Time Limit Exceeded",
        "Needs Improvement",
        "Pending",
      ],
      default: "Pending",
    },

    passed: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      default: 0,
    },

    score: {
      type: Number,
      default: 0,
    },

    correctness: {
      type: Number,
      default: 0,
    },

    timeComplexity: {
      type: String,
      default: "",
    },

    spaceComplexity: {
      type: String,
      default: "",
    },

    feedback: {
      type: String,
      default: "",
    },

    executionTime: {
      type: Number,
      default: 0,
    },

    error: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "CodingSubmission",
  codingSubmissionSchema
);

