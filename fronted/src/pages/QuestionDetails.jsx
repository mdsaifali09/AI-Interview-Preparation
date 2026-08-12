import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { getQuestionById } from "../services/questionService";

function QuestionDetails() {

  const { id } = useParams();

  const [question, setQuestion] =
    useState(null);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {

      const data =
        await getQuestionById(id);

      setQuestion(data);

    } catch (error) {
      console.log(error);
    }
  };

  if (!question) {
    return (
      <h1 className="p-10">
        Loading...
      </h1>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h1 className="text-3xl font-bold mb-6">
              {question.title}
            </h1>

            <div className="flex gap-3 mb-6">

              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                {question.category}
              </span>

              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
                {question.difficulty}
              </span>

            </div>

            <div className="bg-slate-50 p-6 rounded-2xl">

              <h2 className="font-bold text-xl mb-3">
                Question
              </h2>

              <p className="text-gray-700 leading-8">
                {question.question}
              </p>

            </div>

            <p className="mt-6 text-gray-500">
              Created :
              {" "}
              {new Date(
                question.createdAt
              ).toLocaleDateString()}
            </p>

          </div>

        </div>

      </div>
      

    </div>
  );
}

export default QuestionDetails;