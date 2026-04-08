import { useNavigate, useLocation } from "react-router-dom";
import style from "./Sidebar.module.css";

const menu = [
  { name: "Dashboard", path: "/admin", icon: "🏠" },
  { name: "Profile", path: "/admin/profile", icon: "👤" },
  { name: "Experience", path: "/admin/experience", icon: "💼" },
  { name: "Education", path: "/admin/education", icon: "🎓" },
  { name: "Projects", path: "/admin/projects", icon: "🚀" },
  { name: "Add Project", path: "/admin/add-project", icon: "➕" },
  { name: "Skills", path: "/admin/skills", icon: "⚡" },
  { name: "Messages", path: "/admin/messages", icon: "✉️" },
  { name: "Change Password", path: "/admin/change-password", icon: "🔑" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={style.sidebar}>
      <div className={style.brand}>
        <span className={style.brandDot}>M</span>
        <span className={style.brandName}>Admin Panel</span>
      </div>

      <nav className={style.nav}>
        {menu.map((item) => {
          const isActive =
            item.path === "/admin"
              ? location.pathname === "/admin"
              : location.pathname.startsWith(item.path);
          return (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`${style.menuItem} ${isActive ? style.active : ""}`}
            >
              <span className={style.menuIcon}>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          );
        })}
      </nav>

      <div className={style.bottom}>
        <div
          className={style.portfolioLink}
          onClick={() => navigate("/")}
        >
          <span>🌐</span>
          <span>View Portfolio</span>
        </div>
        <div
          className={style.logout}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          <span>🚪</span>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
