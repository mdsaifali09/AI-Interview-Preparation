
import CodingQuestion from "../models/CodingQuestion.js";
import FavoriteQuestion from "../models/FavoriteQuestion.js";

export const getQuestionBank = async (req, res) => {
  try {
    const {
      category,
      difficulty,
      search,
    } = req.query;

    let filter = {};

    // Category filter
    if (category && category !== "All") {
      filter.category = category;
    }

    // Difficulty filter
    if (difficulty && difficulty !== "All") {
      filter.difficulty = difficulty;
    }

    // Search filter
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Get questions
    const questions = await CodingQuestion.find(filter)
      .sort({ createdAt: -1 });

    // Get user's favorites
    const favorites = await FavoriteQuestion.find({
      user: req.user.id,
    });

    // Convert favorite question IDs to strings
    const favoriteIds = favorites.map(
      (item) => item.question.toString()
    );

    // Prepare questions
    const updatedQuestions = questions.map((q) => ({
      ...q.toObject(),

      // Only visible test cases are sent to frontend
      testCases: (q.testCases || []).filter(
        (test) => !test.hidden
      ),

      // Favorite status
      isFavorite: favoriteIds.includes(
        q._id.toString()
      ),
    }));

    return res.json({
      success: true,
      questions: updatedQuestions,
    });

  } catch (err) {
    console.log("QUESTION BANK ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch questions",
    });
  }
};

