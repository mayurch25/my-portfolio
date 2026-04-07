import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import adminStyles from "./AdminPage.module.css";

const emptyForm = {
  company: "", role: "", startDate: "", endDate: "", location: "", bullets: "",
};

export default function ManageExperience() {
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState("");

  const load = async () => {
    const res = await API.get("/experience");
    setExperiences(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!form.company || !form.role || !form.startDate) {
      toast.error("Company, Role and Start Date are required.");
      return;
    }
    setStatus("saving");
    try {
      await API.post("/experience", {
        ...form,
        bullets: form.bullets.split("\n").map((b) => b.trim()).filter(Boolean),
      });
      toast.success("Experience added successfully!");
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
    if (!window.confirm("Delete this experience?")) return;
    try {
      await API.delete(`/experience/${id}`);
      toast.success("Experience deleted.");
      load();
    } catch {
      toast.error("Failed to delete. Please try again.");
    }
  };

  return (
    <div className={adminStyles.page}>
      <div className={adminStyles.header}>
        <h2 className={adminStyles.title}>Work Experience</h2>
        <p className={adminStyles.subtitle}>Manage your work history shown on the portfolio</p>
      </div>

      <button className={adminStyles.btnPrimary} onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "+ Add Experience"}
      </button>

      {showForm && (
        <div className={adminStyles.card} style={{ marginTop: 20 }}>
          <div className={adminStyles.cardTitle}>New Experience</div>

          <div className={adminStyles.formGroup}>
            <label className={adminStyles.label}>Company *</label>
            <input className={adminStyles.input} value={form.company} placeholder="Ranium Systems Pvt. Ltd."
              onChange={(e) => setForm({ ...form, company: e.target.value })} />
          </div>
          <div className={adminStyles.formGroup}>
            <label className={adminStyles.label}>Role *</label>
            <input className={adminStyles.input} value={form.role} placeholder="Vue.js Developer"
              onChange={(e) => setForm({ ...form, role: e.target.value })} />
          </div>
          <div className={adminStyles.formRow}>
            <div className={adminStyles.formGroup}>
              <label className={adminStyles.label}>Start Date *</label>
              <input className={adminStyles.input} value={form.startDate} placeholder="04/2022"
                onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            </div>
            <div className={adminStyles.formGroup}>
              <label className={adminStyles.label}>End Date</label>
              <input className={adminStyles.input} value={form.endDate} placeholder="Present"
                onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            </div>
          </div>
          <div className={adminStyles.formGroup}>
            <label className={adminStyles.label}>Location</label>
            <input className={adminStyles.input} value={form.location} placeholder="Nagpur, India"
              onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
          <div className={adminStyles.formGroup}>
            <label className={adminStyles.label}>Bullet Points (one per line)</label>
            <textarea className={adminStyles.textarea} value={form.bullets} rows={5}
              placeholder={"Developed X using Y...\nCollaborated with team..."}
              onChange={(e) => setForm({ ...form, bullets: e.target.value })} />
          </div>

          <button className={adminStyles.btnPrimary} onClick={handleAdd} disabled={status === "saving"}>
            {status === "saving" ? "Saving..." : "Add Experience"}
          </button>
        </div>
      )}

      <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
        {experiences.length === 0 && (
          <div className={adminStyles.emptyState}>No experience added yet. Click "+ Add Experience" to start.</div>
        )}
        {experiences.map((exp) => (
          <div key={exp._id} className={adminStyles.listCard}>
            <div className={adminStyles.listCardMain}>
              <div className={adminStyles.listCardTitle}>{exp.role}</div>
              <div className={adminStyles.listCardSub}>{exp.company}</div>
              <div className={adminStyles.listCardMeta}>
                {exp.startDate} — {exp.endDate || "Present"} {exp.location ? `· ${exp.location}` : ""}
              </div>
              {exp.bullets?.length > 0 && (
                <ul className={adminStyles.bulletList}>
                  {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
            </div>
            <button className={adminStyles.btnDanger} onClick={() => handleDelete(exp._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
