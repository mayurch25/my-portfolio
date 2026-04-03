import Profile from "../models/Profile.js";

// GET profile (Public) - returns single profile document
export const getProfile = async (req, res) => {
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
