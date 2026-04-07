import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import adminStyles from "./AdminPage.module.css";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  const load = async () => {
    try {
      const res = await API.get("/contact");
      setMessages(res.data);
    } catch {
      toast.error("Failed to load messages.");
    }
  };

  useEffect(() => {
    API.get("/contact")
      .then((res) => setMessages(res.data))
      .catch(() => toast.error("Failed to load messages."));
  }, []);

  const deleteMsg = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await API.delete(`/contact/${id}`);
      toast.success("Message deleted.");
      load();
    } catch {
      toast.error("Failed to delete message.");
    }
  };

  return (
    <div className={adminStyles.page}>
      <div className={adminStyles.header}>
        <h2 className={adminStyles.title}>Messages</h2>
        <p className={adminStyles.subtitle}>Contact form submissions from your portfolio</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {messages.length === 0 && (
          <div className={adminStyles.emptyState}>
            No messages yet. They will appear here when someone fills out the contact form.
          </div>
        )}
        {messages.map((m) => (
          <div key={m._id} className={adminStyles.listCard}>
            <div className={adminStyles.listCardMain}>
              <div className={adminStyles.listCardTitle}>{m.name}</div>
              <div className={adminStyles.listCardSub}>{m.email}</div>
              <div className={adminStyles.listCardMeta} style={{ marginTop: 8, color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6 }}>
                {m.message}
              </div>
            </div>
            <button
              className={adminStyles.btnDanger}
              onClick={() => deleteMsg(m._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
