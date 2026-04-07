import { useNavigate } from "react-router-dom";
import adminStyles from "./AdminPage.module.css";


export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Admin Dashboard</h1>

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
  );
}