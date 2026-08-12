
import ai from "./geminiService.js";

export const generateImage = async (prompt) => {
  try {
    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash-image",

        contents: prompt,

        config: {
          responseModalities: ["TEXT", "IMAGE"],
        },
      });

    const parts =
      response.candidates?.[0]?.content?.parts || [];

    const imagePart = parts.find(
      (part) => part.inlineData
    );

    if (!imagePart) {
      throw new Error(
        "No image data returned by Gemini"
      );
    }

    return {
      mimeType:
        imagePart.inlineData.mimeType,

      base64:
        imagePart.inlineData.data,
    };

  } catch (error) {

    console.log(
      "IMAGE GENERATION SERVICE ERROR:",
      error
    );

    throw error;
  }
};

