import Image from "../models/imageModel.js";

export const getImage = async (req, res, next) => {
  try {
    const image = await Image.findOne({ date: Date.now() });

    if (!image) {
      return res.status(404).json({
        status: "fail",
        message: "No image found with that ID!",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        image,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const addImage = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      status: "fail",
      message: "No data sent!",
    });
  }

  try {
    const newImage = await Image.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        image: newImage,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = await Image.findByIdAndDelete(id);

    if (!image) {
      return res.status(404).json({
        status: "fail",
        message: "No image found with that ID!",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
