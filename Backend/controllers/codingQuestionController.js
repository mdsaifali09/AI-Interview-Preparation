
import CodingQuestion from "../models/CodingQuestion.js";
import ai from "../services/geminiService.js";

export const generateCodingQuestion = async (req, res) => {

  try {

    const { category, difficulty } = req.body;

    const prompt = `

Generate ONE coding interview question.

Category: ${category}

Difficulty: ${difficulty}

The question MUST include exactly 4 test cases.

- 2 visible test cases
- 2 hidden test cases
- Inputs and outputs must be valid for the given problem.
- Do not use markdown.
- Return ONLY valid JSON.

{
  "title": "",
  "category": "",
  "difficulty": "",
  "description": "",
  "inputExample": "",
  "outputExample": "",
  "constraints": "",

  "testCases": [
    {
      "input": "",
      "expectedOutput": "",
      "hidden": false
    },
    {
      "input": "",
      "expectedOutput": "",
      "hidden": false
    },
    {
      "input": "",
      "expectedOutput": "",
      "hidden": true
    },
    {
      "input": "",
      "expectedOutput": "",
      "hidden": true
    }
  ],

  "starterCode": {
    "java": "",
    "python": "",
    "javascript": "",
    "cpp": ""
  }
}

`;

    const result = await ai.models.generateContent({

      model: "gemini-3.5-flash-lite",

      contents: prompt,

    });

    const text = result.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const question = JSON.parse(text);

    // Safety check
    if (
      !question.testCases ||
      !Array.isArray(question.testCases)
    ) {

      question.testCases = [];

    }

    const saved = await CodingQuestion.create(question);

    return res.json({

      success: true,

      question: saved,

    });

  } catch (err) {

    console.log("CODING QUESTION ERROR:");

    console.log(err);

    return res.status(500).json({

      success: false,

      message: "Question Generation Failed",

    });

  }

};

