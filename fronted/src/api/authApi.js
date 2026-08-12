import axios from "axios";

const API =
  "https://ai-interview-preparation-qg9x.onrender.com/api/auth",
export const registerUser =
  (userData) =>
    axios.post(
      `${API}/register`,
      userData
    );

export const loginUser =
  (userData) =>
    axios.post(
      `${API}/login`,
      userData
    );

export const getProfile =
  (token) =>
    axios.get(
      `${API}/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );