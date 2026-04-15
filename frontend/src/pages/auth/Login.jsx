import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ ADD THIS

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 UPDATED LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // ✅ CHECK RESPONSE
      if (res.data.success) {
        const token = res.data.data.token;

        // store token
        localStorage.setItem("token", token);

        // redirect
        navigate("/dashboard");
      } else {
        alert(res.data.message);
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
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
            Login
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

/* styles */
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