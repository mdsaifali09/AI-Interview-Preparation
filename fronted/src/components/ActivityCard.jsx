function ActivityCard() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">

      <h2 className="text-xl font-bold mb-4">
        Recent Activity
      </h2>

      <ul className="space-y-4">

        <li>
          ✅ Completed Java Interview
        </li>

        <li>
          📄 Uploaded Resume
        </li>

        <li>
           ATS Score Increased
        </li>

      </ul>

    </div>
  );
}

export default ActivityCard;