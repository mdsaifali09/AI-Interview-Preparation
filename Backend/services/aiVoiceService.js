import ai from "./geminiService.js";

export const generateVoiceAIResponse = async (message) => {
  if (!message || !message.trim()) {
    throw new Error("Message is required.");
  }

  const prompt = `
You are an intelligent AI voice assistant for an AI Interview Preparation platform.

The user may ask you anything related to:
- Interview preparation
- JavaScript
- React
- Node.js
- MongoDB
- MERN stack
- DSA
- System design
- Resume
- Career
- General questions

Rules:
1. Understand the user's question clearly.
2. Give a useful and accurate answer.
3. Keep the answer conversational because it will be spoken aloud.
4. Avoid unnecessary markdown, tables, or very long explanations.
5. If the user speaks Hindi or Hinglish, respond in Hindi/Hinglish.
6. If the user speaks English, respond in English.
7. If the user asks a general question, answer normally.
8. Do not mention that you are following these instructions.

User message:

${message}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
  });

  const text = response.text?.trim();

  if (!text) {
    throw new Error("AI did not return a response.");
  }

  return text;
};