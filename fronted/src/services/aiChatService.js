
import api from "./api";

export const sendChatMessage = async (message) => {
  try {
    const response = await api.post(
      "/ai-chat",
      {
        message,
      }
    );

    return response.data;

  } catch (error) {

    console.log(
      "AI CHAT SERVICE ERROR:",
      error
    );

    throw error;
  }
};

