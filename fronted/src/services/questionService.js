import api from "./api";

export const getQuestions = async () => {
  const response = await api.get("/questions");
  return response.data;
};

export const createQuestion = async (data) => {
  const response = await api.post(
    "/questions",
    data
  );

  return response.data;
};

export const deleteQuestion = async (id) => {
const response = await api.delete(
`/questions/${id}`
);

return response.data;
};


export const updateQuestion = async (
  id,
  questionData
) => {

  const response =
    await api.put(
      `/questions/${id}`,
      questionData
    );

  return response.data;
};

export const getQuestionById =
  async (id) => {

    const response =
      await api.get(
        `/questions/${id}`
      );

    return response.data;
};

export const getAnalytics =
async () => {

  const response =
    await api.get(
      "/questions/analytics"
    );

  return response.data;

};