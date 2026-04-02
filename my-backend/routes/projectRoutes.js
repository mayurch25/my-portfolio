import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getProjects);

// Protected (Admin only)
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;