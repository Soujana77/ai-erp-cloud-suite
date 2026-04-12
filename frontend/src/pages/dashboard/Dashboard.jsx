import { Navigate, useNavigate } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // 🔐 Protected Route (safe check)
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // 🚪 Logout handler (clean + safe)
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div style={headerStyle}>
        <div>
          <h2 style={{ margin: 0 }}>Dashboard</h2>
          <p style={{ margin: 0, color: "#666" }}>
            Overview of system performance
          </p>
        </div>

        <button style={logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* CARDS */}
      <div style={gridStyle}>
        <div style={cardStyle}>
          <h3 style={cardTitle}>Users</h3>
          <h2>120</h2>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>Revenue</h3>
          <h2>$10,000</h2>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>Inventory</h3>
          <h2>540</h2>
        </div>
      </div>

      {/* STATUS SECTION */}
      <div style={statusBox}>
        <p style={{ margin: 0 }}>
          You are successfully logged in ✅
        </p>
      </div>
    </MainLayout>
  );
}

/* ================= STYLES (UNCHANGED EXACTLY) ================= */

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const logoutBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const cardTitle = {
  margin: "0 0 10px 0",
  color: "#666",
  fontSize: "14px",
};

const statusBox = {
  marginTop: "20px",
  padding: "15px",
  background: "#eafaf1",
  borderRadius: "10px",
  color: "#166534",
};