import { useEffect, useState } from "react";
import { getCodingHistory } from "../services/codingHistoryService";

function CodingHistory() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    loadHistory();

  }, []);

  const loadHistory = async () => {

    try {

      const result = await getCodingHistory();

      setHistory(result.attempts);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">

        💻 Coding History

      </h1>

      {

        history.length === 0 ?

        (

          <div className="bg-white rounded-2xl shadow p-10 text-center">

            No Coding Attempts Yet

          </div>

        )

        :

        (

          <div className="space-y-5">

            {

              history.map((item) => (

                <div

                  key={item._id}

                  className="bg-white rounded-2xl shadow-lg p-6"

                >

                  <div className="flex justify-between">

                    <div>

                      <h2 className="text-2xl font-bold">

                        {item.question?.title}

                      </h2>

                      <p className="text-gray-500">

                        {item.question?.category}

                      </p>

                    </div>

                    <div>

                      <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full">

                        {item.question?.difficulty}

                      </span>

                    </div>

                  </div>

                  <div className="grid md:grid-cols-4 gap-5 mt-6">

                    <div>

                      <p>Language</p>

                      <h3 className="font-bold">

                        {item.language}

                      </h3>

                    </div>

                    <div>

                      <p>Overall Score</p>

                      <h3 className="text-green-600 font-bold">

                        {item.overallScore}/100

                      </h3>

                    </div>

                    <div>

                      <p>Time</p>

                      <h3>

                        {item.timeComplexity}

                      </h3>

                    </div>

                    <div>

                      <p>Space</p>

                      <h3>

                        {item.spaceComplexity}

                      </h3>

                    </div>

                  </div>

                  <div className="mt-6">

                    <p className="font-semibold">

                      AI Feedback

                    </p>

                    <p className="text-gray-600 mt-2">

                      {item.feedback}

                    </p>

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  );

}

export default CodingHistory;