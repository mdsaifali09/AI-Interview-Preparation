
import CodingSubmission from "../models/CodingSubmission.js";
import CodingQuestion from "../models/CodingQuestion.js";
import ai from "../services/geminiService.js";


// ======================================================
// CREATE + AI EVALUATE SUBMISSION
// ======================================================

export const createSubmission = async (req, res) => {

  try {

    const {
      questionId,
      language,
      code,
    } = req.body;


    // Validate input

    if (!questionId || !language || !code) {

      return res.status(400).json({

        success: false,

        message:
          "Question, language and code are required",

      });

    }


    // Find question

    const question =
      await CodingQuestion.findById(questionId);


    if (!question) {

      return res.status(404).json({

        success: false,

        message:
          "Coding question not found",

      });

    }


    // AI Prompt

    const prompt = `

You are an expert coding interview evaluator.

Evaluate the candidate's solution carefully.

Question:
${question.title}

Description:
${question.description}

Input Example:
${question.inputExample || ""}

Expected Output:
${question.outputExample || ""}

Constraints:
${question.constraints || ""}

Language:
${language}

Candidate Code:
${code}


Return ONLY valid JSON.

{
  "verdict": "Accepted",
  "correctness": 0,
  "score": 0,
  "timeComplexity": "",
  "spaceComplexity": "",
  "error": "",
  "feedback": ""
}


Rules:

1. verdict must be exactly one of:
   "Accepted"
   "Needs Improvement"

2. If the code correctly solves the problem,
   verdict must be "Accepted".

3. If the code has a logical error,
   verdict must be "Needs Improvement".

4. Check the code against the problem description,
   examples and constraints.

5. correctness must be between 0 and 100.

6. score must be between 0 and 100.

7. Give the actual time complexity.

8. Give the actual space complexity.

9. If there is an obvious error, explain it
   briefly in the "error" field.

10. Give useful feedback for the candidate.

11. Do NOT use markdown.

12. Return ONLY valid JSON.

`;


    // Gemini

    const result =
      await ai.models.generateContent({

        model: "gemini-3.5-flash-lite",

        contents: prompt,

      });


    // Clean AI response

    const text =
      result.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();


    const evaluation =
      JSON.parse(text);


    // Normalize verdict

    const verdict =
      evaluation.verdict === "Accepted"
        ? "Accepted"
        : "Needs Improvement";


    // Save submission

    const submission =
      await CodingSubmission.create({

        user: req.user.id,

        question: questionId,

        language,

        code,

        verdict,

        passed:
          verdict === "Accepted"
            ? 1
            : 0,

        total: 1,

        score:
          Number(evaluation.score) || 0,

        correctness:
          Number(evaluation.correctness) || 0,

        timeComplexity:
          evaluation.timeComplexity || "",

        spaceComplexity:
          evaluation.spaceComplexity || "",

        feedback:
          evaluation.feedback || "",

        executionTime: 0,

        error:
          evaluation.error || "",

      });


    // Response

    return res.status(201).json({

      success: true,

      message:
        "Solution evaluated successfully",

      submission,

      evaluation: {

        verdict,

        correctness:
          Number(evaluation.correctness) || 0,

        score:
          Number(evaluation.score) || 0,

        timeComplexity:
          evaluation.timeComplexity || "",

        spaceComplexity:
          evaluation.spaceComplexity || "",

        error:
          evaluation.error || "",

        feedback:
          evaluation.feedback || "",

      },

    });


  } catch (error) {

    console.log(
      "AI SUBMISSION ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Solution evaluation failed",

    });

  }

};



// ======================================================
// GET SUBMISSION HISTORY
// ======================================================

export const getSubmissionHistory = async (
  req,
  res
) => {

  try {

    const submissions =
      await CodingSubmission.find({

        user: req.user.id,

      })
        .populate(
          "question",
          "title difficulty category"
        )
        .sort({
          createdAt: -1,
        });


    return res.json({

      success: true,

      submissions,

    });


  } catch (error) {

    console.log(
      "SUBMISSION HISTORY ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Unable to fetch submission history",

    });

  }

};

 



// ======================================================
// GET SINGLE SUBMISSION DETAILS
// ======================================================

export const getSubmissionById = async (
  req,
  res
) => {

  try {

    const submission =
      await CodingSubmission.findOne({

        _id: req.params.id,

        user: req.user.id,

      })
        .populate(
          "question",
          "title difficulty category description inputExample outputExample constraints"
        );


    if (!submission) {

      return res.status(404).json({

        success: false,

        message:
          "Submission not found",

      });

    }


    return res.json({

      success: true,

      submission,

    });


  } catch (error) {

    console.log(
      "GET SUBMISSION ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Unable to fetch submission",

    });

  }

};

