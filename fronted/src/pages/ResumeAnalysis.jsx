import { useState } from "react";
import { uploadResume } from "../services/resumeService";

function ResumeAnalysis() {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("resume", file);

      const data = await uploadResume(formData);

      setAnalysis(data.analysis);

    } catch (error) {

      console.log(error);

      alert("Resume Analysis Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">

        📄 AI Resume Analyzer

      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <input
          type="file"
          accept=".pdf"
          onChange={(e)=>setFile(e.target.files[0])}
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl mt-5"
        >

          {
            loading
            ? "Analyzing..."
            : "Upload Resume"
          }

        </button>

      </div>

      {
        analysis && (

          <div className="mt-10">

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-2xl font-bold">
                  ATS Score
                </h2>

                <h1 className="text-6xl text-green-600 mt-5">
                  {analysis.atsScore}%
                </h1>

              </div>

              <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-2xl font-bold">
                  Job Match
                </h2>

                <h1 className="text-6xl text-indigo-600 mt-5">
                  {analysis.jobMatch}%
                </h1>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">

              <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-2xl font-bold mb-4">

                  ✅ Strengths

                </h2>

                <ul className="list-disc pl-5">

                  {analysis.strengths.map((item,index)=>(

                    <li key={index}>{item}</li>

                  ))}

                </ul>

              </div>

              <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-2xl font-bold mb-4">

                  ❌ Weaknesses

                </h2>

                <ul className="list-disc pl-5">

                  {analysis.weaknesses.map((item,index)=>(

                    <li key={index}>{item}</li>

                  ))}

                </ul>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">

              <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-2xl font-bold mb-4">

                  📉 Missing Skills

                </h2>

                <ul className="list-disc pl-5">

                  {analysis.missingSkills.map((item,index)=>(

                    <li key={index}>{item}</li>

                  ))}

                </ul>

              </div>

              <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-2xl font-bold mb-4">

                  💡 Suggestions

                </h2>

                <ul className="list-disc pl-5">

                  {analysis.suggestions.map((item,index)=>(

                    <li key={index}>{item}</li>

                  ))}

                </ul>

              </div>

            </div>

          </div>

        )
      }

    </div>

  );

}

export default ResumeAnalysis;