import Meme from "../models/memeModel.js";

export const getAllMemes = async (req, res, next) => {
  try {
    const memes = await Meme.find();

    res.status(200).json({
      status: "success",
      results: memes.length,
      data: {
        memes,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const addMeme = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      status: "fail",
      message: "No data sent!",
    });
  }

  try {
    const newMeme = await Meme.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        meme: newMeme,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteMeme = async (req, res, next) => {
  try {
    const { id } = req.params;
    const meme = await Meme.findByIdAndDelete(id);

    if (!meme) {
      return res.status(404).json({
        status: "fail",
        message: "No meme found with that ID!",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

export const toggleLike = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.body.user);
    const userId = req.body.user; // Replace this with the actual user ID you get from your authentication system
    const meme = await Meme.findById(id);

    if (!meme) {
      return res.status(404).json({
        status: "fail",
        message: "No meme found with that ID!",
      });
    }

    const userIndex = meme.likes.indexOf(userId);
    console.log(userIndex, "userIndex");

    if (userIndex === -1) {
      // User hasn't liked the meme yet, add the like
      console.log("pushing");
      meme.likes.push(userId);
    } else {
      // User already liked the meme, remove the like
      meme.likes.splice(userIndex, 1);
    }

    await meme.save();

    res.status(200).json({
      status: "success",
      data: {
        meme,
      },
    });
  } catch (err) {
    console.log(err); // Add error logging
    next(err);
  }
};
