import Sidebar from "../components/Sidebar";

function ResumeAnalyzer() {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1 bg-slate-100 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Resume Analyzer
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <input
            type="file"
            className="w-full border p-4 rounded-xl"
          />

          <button className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl">
            Analyze Resume
          </button>

        </div>

        <div className="bg-white mt-8 rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-5">
            ATS Report
          </h2>

          <div className="space-y-4">

            <p>
              ATS Score : <strong>92%</strong>
            </p>

            <p>
              Missing Skills : Docker, AWS
            </p>

            <p>
              Recommendation :
              Add cloud deployment projects.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ResumeAnalyzer;