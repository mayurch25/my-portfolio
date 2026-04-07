import { useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import adminStyles from "./AdminPage.module.css";

const emptyForm = { title: "", description: "", techStack: "" };

export default function AddProject() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    if (!form.title || !form.description) {
      toast.error("Title and Description are required.");
      return;
    }
    setStatus("saving");
    try {
      await API.post("/projects", {
        ...form,
        techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      });
      toast.success("Project added successfully!");
      setForm(emptyForm);
      setStatus("");
    } catch {
      toast.error("Failed to add project. Please try again.");
      setStatus("");
    }
  };

  return (
    <div className={adminStyles.page}>
      <div className={adminStyles.header}>
        <h2 className={adminStyles.title}>Add Project</h2>
        <p className={adminStyles.subtitle}>Add a new project to your portfolio</p>
      </div>

      <div className={adminStyles.card}>
        <div className={adminStyles.cardTitle}>New Project</div>

        <div className={adminStyles.formGroup}>
          <label className={adminStyles.label}>Title *</label>
          <input
            className={adminStyles.input}
            value={form.title}
            placeholder="My Awesome Project"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className={adminStyles.formGroup}>
          <label className={adminStyles.label}>Description *</label>
          <textarea
            className={adminStyles.textarea}
            value={form.description}
            placeholder="A brief description of the project..."
            rows={3}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className={adminStyles.formGroup}>
          <label className={adminStyles.label}>Tech Stack (comma-separated)</label>
          <input
            className={adminStyles.input}
            value={form.techStack}
            placeholder="React, Node.js, MongoDB"
            onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          />
        </div>

        <button
          className={adminStyles.btnPrimary}
          onClick={handleSubmit}
          disabled={status === "saving"}
        >
          {status === "saving" ? "Saving..." : "Add Project"}
        </button>
      </div>
    </div>
  );
}
