import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

import userRouter from "./routes/userRoutes.js";
import memeRouter from "./routes/memeRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/users", userRouter);
app.use("/api/v1/meme", memeRouter);
app.use("/api/v1/image", imageRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  // Handle validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "fail",
      message: err.message,
      errors: err.errors,
    });
  }

  // Handle other errors
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

export default app;
