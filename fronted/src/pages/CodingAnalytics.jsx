
import { useEffect, useState } from "react";
import { getCodingAnalytics } from "../services/codingSubmissionService";

function CodingAnalytics() {

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {

    try {

      const result = await getCodingAnalytics();

      setAnalytics(result.analytics);

    } catch (error) {

      console.log(
        "CODING ANALYTICS ERROR:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  if (loading) {

    return (

      <div className="min-h-screen bg-slate-100 flex items-center justify-center">

        <div className="bg-white rounded-2xl shadow-lg px-8 py-6">

          <div className="flex items-center gap-3">

            <div className="w-6 h-6 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

            <span className="font-semibold text-gray-700">

              Loading coding analytics...

            </span>

          </div>

        </div>

      </div>

    );

  }


  if (!analytics) {

    return (

      <div className="min-h-screen bg-slate-100 flex items-center justify-center">

        <div className="text-center">

          <div className="text-6xl mb-4">

            📊

          </div>

          <h2 className="text-2xl font-bold">

            Analytics Unavailable

          </h2>

          <p className="text-gray-500 mt-2">

            Unable to load your coding performance.

          </p>

        </div>

      </div>

    );

  }


  

const {
  totalSubmissions = 0,
  acceptedSubmissions = 0,
  needsImprovement = 0,
  averageScore = 0,
  bestScore = 0,

  currentStreak = 0,
  longestStreak = 0,
  activeDays = 0,
  weeklyActivity = [],

  difficultyStats = {
    Easy: 0,
    Medium: 0,
    Hard: 0,
  },

  categoryStats = {},

  recentSubmissions = [],
} = analytics;






  const acceptanceRate =
    totalSubmissions > 0
      ? Math.round(
          (acceptedSubmissions /
            totalSubmissions) *
            100
        )
      : 0;


  const difficulties = [

    {
      name: "Easy",
      value: difficultyStats.Easy || 0,
      icon: "🟢",
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-100",
    },

    {
      name: "Medium",
      value: difficultyStats.Medium || 0,
      icon: "🟡",
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-100",
    },

    {
      name: "Hard",
      value: difficultyStats.Hard || 0,
      icon: "🔴",
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-100",
    },

  ];


  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50 p-6 md:p-8">

      <div className="max-w-7xl mx-auto">


        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-xl mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full text-sm mb-4">

                🤖 AI Coding Analytics

              </div>

              <h1 className="text-3xl md:text-4xl font-bold">

                Your Coding Performance

              </h1>

              <p className="text-white/80 mt-2">

                Track your progress, submissions and coding performance.

              </p>

            </div>


            <div className="bg-white/15 backdrop-blur rounded-2xl px-6 py-5 text-center">

              <p className="text-white/70 text-sm">

                Best Score

              </p>

              <p className="text-4xl font-bold mt-1">

                {bestScore}%

              </p>

            </div>

          </div>

        </div>


        {/* ========================================= */}
        {/* STAT CARDS */}
        {/* ========================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">


          {/* TOTAL */}

          <div className="bg-white rounded-2xl p-6 shadow-md border border-blue-100 hover:shadow-xl transition">

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">

                💻

              </div>

              <span className="text-sm text-gray-400">

                Total

              </span>

            </div>

            <p className="text-gray-500 mt-5">

              Total Submissions

            </p>

            <p className="text-3xl font-bold text-gray-900 mt-1">

              {totalSubmissions}

            </p>

          </div>


          {/* ACCEPTED */}

          <div className="bg-white rounded-2xl p-6 shadow-md border border-green-100 hover:shadow-xl transition">

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">

                ✅

              </div>

              <span className="text-sm text-green-600 font-semibold">

                {acceptanceRate}%

              </span>

            </div>

            <p className="text-gray-500 mt-5">

              Accepted

            </p>

            <p className="text-3xl font-bold text-green-600 mt-1">

              {acceptedSubmissions}

            </p>

          </div>


          {/* IMPROVEMENT */}

          <div className="bg-white rounded-2xl p-6 shadow-md border border-yellow-100 hover:shadow-xl transition">

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-2xl">

                ⚠️

              </div>

            </div>

            <p className="text-gray-500 mt-5">

              Needs Improvement

            </p>

            <p className="text-3xl font-bold text-yellow-600 mt-1">

              {needsImprovement}

            </p>

          </div>


          {/* AVERAGE */}

          <div className="bg-white rounded-2xl p-6 shadow-md border border-purple-100 hover:shadow-xl transition">

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">

                ⭐

              </div>

            </div>

            <p className="text-gray-500 mt-5">

              Average Score

            </p>

            <p className="text-3xl font-bold text-purple-600 mt-1">

              {averageScore}%

            </p>

          </div>

        </div>


        {/* ========================================= */}
        {/* MAIN GRID */}
        {/* ========================================= */}

        <div className="grid lg:grid-cols-2 gap-7 mb-8">


          {/* ========================================= */}
          {/* DIFFICULTY */}
          {/* ========================================= */}

          <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-bold">

                  🎯 Difficulty Progress

                </h2>

                <p className="text-gray-500 text-sm mt-1">

                  Questions attempted by difficulty

                </p>

              </div>

            </div>


            <div className="space-y-5">

              {difficulties.map((item) => {

                const percentage =
                  totalSubmissions > 0
                    ? Math.round(
                        (item.value /
                          totalSubmissions) *
                          100
                      )
                    : 0;

                return (

                  <div key={item.name}>

                    <div className="flex justify-between mb-2">

                      <div className="flex items-center gap-2">

                        <span>

                          {item.icon}

                        </span>

                        <span className="font-semibold">

                          {item.name}

                        </span>

                      </div>

                      <span className="text-sm text-gray-500">

                        {item.value} submissions

                      </span>

                    </div>


                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">

                      <div
                        className={`h-full rounded-full ${item.name === "Easy"
                          ? "bg-green-500"
                          : item.name === "Medium"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                        }`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                  </div>

                );

              })}

            </div>

          </div>


          {/* ========================================= */}
          {/* PERFORMANCE */}
          {/* ========================================= */}

          <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">

            <h2 className="text-2xl font-bold">

              📈 Performance Overview

            </h2>

            <p className="text-gray-500 text-sm mt-1">

              Your current coding performance

            </p>


            <div className="mt-7 flex items-center justify-center">

              <div className="relative w-48 h-48">

                <div className="absolute inset-0 rounded-full bg-gray-100" />

                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      `conic-gradient(#4f46e5 ${averageScore * 3.6}deg, #e5e7eb 0deg)`,
                  }}
                />

                <div className="absolute inset-5 bg-white rounded-full flex flex-col items-center justify-center">

                  <p className="text-4xl font-bold text-indigo-600">

                    {averageScore}%

                  </p>

                  <p className="text-gray-500 text-sm">

                    Average Score

                  </p>

                </div>

              </div>

            </div>


            <div className="grid grid-cols-2 gap-4 mt-7">

              <div className="bg-green-50 rounded-2xl p-4 text-center">

                <p className="text-sm text-gray-500">

                  Accepted Rate

                </p>

                <p className="text-2xl font-bold text-green-600 mt-1">

                  {acceptanceRate}%

                </p>

              </div>


              <div className="bg-indigo-50 rounded-2xl p-4 text-center">

                <p className="text-sm text-gray-500">

                  Best Score

                </p>

                <p className="text-2xl font-bold text-indigo-600 mt-1">

                  {bestScore}%

                </p>

              </div>

            </div>

          </div>

        </div>


        
{/* ========================================= */}
{/* CODING STREAK */}
{/* ========================================= */}

<div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 mb-8">

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">

    <div>

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl">

          🔥

        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-900">

            Coding Streak

          </h2>

          <p className="text-gray-500 text-sm">

            Stay consistent and keep solving!

          </p>

        </div>

      </div>

    </div>


    <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-2">

      <span className="text-orange-700 font-semibold">

        🔥 Keep Going!

      </span>

    </div>

  </div>


  {/* STATS */}

  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">


    {/* CURRENT STREAK */}

    <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 rounded-2xl p-5">

      <div className="flex items-center justify-between">

        <p className="text-gray-500 text-sm">

          Current Streak

        </p>

        <span className="text-2xl">

          🔥

        </span>

      </div>

      <p className="text-4xl font-bold text-orange-600 mt-3">

        {analytics.currentStreak || 0}

      </p>

      <p className="text-sm text-gray-500 mt-1">

        consecutive days

      </p>

    </div>


    {/* LONGEST STREAK */}

    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-5">

      <div className="flex items-center justify-between">

        <p className="text-gray-500 text-sm">

          Longest Streak

        </p>

        <span className="text-2xl">

          🏆

        </span>

      </div>

      <p className="text-4xl font-bold text-purple-600 mt-3">

        {analytics.longestStreak || 0}

      </p>

      <p className="text-sm text-gray-500 mt-1">

        consecutive days

      </p>

    </div>



{/* ========================================= */}
{/* CODING PERFORMANCE GRAPH */}
{/* ========================================= */}

<div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 mb-8">

  <div className="flex items-center gap-3 mb-6">

    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-2xl">
      📈
    </div>

    <div>
      <h2 className="text-2xl font-bold text-gray-900">
        Coding Performance
      </h2>

      <p className="text-gray-500 text-sm">
        Track your scores across recent submissions
      </p>
    </div>

  </div>


  {recentSubmissions.length === 0 ? (

    <div className="text-center py-12 text-gray-500">

      <div className="text-5xl mb-3">
        📊
      </div>

      <p className="font-medium">
        No performance data available yet.
      </p>

      <p className="text-sm mt-1">
        Submit coding solutions to see your progress.
      </p>

    </div>

  ) : (

    <div className="space-y-5">

      {recentSubmissions
        .slice()
        .reverse()
        .map((submission, index) => {

          const score =
            Number(submission.score) || 0;

          const title =
            submission.question?.title ||
            "Coding Question";

          return (

            <div
              key={submission._id || index}
              className="group"
            >

              <div className="flex items-center justify-between mb-2">

                <div className="flex items-center gap-3 min-w-0">

                  <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-sm font-bold text-indigo-600">
                    {index + 1}
                  </div>

                  <p className="font-semibold text-gray-800 truncate">
                    {title}
                  </p>

                </div>

                <span className="font-bold text-indigo-600 ml-3">
                  {score}%
                </span>

              </div>


              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min(
                      Math.max(score, 0),
                      100
                    )}%`,
                  }}
                />

              </div>


              <div className="flex justify-between mt-1">

                <span className="text-xs text-gray-400">
                  {submission.language || "Unknown"}
                </span>

                <span className="text-xs text-gray-400">
                  {submission.createdAt
                    ? new Date(
                        submission.createdAt
                      ).toLocaleDateString()
                    : ""}
                </span>

              </div>

            </div>

          );

        })}

    </div>

  )}

</div>




{/* ========================================= */}
{/* DIFFICULTY & CATEGORY ANALYTICS */}
{/* ========================================= */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

  {/* DIFFICULTY ANALYSIS */}

  <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">

    <div className="flex items-center gap-3 mb-6">

      <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl">
        🎯
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Difficulty Analysis
        </h2>

        <p className="text-sm text-gray-500">
          Questions attempted by difficulty
        </p>
      </div>

    </div>


    {Object.entries(
      difficultyStats || {}
    ).map(([difficulty, count]) => {

      const total =
        Object.values(
          difficultyStats || {}
        ).reduce(
          (sum, value) =>
            sum + Number(value || 0),
          0
        );

      const percentage =
        total > 0
          ? Math.round(
              (Number(count) / total) * 100
            )
          : 0;


      const styles = {

        Easy: {
          bg: "bg-green-500",
          light: "bg-green-50",
          text: "text-green-700",
          icon: "🟢",
        },

        Medium: {
          bg: "bg-yellow-500",
          light: "bg-yellow-50",
          text: "text-yellow-700",
          icon: "🟡",
        },

        Hard: {
          bg: "bg-red-500",
          light: "bg-red-50",
          text: "text-red-700",
          icon: "🔴",
        },

      };


      const style =
        styles[difficulty] || {
          bg: "bg-indigo-500",
          light: "bg-indigo-50",
          text: "text-indigo-700",
          icon: "🔵",
        };


      return (

        <div
          key={difficulty}
          className={`${style.light} rounded-2xl p-4 mb-4 border border-gray-100`}
        >

          <div className="flex items-center justify-between mb-3">

            <div className="flex items-center gap-2">

              <span>
                {style.icon}
              </span>

              <span className="font-semibold text-gray-800">
                {difficulty}
              </span>

            </div>

            <div className="text-right">

              <span className={`font-bold ${style.text}`}>
                {count}
              </span>

              <span className="text-gray-500 text-sm">
                {" "}questions
              </span>

            </div>

          </div>


          <div className="w-full h-3 bg-white rounded-full overflow-hidden">

            <div
              className={`${style.bg} h-full rounded-full transition-all duration-700`}
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>


          <p className="text-xs text-gray-500 mt-2">
            {percentage}% of your attempts
          </p>

        </div>

      );

    })}

  </div>


  {/* CATEGORY ANALYSIS */}

  <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">

    <div className="flex items-center gap-3 mb-6">

      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl">
        📚
      </div>

      <div>

        <h2 className="text-2xl font-bold text-gray-900">
          Category Analysis
        </h2>

        <p className="text-sm text-gray-500">
          Topics you practice the most
        </p>

      </div>

    </div>


    {Object.keys(
      categoryStats || {}
    ).length === 0 ? (

      <div className="text-center py-10">

        <div className="text-5xl mb-3">
          📊
        </div>

        <p className="text-gray-500">
          No category data available yet.
        </p>

      </div>

    ) : (

      <div className="space-y-4">

        {Object.entries(
          categoryStats || {}
        )
          .sort(
            ([, a], [, b]) =>
              Number(b) - Number(a)
          )
          .map(
            ([category, count], index) => {

              const total =
                Object.values(
                  categoryStats || {}
                ).reduce(
                  (sum, value) =>
                    sum + Number(value || 0),
                  0
                );

              const percentage =
                total > 0
                  ? Math.round(
                      (Number(count) / total) *
                        100
                    )
                  : 0;


              return (

                <div
                  key={category}
                  className="group"
                >

                  <div className="flex items-center justify-between mb-2">

                    <div className="flex items-center gap-3">

                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-sm font-bold text-indigo-600">

                        {index + 1}

                      </div>

                      <span className="font-semibold text-gray-800">

                        {category}

                      </span>

                    </div>


                    <span className="text-sm font-bold text-indigo-600">

                      {count}

                    </span>

                  </div>


                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-700"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>


                  <div className="flex justify-between mt-1">

                    <span className="text-xs text-gray-400">
                      {percentage}% of attempts
                    </span>

                    <span className="text-xs text-gray-400">
                      {count} solved
                    </span>

                  </div>

                </div>

              );

            }
          )}

      </div>

    )}

  </div>

</div>












    {/* ACTIVE DAYS */}

    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-5">

      <div className="flex items-center justify-between">

        <p className="text-gray-500 text-sm">

          Active Days

        </p>

        <span className="text-2xl">

          📅

        </span>

      </div>

      <p className="text-4xl font-bold text-blue-600 mt-3">

        {analytics.activeDays || 0}

      </p>

      <p className="text-sm text-gray-500 mt-1">

        total coding days

      </p>

    </div>

  </div>


  {/* LAST 7 DAYS */}

  <div>

    <div className="flex items-center justify-between mb-4">

      <div>

        <h3 className="text-lg font-bold text-gray-900">

          📅 Last 7 Days

        </h3>

        <p className="text-sm text-gray-500">

          Your recent coding activity

        </p>

      </div>

    </div>


    <div className="grid grid-cols-7 gap-2 md:gap-4">

      {(analytics.weeklyActivity || []).map(
        (day, index) => {

          const date =
            new Date(day.date);

          const dayName =
            date.toLocaleDateString(
              "en-US",
              {
                weekday: "short",
              }
            );

          const count =
            day.submissions || 0;


          return (

            <div
              key={day.date || index}
              className="text-center"
            >

              <p className="text-xs md:text-sm font-medium text-gray-500 mb-2">

                {dayName}

              </p>


              <div
                className={`h-20 md:h-24 rounded-xl flex flex-col items-center justify-center border transition ${
                  count > 0
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >

                <span className="text-xl md:text-2xl">

                  {count > 0
                    ? "🔥"
                    : "○"}

                </span>


                <span
                  className={`text-xs mt-1 font-semibold ${
                    count > 0
                      ? "text-green-700"
                      : "text-gray-400"
                  }`}
                >

                  {count}{" "}
                  {count === 1
                    ? "attempt"
                    : "attempts"}

                </span>

              </div>

            </div>

          );

        }
      )}

    </div>

  </div>

</div>








        {/* ========================================= */}
        {/* CATEGORY PERFORMANCE */}
        {/* ========================================= */}

        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 mb-8">

          <div className="mb-6">

            <h2 className="text-2xl font-bold">

              📚 Category Performance

            </h2>

            <p className="text-gray-500 text-sm mt-1">

              Topics you have practiced

            </p>

          </div>


          {Object.keys(categoryStats).length === 0 ? (

            <div className="text-center py-8 text-gray-500">

              No category data available yet.

            </div>

          ) : (

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {Object.entries(categoryStats).map(
                ([category, count]) => (

                  <div
                    key={category}
                    className="bg-slate-50 hover:bg-indigo-50 rounded-2xl p-5 border border-gray-100 transition"
                  >

                    <div className="text-2xl mb-3">

                      📖

                    </div>

                    <p className="font-semibold text-gray-800">

                      {category}

                    </p>

                    <p className="text-2xl font-bold text-indigo-600 mt-2">

                      {count}

                    </p>

                    <p className="text-xs text-gray-400">

                      Attempts

                    </p>

                  </div>

                )
              )}

            </div>

          )}

        </div>


        {/* ========================================= */}
        {/* RECENT SUBMISSIONS */}
        {/* ========================================= */}

        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-2xl font-bold">

                🕒 Recent Submissions

              </h2>

              <p className="text-gray-500 text-sm mt-1">

                Your latest coding attempts

              </p>

            </div>

          </div>


          {recentSubmissions.length === 0 ? (

            <div className="text-center py-10 text-gray-500">

              No submissions yet.

            </div>

          ) : (

            <div className="space-y-4">

              {recentSubmissions.map(
                (submission) => (

                  <div
                    key={submission._id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-50 hover:bg-indigo-50 rounded-2xl p-5 border border-gray-100 transition"
                  >

                    <div>

                      <h3 className="font-bold text-gray-900">

                        {submission.question?.title ||
                          "Coding Question"}

                      </h3>

                      <div className="flex flex-wrap gap-2 mt-2">

                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

                          {submission.language}

                        </span>

                        <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">

                          {submission.question?.difficulty ||
                            "Unknown"}

                        </span>

                      </div>

                    </div>


                    <div className="flex items-center gap-5">

                      <div className="text-right">

                        <p className="text-sm text-gray-500">

                          Score

                        </p>

                        <p className="text-xl font-bold text-indigo-600">

                          {submission.score ?? 0}%

                        </p>

                      </div>


                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          submission.verdict === "Accepted"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >

                        {submission.verdict === "Accepted"
                          ? "✓ Accepted"
                          : "⚠ Needs Improvement"}

                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default CodingAnalytics;

