import { createBrowserRouter } from "react-router-dom";

// Pages
import Portfolio from "../pages/Portfolio";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ManageProfile from "../pages/ManageProfile";
import ManageExperience from "../pages/ManageExperience";
import ManageEducation from "../pages/ManageEducation";
import ManageProjects from "../pages/ManageProjects";
import AddProject from "../pages/AddProject";
import ManageSkills from "../pages/ManageSkills";
import Messages from "../pages/Messages";
import ChangePassword from "../pages/ChangePassword";

// Layout & Protected
import AdminLayout from "../components/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  // 🌐 Public Routes
  {
    path: "/",
    element: <Portfolio />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  // 🔐 Protected Admin Routes
  {
    element: <ProtectedRoute />, // auth check
    children: [
      {
        path: "/admin",
        element: <AdminLayout />, // layout
        children: [
          { index: true, element: <Dashboard /> },
          { path: "profile", element: <ManageProfile /> },
          { path: "experience", element: <ManageExperience /> },
          { path: "education", element: <ManageEducation /> },
          { path: "projects", element: <ManageProjects /> },
          { path: "add-project", element: <AddProject /> },
          { path: "skills", element: <ManageSkills /> },
          { path: "messages", element: <Messages /> },
          { path: "change-password", element: <ChangePassword /> },
        ],
      },
    ],
  },
]);

export default router;