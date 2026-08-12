import axios from "axios";

export const executeCode = async (language, code) => {
  const versionMap = {
    java: "15.0.2",
    python: "3.10.0",
    javascript: "18.15.0",
    cpp: "10.2.0",
  };

  try {
    const response = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      {
        language,
        version: versionMap[language],
        files: [
          {
            content: code,
          },
        ],
      }
    );

    console.log("PISTON RESPONSE:");
    console.log(response.data);

    return response.data;

  } catch (err) {

    console.log("PISTON ERROR:");
    console.log(err.response?.status);
    console.log(err.response?.data);
    console.log(err.message);

    throw err;
  }
};