import Question from "../models/Question.js";

export const createQuestion =
  async (req, res) => {
    try {
      const question =
        await Question.create(
          req.body
        );

      res.status(201).json(
        question
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getQuestions =
  async (req, res) => {
    try {
      const questions =
        await Question.find();

      res.status(200).json(
        questions
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// export const getQuestionById =
//   async (req, res) => {
//     try {
//       const question =
//         await Question.findById(
//           req.params.id
//         );

//       res.status(200).json(
//         question
//       );
//     } catch (error) {
//       res.status(500).json({
//         message: error.message,
//       });
//     }
//   };


export const updateQuestion =
  async (req, res) => {
    try {
      const question =
        await Question.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.status(200).json(
        question
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  

export const deleteQuestion =
  async (req, res) => {
    try {
      await Question.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        message:
          "Question Deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


  export const getQuestionById =
  async (req, res) => {

    try {

      const question =
        await Question.findById(
          req.params.id
        );

      res.json(question);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};


export const getQuestionAnalytics =
async (req, res) => {

  try {

    const questions =
      await Question.find();

    const analytics = {

      total: questions.length,

      easy: questions.filter(
        q => q.difficulty === "Easy"
      ).length,

      medium: questions.filter(
        q => q.difficulty === "Medium"
      ).length,

      hard: questions.filter(
        q => q.difficulty === "Hard"
      ).length,

      java: questions.filter(
        q => q.category === "Java"
      ).length,

      mern: questions.filter(
        q => q.category === "MERN"
      ).length,

      dbms: questions.filter(
        q => q.category === "DBMS"
      ).length,

      os: questions.filter(
        q => q.category === "OS"
      ).length,

      cn: questions.filter(
        q => q.category === "CN"
      ).length,

    };

    res.json(analytics);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
  


  