import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const itemStyle = {
    padding: "10px",
    cursor: "pointer",
    borderRadius: "6px",
    color: "#d1d5db",
  };

  const activeStyle = {
    ...itemStyle,
    background: "#374151",
    color: "white",
  };

  return (
    <div
      style={{
        width: "220px",
        background: "#1f2937",
        color: "white",
        padding: "20px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2>ERP Menu</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
        <div style={itemStyle} onClick={() => navigate("/dashboard")}>
          📊 Dashboard
        </div>

        <div style={itemStyle} onClick={() => navigate("/employees")}>
          👥 Employees
        </div>

        <div style={itemStyle} onClick={() => navigate("/finance")}>
          💰 Finance
        </div>

        <div style={itemStyle} onClick={() => navigate("/inventory")}>
          📦 Inventory
        </div>
      </div>

      <button onClick={logout} style={{
        padding: "10px",
        background: "#dc2626",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}>
        Logout
      </button>
    </div>
  );
}