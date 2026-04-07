import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import adminStyles from "./AdminPage.module.css";

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export default function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: "", level: "Intermediate" });
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState("");

  const load = async () => {
    const res = await API.get("/skills");
    setSkills(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!form.name.trim()) {
      toast.error("Skill name is required.");
      return;
    }
    setStatus("saving");
    try {
      await API.post("/skills", form);
      toast.success("Skill added!");
      setForm({ name: "", level: "Intermediate" });
      setShowForm(false);
      load();
    } catch {
      toast.error("Failed to add skill. Please try again.");
    } finally {
      setStatus("");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    try {
      await API.delete(`/skills/${id}`);
      toast.success("Skill deleted.");
      load();
    } catch {
      toast.error("Failed to delete skill. Please try again.");
    }
  };

  return (
    <div className={adminStyles.page}>
      <div className={adminStyles.header}>
        <h2 className={adminStyles.title}>Skills</h2>
        <p className={adminStyles.subtitle}>Manage your technical and professional skills</p>
      </div>

      <button
        className={adminStyles.btnPrimary}
        onClick={() => { setShowForm(!showForm); setStatus(""); }}
      >
        {showForm ? "Cancel" : "+ Add Skill"}
      </button>

      {showForm && (
        <div className={adminStyles.card} style={{ marginTop: 20 }}>
          <div className={adminStyles.cardTitle}>New Skill</div>

          <div className={adminStyles.formRow}>
            <div className={adminStyles.formGroup}>
              <label className={adminStyles.label}>Skill Name *</label>
              <input
                className={adminStyles.input}
                value={form.name}
                placeholder="e.g. React, Node.js, Python"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className={adminStyles.formGroup}>
              <label className={adminStyles.label}>Proficiency Level</label>
              <select
                className={adminStyles.input}
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
              >
                {LEVELS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            className={adminStyles.btnPrimary}
            onClick={handleAdd}
            disabled={status === "saving"}
          >
            {status === "saving" ? "Saving..." : "Add Skill"}
          </button>
        </div>
      )}

      <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
        {skills.length === 0 && (
          <div className={adminStyles.emptyState}>
            No skills added yet. Click "+ Add Skill" to start.
          </div>
        )}
        {skills.map((s) => (
          <div key={s._id} className={adminStyles.listCard}>
            <div className={adminStyles.listCardMain}>
              <div className={adminStyles.listCardTitle}>{s.name}</div>
              {s.level && (
                <div className={adminStyles.listCardMeta}>{s.level}</div>
              )}
            </div>
            <button
              className={adminStyles.btnDanger}
              onClick={() => handleDelete(s._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
