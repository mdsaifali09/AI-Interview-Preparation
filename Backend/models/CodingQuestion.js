
import mongoose from "mongoose";

const codingQuestionSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  difficulty: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  inputExample: String,

  outputExample: String,

  constraints: String,

  tags: [
    {
      type: String,
    },
  ],

  estimatedTime: {
    type: Number,
    default: 30,
  },

  acceptanceRate: {
    type: Number,
    default: 78,
  },

  // Test Cases
  testCases: [
    {
      input: {
        type: String,
        required: true,
      },

      expectedOutput: {
        type: String,
        required: true,
      },

      hidden: {
        type: Boolean,
        default: true,
      },
    },
  ],

  starterCode: {
    java: String,
    python: String,
    javascript: String,
    cpp: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

export default mongoose.model(
  "CodingQuestion",
  codingQuestionSchema
);

