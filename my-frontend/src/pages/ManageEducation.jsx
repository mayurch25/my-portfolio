import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import adminStyles from "./AdminPage.module.css";

const emptyForm = { degree: "", institution: "", year: "", location: "" };

export default function ManageEducation() {
  const [education, setEducation] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState("");

  const load = async () => {
    const res = await API.get("/education");
    setEducation(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!form.degree || !form.institution) {
      toast.error("Degree and Institution are required.");
      return;
    }
    setStatus("saving");
    try {
      await API.post("/education", form);
      toast.success("Education added successfully!");
      setForm(emptyForm);
      setShowForm(false);
      setStatus("");
      load();
    } catch {
      toast.error("Failed to save. Please try again.");
      setStatus("");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this education entry?")) return;
    try {
      await API.delete(`/education/${id}`);
      toast.success("Education entry deleted.");
      load();
    } catch {
      toast.error("Failed to delete. Please try again.");
    }
  };

  return (
    <div className={adminStyles.page}>
      <div className={adminStyles.header}>
        <h2 className={adminStyles.title}>Education</h2>
        <p className={adminStyles.subtitle}>Manage your academic qualifications</p>
      </div>

      <button className={adminStyles.btnPrimary} onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "+ Add Education"}
      </button>

      {showForm && (
        <div className={adminStyles.card} style={{ marginTop: 20 }}>
          <div className={adminStyles.cardTitle}>New Education</div>

          <div className={adminStyles.formGroup}>
            <label className={adminStyles.label}>Degree / Qualification *</label>
            <input className={adminStyles.input} value={form.degree}
              placeholder="Bachelor of Electronics & Telecommunication Engineering"
              onChange={(e) => setForm({ ...form, degree: e.target.value })} />
          </div>
          <div className={adminStyles.formGroup}>
            <label className={adminStyles.label}>Institution *</label>
            <input className={adminStyles.input} value={form.institution}
              placeholder="Godavari College of Engineering"
              onChange={(e) => setForm({ ...form, institution: e.target.value })} />
          </div>
          <div className={adminStyles.formRow}>
            <div className={adminStyles.formGroup}>
              <label className={adminStyles.label}>Year</label>
              <input className={adminStyles.input} value={form.year} placeholder="2015"
                onChange={(e) => setForm({ ...form, year: e.target.value })} />
            </div>
            <div className={adminStyles.formGroup}>
              <label className={adminStyles.label}>Location</label>
              <input className={adminStyles.input} value={form.location} placeholder="Jalgaon, India"
                onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
          </div>

          <button className={adminStyles.btnPrimary} onClick={handleAdd} disabled={status === "saving"}>
            {status === "saving" ? "Saving..." : "Add Education"}
          </button>
        </div>
      )}

      <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
        {education.length === 0 && (
          <div className={adminStyles.emptyState}>No education added yet. Click "+ Add Education" to start.</div>
        )}
        {education.map((edu) => (
          <div key={edu._id} className={adminStyles.listCard}>
            <div className={adminStyles.listCardMain}>
              <div className={adminStyles.listCardTitle}>{edu.degree}</div>
              <div className={adminStyles.listCardSub}>{edu.institution}</div>
              <div className={adminStyles.listCardMeta}>
                {edu.location}{edu.location && edu.year ? " · " : ""}{edu.year}
              </div>
            </div>
            <button className={adminStyles.btnDanger} onClick={() => handleDelete(edu._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
