import {
  generateImage,
} from "../services/imageGenerationService.js";

export const createImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const image =
      await generateImage(prompt);

    return res.status(200).json({
      success: true,
      image,
    });

  } catch (error) {
    console.log(
      "IMAGE GENERATION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to generate image",
    });
  }
};