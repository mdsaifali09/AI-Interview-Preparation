import api from "./api";

export const generateInterviewQuestion = async (
  category,
  difficulty
) => {
  const response = await api.post(
    "/interview/generate-question",
    {
      category,
      difficulty,
    }
  );

  return response.data;
};


export const evaluateInterviewAnswer = async ({
  category,
  difficulty,
  question,
  answer,
}) => {
  const response = await api.post(
    "/interview/evaluate-answer",
    {
      category,
      difficulty,
      question,
      answer,
    }
  );

  return response.data;
};