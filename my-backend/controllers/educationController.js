import Education from "../models/Education.js";

// GET all education (Public)
export const getEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1, createdAt: -1 });
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE education (Admin)
export const createEducation = async (req, res) => {
  try {
    const edu = await Education.create(req.body);
    res.json(edu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE education (Admin)
export const updateEducation = async (req, res) => {
  try {
    const edu = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(edu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE education (Admin)
export const deleteEducation = async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: "Education deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
