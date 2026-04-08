import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      toast.error("Please enter email and password");
      return;
    }

    const loginToast = toast.loading("Logging in...");
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", form.email);
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
            value={form.email}
            className={style.userInput}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className={style.inputGroup}>
          <div className={style.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              className={style.userInput}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              className={style.eyeButton}
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7a9.96 9.96 0 015.657 1.757M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button onClick={handleLogin} className={style.loginButton}>
          Login
        </button>

        <p className={style.switchLink}>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>

        <button onClick={() => navigate("/")} className={style.backHomeButton}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
