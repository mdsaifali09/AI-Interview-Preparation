import api from "./api";

export const runCode = async (language, code) => {

  const response = await api.post(

    "/coding/run",

    {

      language,

      code,

    }

  );

  return response.data;

};