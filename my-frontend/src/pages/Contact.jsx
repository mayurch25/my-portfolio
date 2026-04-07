import { useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import adminStyles from "./AdminPage.module.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("All fields are required.");
      return;
    }
    setStatus("sending");
    try {
      await API.post("/contact", form);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setStatus("");
    }
  };

  return (
    <div className={adminStyles.page}>
      <div className={adminStyles.header}>
        <h2 className={adminStyles.title}>Contact</h2>
        <p className={adminStyles.subtitle}>Send a message — it will appear in your Messages inbox</p>
      </div>

      <div className={adminStyles.card}>
        <div className={adminStyles.cardTitle}>New Message</div>

        <div className={adminStyles.formRow}>
          <div className={adminStyles.formGroup}>
            <label className={adminStyles.label}>Name *</label>
            <input
              className={adminStyles.input}
              name="name"
              value={form.name}
              placeholder="John Doe"
              onChange={handleChange}
            />
          </div>
          <div className={adminStyles.formGroup}>
            <label className={adminStyles.label}>Email *</label>
            <input
              className={adminStyles.input}
              name="email"
              type="email"
              value={form.email}
              placeholder="john@example.com"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={adminStyles.formGroup}>
          <label className={adminStyles.label}>Message *</label>
          <textarea
            className={adminStyles.textarea}
            name="message"
            value={form.message}
            placeholder="Write your message here..."
            rows={5}
            onChange={handleChange}
          />
        </div>

        <button
          className={adminStyles.btnPrimary}
          onClick={submit}
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
      </div>
    </div>
  );
}
