import FavoriteQuestion from "../models/FavoriteQuestion.js";

export const toggleFavorite = async (req, res) => {

  try {

    const { questionId } = req.body;

    const existing = await FavoriteQuestion.findOne({

      user: req.user.id,

      question: questionId,

    });

    if (existing) {

      await FavoriteQuestion.findByIdAndDelete(existing._id);

      return res.json({

        success: true,

        favorite: false,

      });

    }

    await FavoriteQuestion.create({

      user: req.user.id,

      question: questionId,

    });

    res.json({

      success: true,

      favorite: true,

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

    });

  }

};