import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "Image must have an image"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Image = mongoose.model("Image", imageSchema);

export default Image;
