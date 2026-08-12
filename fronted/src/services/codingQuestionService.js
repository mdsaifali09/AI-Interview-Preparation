import api from "./api";

export const generateCodingQuestion = async (
  category,
  difficulty
) => {

  const response = await api.post(
    "/coding-question/generate",
    {
      category,
      difficulty,
    }
  );

  return response.data;

};