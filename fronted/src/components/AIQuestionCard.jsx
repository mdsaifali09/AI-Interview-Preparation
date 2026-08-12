import { useState } from "react";
import { saveQuestion } from "../services/aiService";

function AIQuestionCard({ question }) {

  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {

      await saveQuestion(question);

      setSaved(true);

      alert("Question Saved Successfully");

    } catch (error) {
      console.log(error);
      alert("Unable to Save");
    }
  };

  const handleCopy = () => {

    navigator.clipboard.writeText(question.question);

    alert("Copied");

  };

  return (

    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 p-6">

      <div className="flex justify-between items-center">

        <h2 className="text-xl font-bold text-gray-800">
          {question.title}
        </h2>

        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm">

          {question.difficulty}

        </span>

      </div>

      <p className="mt-5 text-gray-700 leading-7">

        {question.question}

      </p>

      <div className="mt-5">

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">

          {question.category}

        </span>

      </div>

      <div className="mt-8 flex gap-3">

        <button
          onClick={handleSave}
          disabled={saved}
          className={`px-5 py-3 rounded-xl text-white font-semibold ${
            saved
              ? "bg-gray-400"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {saved ? "Saved" : "Save"}
        </button>

        <button
          onClick={handleCopy}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold"
        >
          Copy
        </button>

      </div>

    </div>

  );
}

export default AIQuestionCard;