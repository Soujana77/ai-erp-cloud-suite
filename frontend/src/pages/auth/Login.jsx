import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useToast } from "../../components/Toast";

export default function Login() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        const token = res.data.data.accessToken;
        localStorage.setItem("token", token);
        addToast("Login successful!", "success");
        navigate("/dashboard");
      } else {
        addToast(res.data.message || "Login failed", "error");
      }
    } catch (err) {
      addToast(err.response?.data?.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={logoContainerStyle}>
          <span style={logoIconStyle}>📊</span>
          <h1 style={logoTextStyle}>Smart ERP</h1>
        </div>
        
        <p style={subtitleStyle}>Sign in to your account</p>

        <form onSubmit={handleLogin} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <button type="submit" style={loading ? { ...btn, opacity: 0.7 } : btn} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={footerTextStyle}>
          Don't have an account?{" "}
          <span style={linkStyle} onClick={() => navigate("/signin")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f8fafc",
  padding: "20px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "400px",
  padding: "40px",
  background: "white",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  textAlign: "center",
  border: "1px solid #f3f4f6",
};

const logoContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  marginBottom: "8px",
};

const logoIconStyle = {
  fontSize: "32px",
};

const logoTextStyle = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#111827",
  margin: 0,
};

const subtitleStyle = {
  color: "#6b7280",
  fontSize: "14px",
  marginBottom: "32px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const inputGroupStyle = {
  textAlign: "left",
};

const labelStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: "500",
  color: "#374151",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  color: "#111827",
  outline: "none",
  boxSizing: "border-box",
};

const btn = {
  padding: "12px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "8px",
  transition: "background 0.2s",
};

const footerTextStyle = {
  marginTop: "24px",
  fontSize: "14px",
  color: "#6b7280",
};

const linkStyle = {
  color: "#3b82f6",
  cursor: "pointer",
  fontWeight: "500",
};