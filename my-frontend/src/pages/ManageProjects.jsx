import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import adminStyles from "./AdminPage.module.css";

const emptyForm = { title: "", description: "", techStack: "", githubLink: "", liveLink: "" };

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState("");

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    API.get("/projects").then((res) => setProjects(res.data));
  }, []);

  const handleAdd = async () => {
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
      setShowForm(false);
      setStatus("");
      fetchProjects();
    } catch {
      toast.error("Failed to save. Please try again.");
      setStatus("");
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await API.delete(`/projects/${id}`);
      toast.success("Project deleted.");
      fetchProjects();
    } catch {
      toast.error("Failed to delete. Please try again.");
    }
  };

  return (
    <div className={adminStyles.page}>
      <div className={adminStyles.header}>
        <h2 className={adminStyles.title}>Projects</h2>
        <p className={adminStyles.subtitle}>Manage your portfolio projects</p>
      </div>

      <button
        className={adminStyles.btnPrimary}
        onClick={() => { setShowForm(!showForm); setStatus(""); }}
      >
        {showForm ? "Cancel" : "+ Add Project"}
      </button>

      {showForm && (
        <div className={adminStyles.card} style={{ marginTop: 20 }}>
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

          <div className={adminStyles.formGroup}>
            <label className={adminStyles.label}>GitHub Link</label>
            <input
              className={adminStyles.input}
              value={form.githubLink}
              placeholder="https://github.com/username/repo"
              onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
            />
          </div>

          <div className={adminStyles.formGroup}>
            <label className={adminStyles.label}>Live Demo Link</label>
            <input
              className={adminStyles.input}
              value={form.liveLink}
              placeholder="https://your-project.com"
              onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
            />
          </div>

          <button
            className={adminStyles.btnPrimary}
            onClick={handleAdd}
            disabled={status === "saving"}
          >
            {status === "saving" ? "Saving..." : "Add Project"}
          </button>
        </div>
      )}

      <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
        {projects.length === 0 && (
          <div className={adminStyles.emptyState}>
            No projects added yet. Click "+ Add Project" to start.
          </div>
        )}
        {projects.map((p) => (
          <div key={p._id} className={adminStyles.listCard}>
            <div className={adminStyles.listCardMain}>
              <div className={adminStyles.listCardTitle}>{p.title}</div>
              <div className={adminStyles.listCardMeta}>{p.description}</div>
              {p.techStack && p.techStack.length > 0 && (
                <ul className={adminStyles.bulletList}>
                  {p.techStack.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
              )}
              {(p.githubLink || p.liveLink) && (
                <div style={{ display: "flex", gap: 12, marginTop: 6, flexWrap: "wrap" }}>
                  {p.githubLink && (
                    <a href={p.githubLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--accent)" }}>
                      GitHub →
                    </a>
                  )}
                  {p.liveLink && (
                    <a href={p.liveLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--accent)" }}>
                      Live Demo →
                    </a>
                  )}
                </div>
              )}
            </div>
            <button
              className={adminStyles.btnDanger}
              onClick={() => deleteProject(p._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
