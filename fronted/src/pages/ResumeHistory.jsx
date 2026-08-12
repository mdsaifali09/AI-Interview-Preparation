import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getResumeHistory } from "../services/resumeHistoryService";

function ResumeHistory() {

  const navigate = useNavigate();

  const [history, setHistory] = useState([]);

  useEffect(() => {

    loadHistory();

  }, []);

  const loadHistory = async () => {

    try {

      const data = await getResumeHistory();

      setHistory(data.history);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="p-8 min-h-screen bg-slate-100">

      <h1 className="text-4xl font-bold mb-8">

        📄 Resume History

      </h1>

      {

        history.length === 0 ? (

          <div className="bg-white rounded-xl p-8 text-center shadow">

            No Resume Analysis Found

          </div>

        ) : (

          <div className="space-y-5">

            {

              history.map((item) => (

                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow p-6 flex justify-between items-center"
                >

                  <div>

                    <h2 className="text-xl font-bold">

                      ATS Score : {item.atsScore}%

                    </h2>

                    <p className="text-gray-500 mt-2">

                      Job Match : {item.jobMatch}%

                    </p>

                    <p className="text-gray-400 mt-2">

                      {

                        new Date(
                          item.createdAt
                        ).toLocaleString()

                      }

                    </p>

                  </div>

                  <button

                    onClick={() =>
                      navigate(
                        `/resume-history/${item._id}`
                      )
                    }

                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl"

                  >

                    View Report

                  </button>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  );

}

export default ResumeHistory;