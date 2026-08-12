import api from "./api";

export const saveInterview = async (
  data
) => {
  const response =
    await api.post(
      "/interview-history/save",
      data
    );

  return response.data;
};


export const getInterviewHistory =
async () => {

const response =
await api.get(
"/interview-history"
);

return response.data;

};


export const getInterviewById =
async (id) => {

const response =
await api.get(
`/interview-history/${id}`
);

return response.data;

};