import { useState } from "react";
import { updateQuestion } from "../services/questionService";

function EditQuestionModal({
  question,
  closeModal,
  refreshQuestions,
}) {
  const [title, setTitle] = useState(
    question.title
  );

  const [questionText, setQuestionText] =
    useState(question.question);

  const [category, setCategory] =
    useState(question.category);

  const [difficulty, setDifficulty] =
    useState(question.difficulty);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateQuestion(
        question._id,
        {
          title,
          question: questionText,
          category,
          difficulty,
        }
      );

      refreshQuestions();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white p-6 rounded-2xl w-[500px]">

        <h2 className="text-2xl font-bold mb-5">
          Edit Question
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            rows="4"
            placeholder="Question"
            value={questionText}
            onChange={(e) =>
              setQuestionText(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
          >
            <option>Java</option>
            <option>MERN</option>
            <option>DBMS</option>
            <option>OS</option>
            <option>CN</option>
          </select>

          <select
            value={difficulty}
            onChange={(e) =>
              setDifficulty(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <div className="flex gap-3">

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Update
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditQuestionModal;