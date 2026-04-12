import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const itemStyle = {
    padding: "10px",
    cursor: "pointer",
    borderRadius: "6px",
  };

  return (
    <div
      style={{
        width: "220px",
        background: "#1f2937",
        color: "white",
        padding: "20px",
        height: "100vh",
      }}
    >
      <h2>ERP Menu</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={itemStyle} onClick={() => navigate("/dashboard")}>
          📊 Dashboard
        </div>

        <div style={itemStyle} onClick={() => navigate("/employees")}>
          👥 Employees
        </div>

        <div style={itemStyle} onClick={() => navigate("/inventory")}>
          📦 Inventory
        </div>
      </div>
    </div>
  );
}