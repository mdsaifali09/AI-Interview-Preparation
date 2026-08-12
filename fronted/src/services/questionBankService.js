import api from "./api";

export const getQuestionBank = async (

  category,

  difficulty,

  search

) => {

  const response = await api.get(

    "/question-bank",

    {

      params: {

        category,

        difficulty,

        search,

      },

    }

  );

  return response.data;

};