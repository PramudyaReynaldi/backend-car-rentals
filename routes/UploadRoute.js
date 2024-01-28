import express from "express";
import { uploadImage, getImage, uploadIcon, getIcon } from "../controllers/Uploads.js";

const router = express.Router();

router.use("/images", express.static("public/images"));
router.post("/upload", uploadImage);
router.post("/uploadIcon", uploadIcon);
router.get("/images/:imageName", getImage);
router.get("/icons/:iconName", getIcon);

export default router;