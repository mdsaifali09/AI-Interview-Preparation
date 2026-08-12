import api from "./api";

export const getCodingHistory = async () => {

  const response = await api.get(
    "/coding-history"
  );

  return response.data;

};