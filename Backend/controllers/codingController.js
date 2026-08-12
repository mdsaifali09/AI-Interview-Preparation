import { executeCode } from "../services/codeExecutionService.js";

export const runCode = async (req, res) => {

  try {

    const { language, code } = req.body;

    const result = await executeCode(language, code);

    res.json({

      success: true,

      output: result.run.output,

    });

  } catch (error) {

  console.log("RUN CODE ERROR:");
  console.log(error.response?.data || error.message);

  res.status(500).json({
    success: false,
    message: error.response?.data || error.message,
  });

}

};