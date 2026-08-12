import api from "./api";

// Generate AI Questions
export const generateAIQuestions = async (data) => {
  const response = await api.post("/ai/generate", data);

  return response.data.questions;
};

// Save AI Question to Database
export const saveQuestion = async (question) => {
  const response = await api.post("/questions", question);

  return response.data;
};