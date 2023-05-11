import express from "express";
import {
  getImage,
  addImage,
  deleteImage,
} from "../controllers/imageController.js";

const router = express.Router();

router.route("/").get(getImage).post(addImage).delete(deleteImage);

export default router;
