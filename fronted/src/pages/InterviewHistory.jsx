import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getInterviewHistory } from "../services/interviewHistoryService";

function InterviewHistory() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getInterviewHistory();
      setHistory(data.interviews);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          Loading Interview History...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        📜 Interview History
      </h1>

      {history.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

          <h2 className="text-2xl font-semibold">
            No Interview Found
          </h2>

          <p className="text-gray-500 mt-3">
            Start your first AI Mock Interview.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {history.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >

              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold">
                  {item.category}
                </h2>

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {item.difficulty}
                </span>

              </div>

              <div className="mt-5 space-y-2">

                <p>
                  <strong>Overall Score :</strong>{" "}
                  {item.overallScore}/100
                </p>

                <p>
                  <strong>Total Questions :</strong>{" "}
                  {item.interviews.length}
                </p>

                <p className="text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </p>

              </div>

              <button
                onClick={() =>
                  navigate(`/history/${item._id}`)
                }
                className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                 View Details
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default InterviewHistory;