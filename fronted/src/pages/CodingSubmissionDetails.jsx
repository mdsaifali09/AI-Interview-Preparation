
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function CodingSubmissionDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [submission, setSubmission] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    loadSubmission();

  }, [id]);


  const loadSubmission = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await api.get(
        `/coding-submissions/${id}`
      );

      setSubmission(
        response.data.submission
      );

    } catch (err) {

      console.log(
        "SUBMISSION DETAILS ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to load submission details"
      );

    } finally {

      setLoading(false);

    }

  };


  // Loading

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-100 flex items-center justify-center">

        <div className="bg-white rounded-2xl shadow-lg px-8 py-6">

          <div className="flex items-center gap-3">

            <div className="w-6 h-6 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

            <span className="text-lg font-semibold text-gray-700">

              Loading submission details...

            </span>

          </div>

        </div>

      </div>

    );

  }


  // Error

  if (error) {

    return (

      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md w-full">

          <div className="text-6xl mb-5">

            ❌

          </div>

          <h2 className="text-2xl font-bold text-gray-900">

            Unable to Load Submission

          </h2>

          <p className="text-gray-500 mt-3">

            {error}

          </p>

          <button
            onClick={() =>
              navigate("/coding-history")
            }
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >

            ← Back to History

          </button>

        </div>

      </div>

    );

  }


  if (!submission) {

    return null;

  }


  const question =
    submission.question || {};


  const isAccepted =
    submission.verdict === "Accepted";


  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50 p-6 md:p-8">


      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="max-w-7xl mx-auto">


        <button
          onClick={() =>
            navigate("/coding-history")
          }
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition"
        >

          ← Back to Submission History

        </button>


        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-xl mb-7">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">


            <div>

              <div className="flex items-center gap-3 mb-3">

                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">

                  💻 Coding Submission

                </span>

                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">

                  {submission.language}

                </span>

              </div>


              <h1 className="text-3xl md:text-4xl font-bold">

                {question.title ||
                  "Coding Question"}

              </h1>


              <div className="flex flex-wrap gap-2 mt-4">

                {question.difficulty && (

                  <span className="bg-white/15 px-3 py-1 rounded-full text-sm">

                    🎯 {question.difficulty}

                  </span>

                )}


                {question.category && (

                  <span className="bg-white/15 px-3 py-1 rounded-full text-sm">

                    📂 {question.category}

                  </span>

                )}

              </div>

            </div>


            {/* VERDICT */}

            <div
              className={`px-6 py-4 rounded-2xl backdrop-blur border ${
                isAccepted
                  ? "bg-green-500/20 border-green-300/30"
                  : "bg-yellow-500/20 border-yellow-300/30"
              }`}
            >

              <p className="text-white/70 text-sm">

                Verdict

              </p>

              <p className="text-2xl font-bold mt-1">

                {isAccepted
                  ? "✓ Accepted"
                  : "⚠ Needs Improvement"}

              </p>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* SCORE CARDS */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">


          {/* SCORE */}

          <div className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6">

            <p className="text-gray-500 text-sm">

              ⭐ Overall Score

            </p>

            <p className="text-4xl font-bold text-indigo-600 mt-2">

              {submission.score ?? 0}%

            </p>

            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">

              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{
                  width: `${Math.min(
                    Math.max(
                      submission.score || 0,
                      0
                    ),
                    100
                  )}%`,
                }}
              />

            </div>

          </div>


          {/* PASSED */}

          <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6">

            <p className="text-gray-500 text-sm">

              ✓ Test Cases

            </p>

            <p className="text-4xl font-bold text-green-600 mt-2">

              {submission.passed ?? 0}
              {" / "}
              {submission.total ?? 0}

            </p>

            <p className="text-sm text-gray-400 mt-2">

              Cases passed

            </p>

          </div>


          {/* TIME */}

          <div className="bg-white rounded-2xl shadow-md border border-orange-100 p-6">

            <p className="text-gray-500 text-sm">

              ⏱ Time Complexity

            </p>

            <p className="text-2xl font-bold text-orange-600 mt-3">

              {submission.timeComplexity ||
                "Not evaluated"}

            </p>

          </div>


          {/* SPACE */}

          <div className="bg-white rounded-2xl shadow-md border border-purple-100 p-6">

            <p className="text-gray-500 text-sm">

              💾 Space Complexity

            </p>

            <p className="text-2xl font-bold text-purple-600 mt-3">

              {submission.spaceComplexity ||
                "Not evaluated"}

            </p>

          </div>

        </div>


        {/* ================================================= */}
        {/* MAIN GRID */}
        {/* ================================================= */}

        <div className="grid lg:grid-cols-3 gap-7">


          {/* ================================================= */}
          {/* QUESTION */}
          {/* ================================================= */}

          <div className="lg:col-span-1 bg-white rounded-3xl shadow-md border border-gray-100 p-6 h-fit">

            <div className="flex items-center gap-3 mb-5">

              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">

                📝

              </div>

              <h2 className="text-xl font-bold">

                Problem

              </h2>

            </div>


            <h3 className="font-bold text-lg text-gray-900">

              {question.title}

            </h3>


            {question.description && (

              <p className="text-gray-600 mt-4 leading-7">

                {question.description}

              </p>

            )}


            <div className="mt-6 space-y-3">

              {question.difficulty && (

                <div className="flex justify-between bg-slate-50 rounded-xl px-4 py-3">

                  <span className="text-gray-500">

                    Difficulty

                  </span>

                  <span className="font-semibold">

                    {question.difficulty}

                  </span>

                </div>

              )}


              {question.category && (

                <div className="flex justify-between bg-slate-50 rounded-xl px-4 py-3">

                  <span className="text-gray-500">

                    Category

                  </span>

                  <span className="font-semibold">

                    {question.category}

                  </span>

                </div>

              )}

            </div>

          </div>


          {/* ================================================= */}
          {/* RIGHT CONTENT */}
          {/* ================================================= */}

          <div className="lg:col-span-2 space-y-7">


            {/* ================================================= */}
            {/* SUBMITTED CODE */}
            {/* ================================================= */}

            <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">

              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">

                    💻

                  </div>

                  <div>

                    <h2 className="text-xl font-bold">

                      Submitted Code

                    </h2>

                    <p className="text-sm text-gray-400">

                      {submission.language}

                    </p>

                  </div>

                </div>

              </div>


              <pre className="bg-gray-950 text-green-400 p-6 overflow-x-auto text-sm leading-6 min-h-[250px]">

                <code>

                  {submission.code}

                </code>

              </pre>

            </div>


            {/* ================================================= */}
            {/* AI EVALUATION */}
            {/* ================================================= */}

            <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-11 h-11 bg-indigo-100 rounded-xl flex items-center justify-center text-xl">

                  🤖

                </div>

                <div>

                  <h2 className="text-2xl font-bold">

                    AI Evaluation

                  </h2>

                  <p className="text-gray-500 text-sm">

                    Automated analysis of your solution

                  </p>

                </div>

              </div>


              {/* FEEDBACK */}

              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">

                <h3 className="font-bold text-indigo-900 mb-2">

                  💬 AI Feedback

                </h3>

                <p className="text-indigo-800 leading-7">

                  {submission.feedback ||
                    "No AI feedback available."}

                </p>

              </div>


              {/* ERROR */}

              {submission.error && (

                <div className="mt-5 bg-red-50 border border-red-200 rounded-2xl p-5">

                  <h3 className="font-bold text-red-700 mb-2">

                    ⚠ Error

                  </h3>

                  <p className="text-red-600">

                    {submission.error}

                  </p>

                </div>

              )}

            </div>


            {/* ================================================= */}
            {/* SUBMISSION INFO */}
            {/* ================================================= */}

            <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">

              <h2 className="text-xl font-bold mb-5">

                📅 Submission Information

              </h2>


              <div className="grid sm:grid-cols-2 gap-4">


                <div className="bg-slate-50 rounded-xl p-4">

                  <p className="text-sm text-gray-500">

                    Language

                  </p>

                  <p className="font-bold mt-1">

                    {submission.language}

                  </p>

                </div>


                <div className="bg-slate-50 rounded-xl p-4">

                  <p className="text-sm text-gray-500">

                    Submitted At

                  </p>

                  <p className="font-bold mt-1">

                    {submission.createdAt

                      ? new Date(
                          submission.createdAt
                        ).toLocaleString()

                      : "Unknown"}

                  </p>

                </div>


                <div className="bg-slate-50 rounded-xl p-4">

                  <p className="text-sm text-gray-500">

                    Score

                  </p>

                  <p className="font-bold mt-1">

                    {submission.score ?? 0}%

                  </p>

                </div>


                <div className="bg-slate-50 rounded-xl p-4">

                  <p className="text-sm text-gray-500">

                    Verdict

                  </p>

                  <p
                    className={`font-bold mt-1 ${
                      isAccepted
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >

                    {submission.verdict}

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default CodingSubmissionDetails;

