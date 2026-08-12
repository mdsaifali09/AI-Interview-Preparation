import { useState } from "react";
import { createQuestion } from "../services/questionService";

function AddQuestionModal({
  closeModal,
  refreshQuestions,
}) {
  const [formData, setFormData] =
    useState({
      title: "",
      category: "",
      difficulty: "Easy",
      question: "",
      answer: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await createQuestion(
        formData
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
          Add Question
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="title"
            placeholder="Title"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <select
            name="difficulty"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          >
            <option>
              Easy
            </option>
            <option>
              Medium
            </option>
            <option>
              Hard
            </option>
          </select>

          <textarea
            name="question"
            placeholder="Question"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <textarea
            name="answer"
            placeholder="Answer"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <div className="flex gap-3">

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded"
            >
              Save
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-5 py-2 rounded"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddQuestionModal;