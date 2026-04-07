import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import adminStyles from "./AdminPage.module.css";

const BACKEND_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:3000";

export default function ManageProfile() {
  const [form, setForm] = useState({
    name: "", title: "", about: "",
    phone: "", email: "", location: "",
    linkedin: "", github: "", yearsOfExperience: "",
    languages: "",
  });
  const [status, setStatus] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageStatus, setImageStatus] = useState("");
  const [resume, setResume] = useState("");
  const [resumeStatus, setResumeStatus] = useState("");
  const fileInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      const res = await API.get("/profile");
      const p = res.data;
      setForm({
        name: p.name || "",
        title: p.title || "",
        about: p.about || "",
        phone: p.phone || "",
        email: p.email || "",
        location: p.location || "",
        linkedin: p.linkedin || "",
        github: p.github || "",
        yearsOfExperience: p.yearsOfExperience || "",
        languages: p.languages?.join(", ") || "",
      });
      if (p.profileImage) {
        setProfileImage(p.profileImage);
        setImagePreview(`${BACKEND_URL}${p.profileImage}`);
      }
      if (p.resume) setResume(p.resume);
    };
    load();
  }, []);

  const handleSave = async () => {
    setStatus("saving");
    try {
      await API.put("/profile", {
        ...form,
        languages: form.languages.split(",").map((l) => l.trim()).filter(Boolean),
      });
      toast.success("Profile saved successfully!");
      setStatus("");
    } catch {
      toast.error("Failed to save. Please try again.");
      setStatus("");
    }
  };

  const handleResumeUpload = async () => {
    const file = resumeInputRef.current?.files[0];
    if (!file) return;
    setResumeStatus("uploading");
    try {
      const formData = new FormData();
      formData.append("resume", file);
      const res = await API.post("/profile/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResume(res.data.resume);
      toast.success("Resume uploaded!");
    } catch {
      toast.error("Upload failed. Only PDF files are allowed.");
    } finally {
      setResumeStatus("");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
  };

  const handleImageUpload = async () => {
    const file = fileInputRef.current?.files[0];
    if (!file) return;
    setImageStatus("uploading");
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await API.post("/profile/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfileImage(res.data.profileImage);
      setImagePreview(`${BACKEND_URL}${res.data.profileImage}`);
      toast.success("Image uploaded!");
      setImageStatus("");
    } catch {
      toast.error("Upload failed. Try again.");
      setImageStatus("");
    }
  };

  const field = (label, key, multiline = false, placeholder = "") => (
    <div className={adminStyles.formGroup} key={key}>
      <label className={adminStyles.label}>{label}</label>
      {multiline ? (
        <textarea
          className={adminStyles.textarea}
          value={form[key]}
          placeholder={placeholder}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          rows={4}
        />
      ) : (
        <input
          className={adminStyles.input}
          value={form[key]}
          placeholder={placeholder}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        />
      )}
    </div>
  );

  return (
    <div className={adminStyles.page}>
      <div className={adminStyles.header}>
        <h2 className={adminStyles.title}>Manage Profile</h2>
        <p className={adminStyles.subtitle}>Update your public portfolio information</p>
      </div>

      <div className={adminStyles.card}>
        <div className={adminStyles.cardTitle}>Profile Image</div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          <div style={{
            width: 100, height: 100, borderRadius: "50%",
            overflow: "hidden", border: "3px solid #6c63ff",
            background: "#1a1a28", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {imagePreview ? (
              <img src={imagePreview} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ fontSize: "2.5rem" }}>👤</span>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className={adminStyles.input}
              onChange={handleImageChange}
            />
            <button
              className={adminStyles.btnPrimary}
              style={{ marginTop: 10 }}
              onClick={handleImageUpload}
              disabled={imageStatus === "uploading"}
            >
              {imageStatus === "uploading" ? "Uploading..." : "Upload Image"}
            </button>
          </div>
        </div>
      </div>

      <div className={adminStyles.card}>
        <div className={adminStyles.cardTitle}>Resume</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {resume && (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: "#a0a0b0", fontSize: 14 }}>Current: resume.pdf</span>
              <a
                href={`${BACKEND_URL}${resume}`}
                download="resume.pdf"
                className={adminStyles.btnPrimary}
                style={{ textDecoration: "none", padding: "6px 14px", fontSize: 13 }}
              >
                Download
              </a>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <input
              ref={resumeInputRef}
              type="file"
              accept="application/pdf"
              className={adminStyles.input}
              style={{ flex: 1, minWidth: 200 }}
            />
            <button
              className={adminStyles.btnPrimary}
              onClick={handleResumeUpload}
              disabled={resumeStatus === "uploading"}
            >
              {resumeStatus === "uploading" ? "Uploading..." : "Upload Resume"}
            </button>
          </div>
          <p style={{ color: "#a0a0b0", fontSize: 12, margin: 0 }}>PDF only, max 10MB</p>
        </div>
      </div>

      <div className={adminStyles.card}>
        <div className={adminStyles.cardTitle}>Personal Info</div>
        {field("Full Name", "name", false, "Mayur Chaudhari")}
        {field("Professional Title", "title", false, "Frontend Engineer | Vue.js | ...")}
        {field("About / Bio", "about", true, "Write about yourself...")}
      </div>

      <div className={adminStyles.card}>
        <div className={adminStyles.cardTitle}>Contact Details</div>
        {field("Phone", "phone", false, "9421674880")}
        {field("Email", "email", false, "mayurrchaudhari25@gmail.com")}
        {field("Location", "location", false, "Ambazhari, Nagpur")}
      </div>

      <div className={adminStyles.card}>
        <div className={adminStyles.cardTitle}>Links &amp; More</div>
        {field("LinkedIn URL", "linkedin", false, "https://www.linkedin.com/in/...")}
        {field("GitHub URL", "github", false, "https://github.com/...")}
        {field("Years of Experience", "yearsOfExperience", false, "5+")}
        {field("Languages (comma-separated)", "languages", false, "English, Hindi, Marathi")}
      </div>

      <button
        className={adminStyles.btnPrimary}
        onClick={handleSave}
        disabled={status === "saving"}
      >
        {status === "saving" ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
}
