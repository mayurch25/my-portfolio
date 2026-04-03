import express from "express";
import multer from "multer";
import path from "path";
import { getProfile, updateProfile, uploadProfileImage } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_req, file, cb) => {
    cb(null, "profile" + path.extname(file.originalname));
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.get("/", getProfile);
router.put("/", protect, updateProfile);
router.post("/upload-image", protect, upload.single("image"), uploadProfileImage);

export default router;
