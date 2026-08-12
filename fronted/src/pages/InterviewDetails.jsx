import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getInterviewById } from "../services/interviewHistoryService";

function InterviewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInterview();
  }, []);

  const loadInterview = async () => {
    try {
      const data = await getInterviewById(id);
      setInterview(data.interview);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-2xl font-bold">
        Loading Interview...
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="p-10 text-red-600 text-2xl">
        Interview Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-700 text-white px-5 py-2 rounded-lg"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold">
          Interview Report
        </h1>

        <div className="grid md:grid-cols-3 gap-5 mt-8">

          <div className="bg-blue-50 p-5 rounded-xl">
            <h3 className="font-bold">
              Category
            </h3>

            <p className="text-xl">
              {interview.category}
            </p>
          </div>

          <div className="bg-purple-50 p-5 rounded-xl">
            <h3 className="font-bold">
              Difficulty
            </h3>

            <p className="text-xl">
              {interview.difficulty}
            </p>
          </div>

          <div className="bg-green-50 p-5 rounded-xl">
            <h3 className="font-bold">
              Overall Score
            </h3>

            <p className="text-3xl font-bold text-green-700">
              {interview.overallScore}/100
            </p>
          </div>

        </div>

        <h2 className="text-3xl font-bold mt-10 mb-6">
          Questions
        </h2>

        <div className="space-y-8">

          {interview.interviews.map((item, index) => (

            <div
              key={index}
              className="bg-slate-50 rounded-2xl p-6 border"
            >

              <h2 className="text-xl font-bold mb-4">
                Question {index + 1}
              </h2>

              <p className="font-semibold">
                {item.question}
              </p>

              <div className="mt-5">

                <h3 className="font-bold">
                  Your Answer
                </h3>

                <p className="text-gray-700 mt-2">
                  {item.answer}
                </p>

              </div>

              <div className="grid md:grid-cols-4 gap-4 mt-8">

                <div className="bg-blue-100 p-4 rounded-xl">
                  Technical
                  <h2 className="text-2xl font-bold">
                    {
                      item.evaluation
                        .technicalScore
                    }
                  </h2>
                </div>

                <div className="bg-purple-100 p-4 rounded-xl">
                  Communication
                  <h2 className="text-2xl font-bold">
                    {
                      item.evaluation
                        .communicationScore
                    }
                  </h2>
                </div>

                <div className="bg-yellow-100 p-4 rounded-xl">
                  Grammar
                  <h2 className="text-2xl font-bold">
                    {
                      item.evaluation
                        .grammarScore
                    }
                  </h2>
                </div>

                <div className="bg-green-100 p-4 rounded-xl">
                  Relevance
                  <h2 className="text-2xl font-bold">
                    {
                      item.evaluation
                        .relevanceScore
                    }
                  </h2>
                </div>

              </div>

              <div className="mt-8">

                <h2 className="text-xl font-bold">
                  AI Feedback
                </h2>

                <p className="mt-3">
                  {
                    item.evaluation
                      .feedback
                  }
                </p>

              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">

                <div>

                  <h2 className="text-green-700 font-bold">
                    Strengths
                  </h2>

                  <ul className="list-disc ml-5 mt-3">

                    {
                      item.evaluation
                        .strengths.map(
                          (s, i) => (
                            <li key={i}>
                              {s}
                            </li>
                          )
                        )
                    }

                  </ul>

                </div>

                <div>

                  <h2 className="text-red-600 font-bold">
                    Improvements
                  </h2>

                  <ul className="list-disc ml-5 mt-3">

                    {
                      item.evaluation
                        .improvements.map(
                          (s, i) => (
                            <li key={i}>
                              {s}
                            </li>
                          )
                        )
                    }

                  </ul>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default InterviewDetails;