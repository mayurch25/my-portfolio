import express from "express";
import {
  getSkills,
  createSkill,
  deleteSkill
} from "../controllers/skillController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getSkills);
router.post("/", protect, createSkill);
router.delete("/:id", protect, deleteSkill);

export default router;