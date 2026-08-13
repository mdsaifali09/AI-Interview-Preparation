import api from "./api";

export const sendVoiceMessage = async (message) => {
  const response = await api.post(
    "/ai-voice/chat",
    {
      message,
    }
  );

  return response.data;
};