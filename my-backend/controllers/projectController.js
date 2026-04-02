import Project from "../models/Project.js";

// GET all projects (Public)
export const getProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

// CREATE project (Admin)
export const createProject = async (req, res) => {
  const project = await Project.create(req.body);
  res.json(project);
};

// UPDATE project
export const updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(project);
};

// DELETE project
export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
};