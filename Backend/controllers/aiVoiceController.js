import {
  generateVoiceAIResponse,
} from "../services/aiVoiceService.js";

export const voiceChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const answer = await generateVoiceAIResponse(message);

    return res.status(200).json({
      success: true,
      message: message,
      answer,
    });

  } catch (error) {
    console.log(
      "VOICE AI ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to generate AI response.",
    });
  }
};