import Profile from "../models/Profile.js";

// GET profile (Public) - returns single profile document
export const getProfile = async (_req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPLOAD profile image (Admin)
export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const imageUrl = `/uploads/profiles/${req.file.filename}`;
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({ profileImage: imageUrl });
    } else {
      profile.profileImage = imageUrl;
      await profile.save();
    }
    res.json({ profileImage: imageUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPLOAD resume (Admin)
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const resumeUrl = `/uploads/resume/${req.file.filename}`;
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({ resume: resumeUrl });
    } else {
      profile.resume = resumeUrl;
      await profile.save();
    }
    res.json({ resume: resumeUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE profile (Admin) - upsert single profile
export const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      Object.assign(profile, req.body);
      await profile.save();
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
