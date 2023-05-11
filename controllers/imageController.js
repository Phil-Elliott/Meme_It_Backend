import Image from "../models/imageModel.js";

export const getImage = async (req, res, next) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        status: "fail",
        message: "Date query parameter is required!",
      });
    }

    const searchDate = new Date(date);
    searchDate.setHours(0, 0, 0, 0);

    const nextDate = new Date(searchDate);
    nextDate.setDate(searchDate.getDate() + 1);

    const image = await Image.findOne({
      date: {
        $gte: searchDate,
        $lt: nextDate,
      },
    });

    if (!image) {
      return res.status(404).json({
        status: "fail",
        message: "No image found with the provided date!",
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
  if (!req.body || !req.body.date) {
    return res.status(400).json({
      status: "fail",
      message: "No data or date sent!",
    });
  }

  try {
    const inputDate = new Date(req.body.date);
    inputDate.setHours(0, 0, 0, 0);

    const nextDate = new Date(inputDate);
    nextDate.setDate(inputDate.getDate() + 1);

    const existingImage = await Image.findOne({
      date: {
        $gte: inputDate,
        $lt: nextDate,
      },
    });

    if (existingImage) {
      return res.status(400).json({
        status: "fail",
        message: "An image already exists for the specified date!",
      });
    }

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
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        status: "fail",
        message: "Date query parameter is required!",
      });
    }

    const searchDate = new Date(date);
    searchDate.setHours(0, 0, 0, 0);

    const nextDate = new Date(searchDate);
    nextDate.setDate(searchDate.getDate() + 1);

    const deletedImage = await Image.findOneAndDelete({
      date: {
        $gte: searchDate,
        $lt: nextDate,
      },
    });

    if (!deletedImage) {
      return res.status(404).json({
        status: "fail",
        message: "No image found with the provided date!",
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
