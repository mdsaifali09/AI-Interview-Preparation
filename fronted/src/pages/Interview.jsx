import Sidebar from "../components/Sidebar";
import InterviewCard from "../components/InterviewCard";

function Interview() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 p-8 bg-slate-100">

        <h1 className="text-4xl font-bold mb-8">
          Mock Interviews
        </h1>

        <div className="grid md:grid-cols-3 gap-5">

          <InterviewCard
            title="Java"
            difficulty="Medium"
          />

          <InterviewCard
            title="MERN Stack"
            difficulty="Hard"
          />

          <InterviewCard
            title="DBMS"
            difficulty="Easy"
          />

        </div>

      </div>

    </div>
  );
}

export default Interview;