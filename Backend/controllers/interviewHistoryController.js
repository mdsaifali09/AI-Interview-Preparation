import Interview from "../models/Interview.js";

export const saveInterview = async (
  req,
  res
) => {
  try {
    const {
      category,
      difficulty,
      overallScore,
      interviews,
    } = req.body;

    const interview =
      await Interview.create({
        user: req.user.id,
        category,
        difficulty,
        overallScore,
        interviews,
      });

    res.status(201).json({
      success: true,
      interview,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getInterviewHistory = async (
  req,
  res
) => {
  try {

    const interviews =
      await Interview.find({
        user: req.user.id,
      }).sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      interviews,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


export const getInterviewById = async (
  req,
  res
) => {
  try {

    const interview =
      await Interview.findOne({
        _id: req.params.id,
        user: req.user.id,
      });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    res.json({
      success: true,
      interview,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};