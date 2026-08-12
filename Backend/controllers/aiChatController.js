import {
  generateChatResponse,
} from "../services/aiChatService.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const reply =
      await generateChatResponse(message);

    return res.status(200).json({
      success: true,
      reply,
    });

  } catch (error) {
    console.log(
      "AI CHAT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to get AI response",
    });
  }
};