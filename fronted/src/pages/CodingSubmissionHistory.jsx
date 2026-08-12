
import { useEffect, useState } from "react";
import { getSubmissionHistory } from "../services/codingSubmissionService";

function CodingSubmissionHistory() {

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {

      const result = await getSubmissionHistory();

      setSubmissions(result.submissions || []);

    } catch (error) {

      console.log("HISTORY ERROR:", error);

    } finally {

      setLoading(false);

    }
  };


  // Verdict styling

  const getVerdictStyle = (verdict) => {

    if (verdict === "Accepted") {

      return "bg-green-100 text-green-700 border-green-200";

    }

    if (verdict === "Needs Improvement") {

      return "bg-yellow-100 text-yellow-700 border-yellow-200";

    }

    return "bg-gray-100 text-gray-700 border-gray-200";

  };


  // Loading

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-100 flex items-center justify-center">

        <div className="bg-white rounded-2xl shadow-lg px-8 py-6">

          <div className="flex items-center gap-3">

            <div className="w-5 h-5 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

            <span className="text-lg font-semibold text-gray-700">

              Loading submission history...

            </span>

          </div>

        </div>

      </div>

    );

  }


  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50 p-6 md:p-8">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="max-w-6xl mx-auto mb-8">

        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-xl">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-3xl">

                📚

              </div>

              <div>

                <h1 className="text-3xl md:text-4xl font-bold">

                  Coding Submission History

                </h1>

                <p className="text-white/80 mt-2">

                  Track your coding attempts, AI evaluations and performance.

                </p>

              </div>

            </div>


            {/* Total Submissions */}

            <div className="bg-white/15 backdrop-blur rounded-2xl px-6 py-4 text-center">

              <p className="text-white/70 text-sm">

                Total Submissions

              </p>

              <p className="text-3xl font-bold">

                {submissions.length}

              </p>

            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <div className="max-w-6xl mx-auto">


        {/* EMPTY STATE */}

        {submissions.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-12 text-center border border-gray-100">

            <div className="text-7xl mb-5">

              🧑‍💻

            </div>

            <h2 className="text-2xl font-bold text-gray-900">

              No Submissions Yet

            </h2>

            <p className="text-gray-500 mt-2 max-w-md mx-auto">

              Solve a coding question and submit your solution.
              Your AI evaluation will appear here.

            </p>

          </div>

        ) : (


          /* ================================================= */
          /* SUBMISSION LIST */
          /* ================================================= */

          <div className="space-y-6">

            {submissions.map((submission) => (

              <div
                key={submission._id}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden"
              >


                {/* ================================================= */}
                {/* CARD CONTENT */}
                {/* ================================================= */}

                <div className="p-6 md:p-7">


                  {/* TOP SECTION */}

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">


                    {/* QUESTION */}

                    <div className="flex-1">

                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-2xl">

                          💻

                        </div>


                        <div>

                          <h2 className="text-xl md:text-2xl font-bold text-gray-900">

                            {submission.question?.title ||
                              "Coding Question"}

                          </h2>

                          <p className="text-sm text-gray-400 mt-1">

                            Coding Submission

                          </p>

                        </div>

                      </div>


                      {/* TAGS */}

                      <div className="flex flex-wrap gap-2 mt-4">

                        {/* Language */}

                        <span className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-sm font-medium">

                          💻 {submission.language}

                        </span>


                        {/* Difficulty */}

                        <span className="px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100 text-sm font-medium">

                          🎯{" "}
                          {submission.question?.difficulty ||
                            "Unknown"}

                        </span>


                        {/* Category */}

                        {submission.question?.category && (

                          <span className="px-3 py-1.5 rounded-full bg-gray-50 text-gray-700 border border-gray-200 text-sm font-medium">

                            📂 {submission.question.category}

                          </span>

                        )}

                      </div>

                    </div>


                    {/* ================================================= */}
                    {/* VERDICT */}
                    {/* ================================================= */}

                    <span
                      className={`self-start px-4 py-2 rounded-full border font-bold text-sm ${getVerdictStyle(
                        submission.verdict
                      )}`}
                    >

                      {submission.verdict === "Accepted"

                        ? "✓ Accepted"

                        : "⚠ Needs Improvement"}

                    </span>

                  </div>


                  {/* ================================================= */}
                  {/* STATS */}
                  {/* ================================================= */}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-7">


                    {/* SCORE */}

                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-5 border border-indigo-100">

                      <p className="text-sm text-gray-500">

                        ⭐ Overall Score

                      </p>

                      <p className="text-3xl font-bold text-indigo-700 mt-2">

                        {submission.score ?? 0}%

                      </p>

                    </div>


                    {/* CORRECTNESS */}

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100">

                      <p className="text-sm text-gray-500">

                        ✓ Correctness

                      </p>

                      <p className="text-3xl font-bold text-green-700 mt-2">

                        {submission.correctness ?? 0}%

                      </p>

                    </div>


                    {/* TIME */}

                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-5 border border-orange-100">

                      <p className="text-sm text-gray-500">

                        ⏱ Time

                      </p>

                      <p className="text-lg font-bold text-orange-700 mt-3">

                        {submission.timeComplexity ||
                          "Not evaluated"}

                      </p>

                    </div>


                    {/* SPACE */}

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100">

                      <p className="text-sm text-gray-500">

                        💾 Space

                      </p>

                      <p className="text-lg font-bold text-purple-700 mt-3">

                        {submission.spaceComplexity ||
                          "Not evaluated"}

                      </p>

                    </div>

                  </div>


                  {/* ================================================= */}
                  {/* PASSED TESTS */}
                  {/* ================================================= */}

                  <div className="mt-5 flex items-center gap-2">

                    <span className="text-gray-500 text-sm">

                      Test Cases:

                    </span>

                    <span className="font-semibold text-gray-800">

                      {submission.passed ?? 0}
                      {" / "}
                      {submission.total ?? 0}

                    </span>

                  </div>


                  {/* ================================================= */}
                  {/* BOTTOM SECTION */}
                  {/* ================================================= */}

                  <div className="mt-6 pt-5 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">


                    {/* DATE */}

                    <div className="flex items-center gap-2 text-sm text-gray-500">

                      <span className="text-lg">

                        🕒

                      </span>

                      <span>

                        Submitted:{" "}

                        {submission.createdAt

                          ? new Date(
                              submission.createdAt
                            ).toLocaleString()

                          : "Unknown"}

                      </span>

                    </div>


                    {/* ================================================= */}
                    {/* VIEW DETAILS BUTTON */}
                    {/* ================================================= */}

                    <button
                      type="button"
                      onClick={() => {

                        window.location.href =
                          `/coding-submission/${submission._id}`;

                      }}
                      className="group inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                    >

                      <span>

                        View Details

                      </span>

                      <span className="text-lg group-hover:translate-x-1 transition-transform duration-200">

                        →

                      </span>

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default CodingSubmissionHistory;

