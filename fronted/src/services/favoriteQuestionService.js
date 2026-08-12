import api from "./api";

export const toggleFavorite = async (questionId) => {

  const response = await api.post(

    "/favorite-question",

    {

      questionId,

    }

  );

  return response.data;

};