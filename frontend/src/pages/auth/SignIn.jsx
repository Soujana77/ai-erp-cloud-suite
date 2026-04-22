import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function SignIn() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        alert("Registration successful! Please login.");
        navigate("/");
      } else {
        alert(res.data.message || "Registration failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Create Account</h2>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "10px" }}
      />

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "10px" }}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "10px" }}
      />

      <button
        onClick={handleRegister}
        style={{ padding: "10px 20px", marginTop: "10px" }}
      >
        Sign In
      </button>

      <p style={{ marginTop: "10px" }}>
        Already have account? <a href="/">Login</a>
      </p>
    </div>
  );
}