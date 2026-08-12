function InterviewCard({ title, difficulty }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">

      <h2 className="text-xl font-bold">
        {title}
      </h2>

      <p className="text-gray-500 mt-2">
        Difficulty : {difficulty}
      </p>

      <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg">
        Start
      </button>

    </div>
  );
}

export default InterviewCard;