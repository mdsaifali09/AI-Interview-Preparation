import CodingAttempt from "../models/CodingAttempt.js";

export const getCodingHistory = async (req, res) => {

  try {

    const attempts = await CodingAttempt.find({

      user: req.user.id,

    })
      .populate("question", "title difficulty category")
      .sort({ createdAt: -1 });

    res.json({

      success: true,

      attempts,

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message: "Unable to fetch coding history",

    });

  }

};