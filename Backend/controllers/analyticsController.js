import Interview from "../models/Interview.js";

export const getAnalytics = async (req, res) => {
  try {

    const interviews = await Interview.find({
      user: req.user.id,
    }).sort({ createdAt: 1 });

    const totalInterviews = interviews.length;

    let averageScore = 0;
    let bestScore = 0;

    if (totalInterviews > 0) {

      averageScore = Math.round(

        interviews.reduce(
          (sum, item) => sum + item.overallScore,
          0
        ) / totalInterviews

      );

      bestScore = Math.max(
        ...interviews.map(
          (i) => i.overallScore
        )
      );

    }

    // Score Trend
    const scoreTrend = interviews.map((item) => ({

      date: new Date(item.createdAt)
        .toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
        }),

      score: item.overallScore,

    }));

    // Category Performance
    const categoryMap = {};

    interviews.forEach((item) => {

      if (!categoryMap[item.category]) {

        categoryMap[item.category] = {
          total: 0,
          count: 0,
        };

      }

      categoryMap[item.category].total += item.overallScore;
      categoryMap[item.category].count++;

    });

    const categoryPerformance = Object.keys(categoryMap).map(
      (category) => ({

        category,

        score: Math.round(
          categoryMap[category].total /
          categoryMap[category].count
        ),

      })
    );

    // Difficulty Stats
    const difficultyMap = {};

    interviews.forEach((item) => {

      difficultyMap[item.difficulty] =
        (difficultyMap[item.difficulty] || 0) + 1;

    });

    const difficultyStats = Object.keys(difficultyMap).map(
      (difficulty) => ({

        difficulty,

        count: difficultyMap[difficulty],

      })
    );

    res.json({

      success: true,

      totalInterviews,

      averageScore,

      bestScore,

      scoreTrend,

      categoryPerformance,

      difficultyStats,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};