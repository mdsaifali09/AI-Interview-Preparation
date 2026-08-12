
import api from "./api";

export const submitCodingSolution = async (
  questionId,
  language,
  code
) => {

  const response = await api.post(
    "/coding-submissions",
    {
      questionId,
      language,
      code,
    }
  );

  return response.data;
};



export const getSubmissionHistory = async () => {

  const response = await api.get(
    "/coding-submissions/history"
  );

  return response.data;
};



export const getCodingAnalytics = async () => {

  const response = await api.get(
    "/coding-submissions/analytics"
  );

  return response.data;

};



