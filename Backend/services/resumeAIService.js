import ai from "./geminiService.js";

export const analyzeResumeWithAI = async (resumeText) => {
  try {
    const prompt = `
You are an expert ATS Resume Analyzer.

Analyze the following resume and return ONLY valid JSON.

Required JSON format:

{
  "atsScore": 90,
  "jobMatch": 85,
  "strengths": [
    "strength 1",
    "strength 2",
    "strength 3"
  ],
  "weaknesses": [
    "weakness 1",
    "weakness 2"
  ],
  "missingSkills": [
    "skill 1",
    "skill 2"
  ],
  "suggestions": [
    "suggestion 1",
    "suggestion 2",
    "suggestion 3"
  ]
}

Rules:
- atsScore must be between 0 and 100.
- jobMatch must be between 0 and 100.
- strengths must be an array.
- weaknesses must be an array.
- missingSkills must be an array.
- suggestions must be an array.
- Return ONLY JSON.
- Do not use markdown.
- Do not use \`\`\`json.

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

    return analysis;

  } catch (error) {
    console.log("RESUME AI SERVICE ERROR:", error);
    throw error;
  }
};