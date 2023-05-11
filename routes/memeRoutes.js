import express from "express";
import {
  getAllMemes,
  addMeme,
  deleteMeme,
  toggleLike,
} from "../controllers/memeController.js";

const router = express.Router();

router.route("/").get(getAllMemes).post(addMeme);
router.route("/:id").delete(deleteMeme).patch(toggleLike);

export default router;
