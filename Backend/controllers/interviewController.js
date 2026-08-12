import ai from "../services/geminiService.js";

export const generateInterviewQuestion = async (req, res) => {
  try {
    const { category, difficulty } = req.body;

    console.log("CATEGORY:", category);
    console.log("DIFFICULTY:", difficulty);

    if (!category || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Category and difficulty are required",
      });
    }

    const prompt = `
Generate ONE technical interview question.

Category: ${category}
Difficulty: ${difficulty}

Return ONLY the question text.
Do not return JSON.
Do not use markdown.
Do not add explanation.
`;

    let response;

    try {
      // Primary model
      response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
      });

    } catch (error) {

      console.log(
        "Primary Gemini model failed:",
        error.status
      );

      // Fallback model
      response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
      });
    }

    const question = response.text?.trim();

    console.log("GEMINI QUESTION:", question);

    if (!question) {
      throw new Error(
        "Gemini returned an empty question"
      );
    }

    return res.status(200).json({
      success: true,
      question,
    });

  } catch (error) {

    console.error(
      "GENERATE QUESTION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.status === 503
          ? "Gemini is temporarily busy. Please try again."
          : error.message,
    });
  }
};

export const evaluateInterviewAnswer = async (req, res) => {
  try {
    const {
      category,
      difficulty,
      question,
      answer,
    } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question and answer are required",
      });
    }

    const prompt = `
You are an expert technical interviewer.

Category: ${category}
Difficulty: ${difficulty}

Question:
${question}

Candidate Answer:
${answer}

Evaluate the candidate.

Return ONLY valid JSON:

{
  "technicalScore": 0,
  "communicationScore": 0,
  "grammarScore": 0,
  "relevanceScore": 0,
  "overallScore": 0,
  "feedback": "feedback",
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2"]
}

Do not use markdown.
Do not add text outside JSON.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    let text = response.text.trim();

    text = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const result = JSON.parse(text);

    return res.status(200).json({
      success: true,
      evaluation: result,
    });

  } catch (error) {
    console.error("EVALUATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};