import { useNavigate } from "react-router-dom";
import adminStyles from "./AdminPage.module.css";


export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className={adminStyles.page}>
      <div className={adminStyles.header}>
      <h2 className={adminStyles.title}>Admin Dashboard</h2>
      </div>
      <div style={{ marginTop: "30px" }}>
      <button onClick={() => navigate("/admin/projects")} className={adminStyles.btnPrimary} >
        Manage Projects
      </button>

      <button onClick={() => navigate("/admin/skills")} className={adminStyles.btnPrimary} style={{ marginRight: "10px", marginLeft: "10px" }}>
        Manage Skills
      </button>

      <button onClick={() => navigate("/admin/messages")} className={adminStyles.btnPrimary}>
        View Messages
      </button>
      </div>
    </div>
  );
}