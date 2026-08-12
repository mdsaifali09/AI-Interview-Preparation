function ProgressCard() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">

      <h2 className="text-xl font-bold mb-5">
        Weekly Progress
      </h2>

      <div className="space-y-4">

        <div>
          <p>Java</p>

          <div className="w-full bg-gray-200 rounded-full h-3">

            <div
              className="bg-green-500 h-3 rounded-full"
              style={{ width: "80%" }}
            />

          </div>

        </div>

        <div>
          <p>DBMS</p>

          <div className="w-full bg-gray-200 rounded-full h-3">

            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{ width: "65%" }}
            />

          </div>

        </div>

        <div>
          <p>MERN</p>

          <div className="w-full bg-gray-200 rounded-full h-3">

            <div
              className="bg-purple-500 h-3 rounded-full"
              style={{ width: "90%" }}
            />

          </div>

        </div>

      </div>
    </div>
  );
}

export default ProgressCard;