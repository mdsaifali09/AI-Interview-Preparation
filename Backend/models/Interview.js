import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      required: true,
    },

    overallScore: {
      type: Number,
      default: 0,
    },

    interviews: [
      {
        question: String,
        answer: String,

        evaluation: {
          technicalScore: Number,
          communicationScore: Number,
          grammarScore: Number,
          relevanceScore: Number,
          overallScore: Number,
          feedback: String,
          strengths: [String],
          improvements: [String],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Interview",
  interviewSchema
);