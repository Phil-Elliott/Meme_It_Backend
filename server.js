import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import app from "./app.js";

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

const PORT = process.env.PORT;

app.listen(PORT, (error) => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

/*

functionality 
1) User stuff (could do this first)
2) Other stuff
     - save api images (same for everyone and show to everyone) - will be organized by date
     - have comments (writing for memes) - show to everyone
     - have likes (like for memes) - show to everyone
     - only users can write a comment and each user gets one like a day but cant like their own meme

*/
