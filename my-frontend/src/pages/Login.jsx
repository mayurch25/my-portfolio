import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // Handle login logic
  const handleLogin = async () => {
    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Empty validation
    if (!form.email || !form.password) {
      toast.error("Please enter email and password");
      return;
    }

    // Email format validation
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const loginToast = toast.loading("Logging in...");
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast("Welcome Mayur 👋", {
        id: loginToast,
        icon: "✨",
        style: {
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "14px",
        },
      });
      navigate("/admin");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed, Please try again !!",
        { id: loginToast }
      );
    }
  };

  return (
    <div className={style.loginContainer}>
      <div className={style.loginBox}>
        <h2 className={style.adminHeading}>Welcome Mayur 👋</h2>

        <div className={style.inputGroup}>
          <input
            placeholder="Email"
            className={style.userInput}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });

              // Remove only email error
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
          />
          {errors.email && <p className={style.error}>{errors.email}</p>}
        </div>

        <div className={style.inputGroup}>
          <input
            type="password"
            placeholder="Password"
            className={style.userInput}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });

              //remove only password error
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
          />
          {errors.password && <p className={style.error}>{errors.password}</p>}
        </div>

        <button onClick={handleLogin} className={style.loginButton}>
          Login
        </button>
      </div>
    </div>
  );
}
