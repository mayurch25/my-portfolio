import express from "express";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getExperiences);
router.post("/", protect, createExperience);
router.put("/:id", protect, updateExperience);
router.delete("/:id", protect, deleteExperience);

export default router;
