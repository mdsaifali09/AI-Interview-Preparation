import { analyzeResumeWithAI } from "../services/resumeAIService.js";
import ResumeAnalysis from "../models/ResumeAnalysis.js";

import fs from "fs";
import PDFParser from "pdf2json";




// =====================================================
// UPLOAD & ANALYZE RESUME
// =====================================================

export const uploadResume = async (req, res) => {
  try {

    // Check file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }


    // =================================================
    // EXTRACT PDF TEXT
    // =================================================

    const resumeText = await new Promise((resolve, reject) => {

      const pdfParser = new PDFParser();


      pdfParser.on(
        "pdfParser_dataError",
        (error) => {
          reject(error.parserError);
        }
      );


      pdfParser.on(
        "pdfParser_dataReady",
        (pdfData) => {

          let text = "";


          pdfData.Pages.forEach((page) => {

            page.Texts.forEach((item) => {

              item.R.forEach((r) => {

                try {

                  text +=
                    decodeURIComponent(r.T) +
                    " ";

                } catch {

                  text +=
                    r.T +
                    " ";

                }

              });

            });

            text += "\n";

          });


          resolve(text);

        }
      );


      pdfParser.loadPDF(req.file.path);

    });


    // =================================================
    // CHECK EXTRACTED TEXT
    // =================================================

    if (!resumeText || !resumeText.trim()) {

      fs.unlink(req.file.path, () => {});

      return res.status(400).json({
        success: false,
        message:
          "Unable to extract text from this PDF.",
      });

    }


    // =================================================
    // AI RESUME ANALYSIS
    // =================================================

    const analysis =
      await analyzeResumeWithAI(resumeText);


    // =================================================
    // DELETE UPLOADED PDF
    // =================================================

    fs.unlink(
      req.file.path,
      (error) => {

        if (error) {
          console.log(
            "FILE DELETE ERROR:",
            error.message
          );
        }

      }
    );


    // =================================================
    // SAVE ANALYSIS
    // =================================================

    const savedAnalysis =
      await ResumeAnalysis.create({

        user: req.user.id,

        atsScore:
          analysis.atsScore,

        jobMatch:
          analysis.jobMatch,

        strengths:
          analysis.strengths,

        weaknesses:
          analysis.weaknesses,

        missingSkills:
          analysis.missingSkills,

        suggestions:
          analysis.suggestions,

      });


    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({

      success: true,

      message:
        "Resume analyzed successfully.",

      analysis:
        savedAnalysis,

    });


  } catch (error) {

    console.log(
      "RESUME ANALYSIS ERROR:",
      error
    );


    // Delete file if something fails
    if (req.file) {

      fs.unlink(
        req.file.path,
        () => {}
      );

    }


    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Unable to analyze resume.",

    });

  }

};



// =====================================================
// GET RESUME HISTORY
// =====================================================

export const getResumeHistory = async (
  req,
  res
) => {

  try {

    const history =
      await ResumeAnalysis
        .find({
          user: req.user.id,
        })
        .sort({
          createdAt: -1,
        });


    return res.status(200).json({

      success: true,

      history,

    });


  } catch (error) {

    console.log(
      "RESUME HISTORY ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Unable to fetch resume history.",

    });

  }

};



// =====================================================
// GET SINGLE RESUME REPORT
// =====================================================

export const getResumeReport = async (
  req,
  res
) => {

  try {

    const report =
      await ResumeAnalysis.findOne({

        _id: req.params.id,

        user: req.user.id,

      });


    if (!report) {

      return res.status(404).json({

        success: false,

        message:
          "Resume report not found.",

      });

    }


    return res.status(200).json({

      success: true,

      report,

    });


  } catch (error) {

    console.log(
      "RESUME REPORT ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Unable to fetch resume report.",

    });

  }

};