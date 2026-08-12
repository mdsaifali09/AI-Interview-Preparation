import api from "./api";

export const reviewCode = async (

  questionId,

  language,

  code

) => {

  const response = await api.post(

    "/coding/review",

    {

      questionId,

      language,

      code,

    }

  );

  return response.data;

};