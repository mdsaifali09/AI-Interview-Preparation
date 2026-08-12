import api from "./api";

export const generateImage = async (prompt) => {
  const response = await api.post(
    "/images/generate",
    {
      prompt,
    }
  );

  return response.data;
};