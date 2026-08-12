import ai from "../services/geminiService.js";
import CodingAttempt from "../models/CodingAttempt.js";

export const reviewCode = async (req, res) => {

  try {

    const { language, code, questionId, question } = req.body;

    const prompt = `

You are a Senior Software Engineer.

Review the following ${language} code.

Question:
${question}

Code:
${code}

Return ONLY valid JSON.

{
"overallScore":0,
"correctness":0,
"readability":0,
"optimization":0,
"timeComplexity":"",
"spaceComplexity":"",
"strengths":["",""],
"improvements":["",""],
"feedback":""
}

`;

    const result = await ai.models.generateContent({

      model: "gemini-3.5-flash-lite",

      contents: prompt,

    });

    const cleanJson = result.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const review = JSON.parse(cleanJson);

    await CodingAttempt.create({

      user: req.user.id,

      question: questionId,

      language,

      code,

      overallScore: review.overallScore,

      correctness: review.correctness,

      readability: review.readability,

      optimization: review.optimization,

      timeComplexity: review.timeComplexity,

      spaceComplexity: review.spaceComplexity,

      feedback: review.feedback,

    });

    return res.json({

      success: true,

      review,

    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({

      success: false,

      message: "Review Failed",

    });

  }

};