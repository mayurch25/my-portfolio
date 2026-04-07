import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import adminStyles from "./AdminPage.module.css";

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export default function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: "", level: "Intermediate" });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  const load = async () => {
    const res = await API.get("/skills");
    setSkills(res.data);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ name: "", level: "Intermediate" });
    setEditingId(null);
    setShowForm(false);
    setStatus("");
  };

  const handleStartEdit = (skill) => {
    setForm({ name: skill.name, level: skill.level || "Intermediate" });
    setEditingId(skill._id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Skill name is required.");
      return;
    }
    setStatus("saving");
    try {
      if (editingId) {
        await API.put(`/skills/${editingId}`, form);
        toast.success("Skill updated!");
      } else {
        await API.post("/skills", form);
        toast.success("Skill added!");
      }
      resetForm();
      load();
    } catch {
      toast.error("Failed to save skill. Please try again.");
    } finally {
      setStatus("");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    try {
      await API.delete(`/skills/${id}`);
      toast.success("Skill deleted.");
      if (editingId === id) resetForm();
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
        onClick={() => {
          if (showForm && !editingId) {
            resetForm();
          } else {
            resetForm();
            setShowForm(true);
          }
        }}
      >
        {showForm && !editingId ? "Cancel" : "+ Add Skill"}
      </button>

      {showForm && (
        <div className={adminStyles.card} style={{ marginTop: 20 }}>
          <div className={adminStyles.cardTitle}>{editingId ? "Edit Skill" : "New Skill"}</div>

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

          <div style={{ display: "flex", gap: 10 }}>
            <button
              className={adminStyles.btnPrimary}
              onClick={handleSave}
              disabled={status === "saving"}
            >
              {status === "saving" ? "Saving..." : editingId ? "Update Skill" : "Add Skill"}
            </button>
            {editingId && (
              <button className={adminStyles.btnSecondary} onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
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
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className={adminStyles.btnSecondary}
                onClick={() => handleStartEdit(s)}
              >
                Edit
              </button>
              <button
                className={adminStyles.btnDanger}
                onClick={() => handleDelete(s._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
