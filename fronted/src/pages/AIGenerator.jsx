import { useState } from "react";
import { generateAIQuestions } from "../services/aiService";
import AIQuestionCard from "../components/AIQuestionCard";

function AIGenerator() {
  const [category, setCategory] = useState("Java");
  const [difficulty, setDifficulty] = useState("Easy");
  const [number, setNumber] = useState(5);

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const data = await generateAIQuestions({
        category,
        difficulty,
        number,
      });

      setQuestions(data);
    } catch (error) {
      console.log(error);
      alert("Failed to generate questions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-7xl mx-auto">

        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 rounded-3xl text-white p-10 shadow-xl">

          <h1 className="text-4xl font-bold">
            🤖 AI Question Generator
          </h1>

          <p className="mt-3 text-lg">
            Generate unlimited interview questions using Gemini AI.
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <div className="grid md:grid-cols-4 gap-5">

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-4 rounded-xl"
            >
              <option>Java</option>
              <option>MERN</option>
              <option>DBMS</option>
              <option>OS</option>
              <option>CN</option>
              <option>React</option>
              <option>Node</option>
            </select>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="border p-4 rounded-xl"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <input
              type="number"
              min="1"
              max="20"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="border p-4 rounded-xl"
            />

            <button
              onClick={handleGenerate}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold"
            >
              Generate Questions
            </button>

          </div>

        </div>

        {loading && (

          <div className="mt-10 flex justify-center">

            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-indigo-600"></div>

          </div>

        )}

        {!loading && questions.length > 0 && (

          <div className="grid lg:grid-cols-2 gap-6 mt-10">

            {questions.map((question, index) => (

              <AIQuestionCard
                key={index}
                question={question}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default AIGenerator;