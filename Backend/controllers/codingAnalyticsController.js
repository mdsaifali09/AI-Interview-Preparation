
import CodingSubmission from "../models/CodingSubmission.js";

export const getCodingAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    // ============================================
    // TOTAL SUBMISSIONS
    // ============================================

    const totalSubmissions =
      await CodingSubmission.countDocuments({
        user: userId,
      });

    // ============================================
    // ACCEPTED SUBMISSIONS
    // ============================================

    const acceptedSubmissions =
      await CodingSubmission.countDocuments({
        user: userId,
        verdict: "Accepted",
      });

    // ============================================
    // NEEDS IMPROVEMENT
    // ============================================

    const needsImprovement =
      await CodingSubmission.countDocuments({
        user: userId,
        verdict: "Needs Improvement",
      });

    // ============================================
    // ALL SUBMISSIONS
    // ============================================

    const submissions =
      await CodingSubmission.find({
        user: userId,
      })
        .populate(
          "question",
          "title difficulty category"
        )
        .sort({
          createdAt: -1,
        });

    // ============================================
    // AVERAGE SCORE
    // ============================================

    let averageScore = 0;

    if (submissions.length > 0) {
      const totalScore =
        submissions.reduce(
          (sum, submission) =>
            sum +
            (Number(submission.score) || 0),
          0
        );

      averageScore = Math.round(
        totalScore / submissions.length
      );
    }

    // ============================================
    // BEST SCORE
    // ============================================

    let bestScore = 0;

    if (submissions.length > 0) {
      bestScore = Math.max(
        ...submissions.map(
          (submission) =>
            Number(submission.score) || 0
        )
      );
    }

    // ============================================
    // DIFFICULTY STATISTICS
    // ============================================

    const difficultyStats = {
      Easy: 0,
      Medium: 0,
      Hard: 0,
    };

    submissions.forEach((submission) => {
      const difficulty =
        submission.question?.difficulty;

      if (
        difficulty &&
        difficultyStats[difficulty] !== undefined
      ) {
        difficultyStats[difficulty]++;
      }
    });

    // ============================================
    // CATEGORY STATISTICS
    // ============================================

    const categoryStats = {};

    submissions.forEach((submission) => {
      const category =
        submission.question?.category;

      if (!category) return;

      if (!categoryStats[category]) {
        categoryStats[category] = 0;
      }

      categoryStats[category]++;
    });

    // ============================================
    // CODING STREAK
    // ============================================

    const submissionDates = submissions
      .map((submission) => {
        if (!submission.createdAt) {
          return null;
        }

        const date = new Date(
          submission.createdAt
        );

        return date
          .toISOString()
          .split("T")[0];
      })
      .filter(Boolean);

    // Remove duplicate dates

    const uniqueDates = [
      ...new Set(submissionDates),
    ];

    // Sort newest -> oldest

    uniqueDates.sort(
      (a, b) =>
        new Date(b).getTime() -
        new Date(a).getTime()
    );

    // ============================================
    // CURRENT STREAK
    // ============================================

    let currentStreak = 0;

    if (uniqueDates.length > 0) {
      const today = new Date();

      today.setHours(
        0,
        0,
        0,
        0
      );

      const latestDate =
        new Date(uniqueDates[0]);

      latestDate.setHours(
        0,
        0,
        0,
        0
      );

      const differenceFromToday =
        Math.floor(
          (today.getTime() -
            latestDate.getTime()) /
            (1000 * 60 * 60 * 24)
        );

      // Streak is active if user
      // submitted today or yesterday

      if (differenceFromToday <= 1) {
        currentStreak = 1;

        for (
          let i = 1;
          i < uniqueDates.length;
          i++
        ) {
          const previous =
            new Date(uniqueDates[i - 1]);

          const current =
            new Date(uniqueDates[i]);

          previous.setHours(
            0,
            0,
            0,
            0
          );

          current.setHours(
            0,
            0,
            0,
            0
          );

          const difference =
            Math.floor(
              (previous.getTime() -
                current.getTime()) /
                (1000 * 60 * 60 * 24)
            );

          if (difference === 1) {
            currentStreak++;
          } else {
            break;
          }
        }
      }
    }

    // ============================================
    // LONGEST STREAK
    // ============================================

    let longestStreak = 0;

    if (uniqueDates.length > 0) {
      let streak = 1;

      for (
        let i = 1;
        i < uniqueDates.length;
        i++
      ) {
        const previous =
          new Date(uniqueDates[i - 1]);

        const current =
          new Date(uniqueDates[i]);

        previous.setHours(
          0,
          0,
          0,
          0
        );

        current.setHours(
          0,
          0,
          0,
          0
        );

        const difference =
          Math.floor(
            (previous.getTime() -
              current.getTime()) /
              (1000 * 60 * 60 * 24)
          );

        if (difference === 1) {
          streak++;
        } else {
          longestStreak =
            Math.max(
              longestStreak,
              streak
            );

          streak = 1;
        }
      }

      longestStreak =
        Math.max(
          longestStreak,
          streak
        );
    }

    // ============================================
    // ACTIVE DAYS
    // ============================================

    const activeDays =
      uniqueDates.length;

    // ============================================
    // LAST 7 DAYS ACTIVITY
    // ============================================

    const weeklyActivity = [];

    for (
      let i = 6;
      i >= 0;
      i--
    ) {
      const date = new Date();

      date.setDate(
        date.getDate() - i
      );

      date.setHours(
        0,
        0,
        0,
        0
      );

      const dateString =
        date
          .toISOString()
          .split("T")[0];

      const count =
        submissions.filter(
          (submission) => {
            if (!submission.createdAt) {
              return false;
            }

            const submissionDate =
              new Date(
                submission.createdAt
              )
                .toISOString()
                .split("T")[0];

            return (
              submissionDate ===
              dateString
            );
          }
        ).length;

      weeklyActivity.push({
        date: dateString,
        submissions: count,
      });
    }

    // ============================================
    // RECENT SUBMISSIONS
    // ============================================

    const recentSubmissions =
      submissions.slice(0, 10);

    // ============================================
    // FINAL RESPONSE
    // ============================================

    return res.json({
      success: true,

      analytics: {
        totalSubmissions,

        acceptedSubmissions,

        needsImprovement,

        averageScore,

        bestScore,

        currentStreak,

        longestStreak,

        activeDays,

        weeklyActivity,

        difficultyStats,

        categoryStats,

        recentSubmissions,
      },
    });
  } catch (error) {
    console.log(
      "CODING ANALYTICS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Unable to fetch coding analytics",
    });
  }
};

