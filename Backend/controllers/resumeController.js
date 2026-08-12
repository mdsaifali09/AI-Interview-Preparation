import fs from "fs";
import PDFParser from "pdf2json";
import ai from "../services/geminiService.js";
import ResumeAnalysis from "../models/ResumeAnalysis.js";

export const uploadResume = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }

    // Extract PDF Text
    const resumeText = await new Promise((resolve, reject) => {

      const pdfParser = new PDFParser();

      pdfParser.on("pdfParser_dataError", err => {
        reject(err.parserError);
      });

      pdfParser.on("pdfParser_dataReady", pdfData => {

        let text = "";

        pdfData.Pages.forEach(page => {

          page.Texts.forEach(item => {

           item.R.forEach(r => {

    try {

        text += decodeURIComponent(r.T) + " ";

    } catch {

        text += r.T + " ";

    }

});

          });

          text += "\n";

        });

        resolve(text);

      });

      pdfParser.loadPDF(req.file.path);

    });

    const prompt = `
You are an expert ATS Resume Analyzer.

Analyze the following resume.

Return ONLY valid JSON.

{
  "atsScore":90,
  "jobMatch":85,
  "strengths":[
    "...",
    "...",
    "..."
  ],
  "weaknesses":[
    "...",
    "..."
  ],
  "missingSkills":[
    "...",
    "..."
  ],
  "suggestions":[
    "...",
    "...",
    "..."
  ]
}

Resume:

${resumeText}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    let result = response.text;

    result = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const analysis = JSON.parse(result);

    // Delete uploaded file after analysis
    fs.unlink(req.file.path, () => {});


     const savedAnalysis =
  await ResumeAnalysis.create({

    user: req.user.id,

    atsScore: analysis.atsScore,

    jobMatch: analysis.jobMatch,

    strengths: analysis.strengths,

    weaknesses: analysis.weaknesses,

    missingSkills: analysis.missingSkills,

    suggestions: analysis.suggestions,

  });

   res.json({
  success: true,
  analysis: savedAnalysis,
});

  } catch (error) {

    console.log("RESUME ANALYSIS ERROR:", error);

    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });


   

  }
};



export const getResumeHistory = async (req, res) => {

  try {

    const history =
      await ResumeAnalysis
        .find({
          user: req.user.id,
        })
        .sort({
          createdAt: -1,
        });

    res.json({

      success: true,

      history,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};


export const getResumeReport = async (req, res) => {

  try {

    const report =
      await ResumeAnalysis.findById(req.params.id);

    if (!report) {

      return res.status(404).json({
        success: false,
        message: "Report not found",
      });

    }

    res.json({

      success: true,

      report,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

