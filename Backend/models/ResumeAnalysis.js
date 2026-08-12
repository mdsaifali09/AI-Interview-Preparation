import mongoose from "mongoose";

const resumeAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    atsScore: Number,

    jobMatch: Number,

    strengths: [String],

    weaknesses: [String],

    missingSkills: [String],

    suggestions: [String],

  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "ResumeAnalysis",
  resumeAnalysisSchema
);