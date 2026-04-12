import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // safety check (prevents crash if backend response changes)
      if (!res.data || !res.data.token) {
        alert("Invalid server response");
        return;
      }

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Invalid credentials or server error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2>Login</h2>
        <p style={{ color: "#666" }}>Enter credentials</p>

        <form onSubmit={handleLogin} style={formStyle}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button type="submit" style={btn}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p
          onClick={() => navigate("/signin")}
          style={{ color: "#2563eb", cursor: "pointer" }}
        >
          Don't have account? Sign In
        </p>
      </div>
    </div>
  );
}

/* ================= UI STYLES (UNCHANGED) ================= */

const pageStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f4f6f9",
};

const cardStyle = {
  width: "340px",
  padding: "30px",
  background: "white",
  borderRadius: "12px",
  boxShadow: "0 2px 15px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const btn = {
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};