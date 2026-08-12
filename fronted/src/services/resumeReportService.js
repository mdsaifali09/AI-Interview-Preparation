import api from "./api";

export const getResumeReport = async (id)=>{

    const response =
    await api.get(
        `/resume/history/${id}`
    );

    return response.data;

};