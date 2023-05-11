import mongoose from "mongoose";

const memeSchema = new mongoose.Schema({
  user: {
    // type: mongoose.Schema.ObjectId,
    // ref: "User",
    type: String,
    required: [true, "Meme must belong to a user"],
  },
  meme: {
    type: String,
    required: [true, "Meme must have a meme"],
    minlength: [10, "Meme must be at least 10 characters long"],
    maxlength: [100, "Meme must be less than 100 characters long"],
    unique: true,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

const Meme = mongoose.model("Meme", memeSchema);

export default Meme;
