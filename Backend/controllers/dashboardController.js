import Interview from "../models/Interview.js";

export const getDashboardStats = async (req, res) => {
  try {

    const interviews = await Interview.find({
      user: req.user.id,
    });

    const totalInterviews = interviews.length;

    let averageScore = 0;
    let bestScore = 0;

    if (totalInterviews > 0) {

      averageScore = Math.round(

        interviews.reduce(
          (sum, item) =>
            sum + item.overallScore,
          0
        ) / totalInterviews

      );

      bestScore = Math.max(
        ...interviews.map(
          (i) => i.overallScore
        )
      );

    }

    const recentInterviews = interviews
      .sort(
        (a, b) =>
          b.createdAt - a.createdAt
      )
      .slice(0, 5);

    res.json({
      success: true,
      totalInterviews,
      averageScore,
      bestScore,
      recentInterviews,
      bestCategory,
      bestCategoryScore,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

   

  const categoryMap = {};

  const interviews = await Interview.find({

user:req.user.id

});

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

let bestCategory = "";

let bestCategoryScore = 0;

Object.keys(categoryMap).forEach((cat) => {

  const avg = Math.round(

    categoryMap[cat].total /
    categoryMap[cat].count

  );

  if (avg > bestCategoryScore) {

    bestCategoryScore = avg;

    bestCategory = cat;

  }

});

};