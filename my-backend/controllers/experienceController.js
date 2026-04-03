import Experience from "../models/Experience.js";

// GET all experiences (Public)
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE experience (Admin)
export const createExperience = async (req, res) => {
  try {
    const exp = await Experience.create(req.body);
    res.json(exp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE experience (Admin)
export const updateExperience = async (req, res) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(exp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE experience (Admin)
export const deleteExperience = async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: "Experience deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
