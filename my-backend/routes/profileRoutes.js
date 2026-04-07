import express from "express";
import multer from "multer";
import path from "path";
import { getProfile, updateProfile, uploadProfileImage, uploadResume } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const imageStorage = multer.diskStorage({
  destination: "uploads/profiles/",
  filename: (_req, file, cb) => {
    cb(null, "profile" + path.extname(file.originalname));
  },
});
const uploadImage = multer({ storage: imageStorage, limits: { fileSize: 5 * 1024 * 1024 } });

const resumeStorage = multer.diskStorage({
  destination: "uploads/resume/",
  filename: (_req, file, cb) => {
    cb(null, "resume" + path.extname(file.originalname));
  },
});
const uploadResumeFile = multer({
  storage: resumeStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

router.get("/", getProfile);
router.put("/", protect, updateProfile);
router.post("/upload-image", protect, uploadImage.single("image"), uploadProfileImage);
router.post("/upload-resume", protect, uploadResumeFile.single("resume"), uploadResume);

export default router;
