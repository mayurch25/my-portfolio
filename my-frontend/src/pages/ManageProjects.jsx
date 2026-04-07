import { useEffect, useState } from "react";
import API from "../services/api";
import adminStyles from "./AdminPage.module.css";

const emptyForm = { title: "", description: "", techStack: "" };

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
      setStatus("validation");
      return;
    }
    setStatus("saving");
    try {
      await API.post("/projects", {
        ...form,
        techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      });
      setForm(emptyForm);
      setShowForm(false);
      setStatus("");
      fetchProjects();
    } catch {
      setStatus("error");
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    await API.delete(`/projects/${id}`);
    fetchProjects();
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

          {status === "validation" && (
            <p className={adminStyles.error}>Title and Description are required.</p>
          )}
          {status === "error" && (
            <p className={adminStyles.error}>Failed to save. Please try again.</p>
          )}

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
