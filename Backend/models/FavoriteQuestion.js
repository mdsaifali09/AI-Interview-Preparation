import mongoose from "mongoose";

const favoriteQuestionSchema = new mongoose.Schema({

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

}, {
  timestamps: true,
});

export default mongoose.model(
  "FavoriteQuestion",
  favoriteQuestionSchema
);