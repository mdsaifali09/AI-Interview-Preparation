import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {getResumeReport} from "../services/resumeReportService";
import jsPDF from "jspdf";

function ResumeReport() {

    const { id } = useParams();

    const [report, setReport] =
        useState(null);

    useEffect(() => {

        loadReport();

    }, []);

    const loadReport =
        async () => {

            const data =
                await getResumeReport(id);

            setReport(data.report);

        };

    if (!report) {

        return (
            <div className="p-10">

                Loading...

            </div>
        );

    }



    const downloadReport = () => {

  const pdf = new jsPDF();

  pdf.setFontSize(22);
  pdf.text("AI Resume Analysis Report", 20, 20);

  pdf.setFontSize(16);
  pdf.text(`ATS Score: ${report.atsScore}%`, 20, 40);

  pdf.text(`Job Match: ${report.jobMatch}%`, 20, 50);

  let y = 70;

  pdf.setFontSize(18);
  pdf.text("Strengths", 20, y);

  y += 10;

  report.strengths.forEach((item) => {
    pdf.text(`• ${item}`, 25, y);
    y += 8;
  });

  y += 10;

  pdf.text("Weaknesses", 20, y);

  y += 10;

  report.weaknesses.forEach((item) => {
    pdf.text(`• ${item}`, 25, y);
    y += 8;
  });

  y += 10;

  pdf.text("Missing Skills", 20, y);

  y += 10;

  report.missingSkills.forEach((item) => {
    pdf.text(`• ${item}`, 25, y);
    y += 8;
  });

  y += 10;

  pdf.text("Suggestions", 20, y);

  y += 10;

  report.suggestions.forEach((item) => {
    pdf.text(`• ${item}`, 25, y);
    y += 8;
  });

  pdf.save("Resume-Analysis-Report.pdf");

};






    return (

        <div className="p-8 bg-slate-100 min-h-screen">

            <h1 className="text-4xl font-bold mb-8">

                Resume Report

            </h1>

            <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-white p-6 rounded-2xl shadow">

                    <h2>ATS Score</h2>

                    <h1 className="text-6xl text-green-600">

                        {report.atsScore}%

                    </h1>

                </div>

                <div className="bg-white p-6 rounded-2xl shadow">

                    <h2>Job Match</h2>

                    <h1 className="text-6xl text-indigo-600">

                        {report.jobMatch}%

                    </h1>

                </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">

                <div className="bg-white p-6 rounded-2xl shadow">

                    <h2 className="font-bold mb-4">

                        Strengths

                    </h2>

                    <ul>

                        {

                            report.strengths.map(
                                (item, index) => (

                                    <li key={index}>

                                        ✅ {item}

                                    </li>

                                ))

                        }

                    </ul>

                </div>

                <div className="bg-white p-6 rounded-2xl shadow">

                    <h2 className="font-bold mb-4">

                        Weaknesses

                    </h2>

                    <ul>

                        {

                            report.weaknesses.map(
                                (item, index) => (

                                    <li key={index}>

                                        ❌ {item}

                                    </li>

                                ))

                        }

                    </ul>

                </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">

                <div className="bg-white p-6 rounded-2xl shadow">

                    <h2 className="font-bold mb-4">

                        Missing Skills

                    </h2>

                    <ul>

                        {

                            report.missingSkills.map(
                                (item, index) => (

                                    <li key={index}>

                                        📌 {item}

                                    </li>

                                ))

                        }

                    </ul>

                </div>

                <div className="bg-white p-6 rounded-2xl shadow">

                    <h2 className="font-bold mb-4">

                        Suggestions

                    </h2>

                    <ul>

                        {

                            report.suggestions.map(
                                (item, index) => (

                                    <li key={index}>

                                        💡 {item}

                                    </li>

                                ))

                        }

                    </ul>

                </div>


                <div className="flex justify-end mb-6">

  <button
    onClick={downloadReport}
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
  >

    📥 Download PDF Report

  </button>

</div>

            </div>

        </div>

    );

}

export default ResumeReport;