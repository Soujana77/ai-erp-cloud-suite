import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // store credentials (frontend mock)
    localStorage.setItem(
      "registeredUser",
      JSON.stringify({ email, password })
    );

    alert("Sign In successful!");
    navigate("/"); // go to login page
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2>Create Account</h2>
        <p style={{ color: "#666" }}>Sign in first to register</p>

        <form onSubmit={handleSignIn} style={formStyle}>
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
            Sign In
          </button>
        </form>

        <p
          onClick={() => navigate("/")}
          style={{ color: "#2563eb", cursor: "pointer", marginTop: "10px" }}
        >
          Already have account? Login
        </p>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

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