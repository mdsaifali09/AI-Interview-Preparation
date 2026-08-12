
import ai from "./geminiService.js";

export const generateChatResponse = async (message) => {
  try {
    if (!message || !message.trim()) {
      throw new Error("Message is empty");
    }

    const prompt = `
You are an AI Interview Assistant.

You help users with:

- Programming
- DSA
- MERN Stack
- JavaScript
- React.js
- Node.js
- Express.js
- MongoDB
- SQL
- Technical interviews
- Resume preparation
- Career guidance

Give clear, accurate and beginner-friendly answers.

When explaining programming concepts:
- Use simple language.
- Give examples when useful.
- Use proper code formatting.
- Explain the solution step-by-step when required.

User question:

${message.trim()}
`;

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    const reply = result?.text?.trim();

    if (!reply) {
      throw new Error(
        "Gemini returned an empty response"
      );
    }

    return reply;

  } catch (error) {
    console.error(
      "AI CHAT SERVICE ERROR:",
      error?.message || error
    );

    throw error;
  }
};

