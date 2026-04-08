import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import adminStyles from "./AdminPage.module.css";

export default function ChangePassword() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [saving, setSaving] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (form.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setSaving(true);
    try {
      await API.post("/auth/change-password", {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });
      toast.success("Password changed successfully!");
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={adminStyles.page}>
      <div className={adminStyles.header}>
        <h1 className={adminStyles.title}>Change Password</h1>
        <p className={adminStyles.subtitle}>Update your admin account password</p>
      </div>

      <div className={adminStyles.card}>
        <div className={adminStyles.cardTitle}>New Password</div>
        <form onSubmit={handleSubmit}>
          <div className={adminStyles.formGroup}>
            <label className={adminStyles.label}>Current Password</label>
            <input
              type="password"
              className={adminStyles.input}
              placeholder="Enter current password"
              value={form.oldPassword}
              onChange={handleChange("oldPassword")}
            />
          </div>
          <div className={adminStyles.formGroup}>
            <label className={adminStyles.label}>New Password</label>
            <input
              type="password"
              className={adminStyles.input}
              placeholder="Enter new password (min. 6 characters)"
              value={form.newPassword}
              onChange={handleChange("newPassword")}
            />
          </div>
          <div className={adminStyles.formGroup}>
            <label className={adminStyles.label}>Confirm New Password</label>
            <input
              type="password"
              className={adminStyles.input}
              placeholder="Re-enter new password"
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
          </div>
          <button type="submit" className={adminStyles.btnPrimary} disabled={saving}>
            {saving ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
