import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const itemStyle = (active) => ({
    padding: "10px",
    cursor: "pointer",
    borderRadius: "6px",
    marginBottom: "8px",
    background: active ? "#374151" : "transparent",
    transition: "0.2s",
  });

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
      <h2 style={{ marginBottom: "20px" }}>ERP Menu</h2>

      {/* CORE */}
      <div style={itemStyle(isActive("/dashboard"))} onClick={() => navigate("/dashboard")}>
        📊 Dashboard
      </div>

      <div style={itemStyle(isActive("/employees"))} onClick={() => navigate("/employees")}>
        👥 Employees
      </div>

      <div style={itemStyle(isActive("/inventory"))} onClick={() => navigate("/inventory")}>
        📦 Inventory
      </div>

      <div style={itemStyle(isActive("/finance"))} onClick={() => navigate("/finance")}>
        💰 Finance
      </div>

      <hr style={{ margin: "15px 0", opacity: 0.3 }} />

      {/* HR */}
      <div style={{ fontSize: "12px", opacity: 0.7, marginBottom: "10px" }}>
        HR MODULE
      </div>

      <div style={itemStyle(isActive("/hr/attendance"))} onClick={() => navigate("/hr/attendance")}>
        🕒 Attendance
      </div>

      <div style={itemStyle(isActive("/hr/leave"))} onClick={() => navigate("/hr/leave")}>
        📝 Leave
      </div>

      <div style={itemStyle(isActive("/hr/orgchart"))} onClick={() => navigate("/hr/orgchart")}>
        🌳 Org Chart
      </div>

      <hr style={{ margin: "15px 0", opacity: 0.3 }} />

      
      <div style={{ fontSize: "12px", opacity: 0.7, marginBottom: "10px" }}>
        ADVANCED MODULES
      </div>

      <div style={itemStyle(isActive("/ai/forecasting"))} onClick={() => navigate("/ai/forecasting")}>
        🤖 AI Forecasting
      </div>

      <div style={itemStyle(isActive("/bi/dashboard"))} onClick={() => navigate("/bi/dashboard")}>
        📊 BI Dashboard
      </div>

      <div style={itemStyle(isActive("/projects"))} onClick={() => navigate("/projects")}>
        📁 Projects
      </div>

      <div style={itemStyle(isActive("/notifications"))} onClick={() => navigate("/notifications")}>
        🔔 Notifications
      </div>

      <div style={itemStyle(isActive("/security"))} onClick={() => navigate("/security")}>
        🔐 Security
      </div>
    </div>
  );
}