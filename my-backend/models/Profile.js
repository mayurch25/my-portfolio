import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: { type: String, default: "Mayur Chaudhari" },
  title: { type: String, default: "Frontend Engineer | Vue.js | Nuxt.js | React.js" },
  about: { type: String, default: "" },
  phone: { type: String, default: "" },
  email: { type: String, default: "" },
  location: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  github: { type: String, default: "" },
  yearsOfExperience: { type: String, default: "" },
  languages: { type: [String], default: [] },
});

export default mongoose.model("Profile", profileSchema);
