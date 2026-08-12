import ai from "../services/geminiService.js";

export const generateQuestions = async (req, res) => {
  try {

    const {
      category,
      difficulty,
      number,
    } = req.body;

    const prompt = `
Generate ${number} ${difficulty} interview questions for ${category}.

Return ONLY JSON.

Example:

[
 {
   "title":"Question 1",
   "question":"Explain JVM",
   "category":"Java",
   "difficulty":"Easy"
 }
]
`;

    const response =
      await ai.models.generateContent({

        model: "gemini-3.5-flash-lite",

        contents: prompt,

      });

    const text = response.text;

    const questions =
      JSON.parse(text);

    res.json({
      success: true,
      questions,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};