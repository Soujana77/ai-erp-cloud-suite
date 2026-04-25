import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const items = [
    { label: "Dashboard", path: "/dashboard", icon: "📊" },
    { label: "Employees", path: "/employees", icon: "👥" },
    { label: "Inventory", path: "/inventory", icon: "📦" },
    { label: "Finance", path: "/finance", icon: "💰" },
    { label: "Attendance", path: "/hr/attendance", icon: "🕒" },
    { label: "Leave", path: "/hr/leave", icon: "📝" },
    { label: "Org Chart", path: "/hr/orgchart", icon: "🌳" },
    { label: "AI Forecasting", path: "/ai/forecasting", icon: "🤖" },
    { label: "BI Dashboard", path: "/bi/dashboard", icon: "📈" },
    { label: "Projects", path: "/projects", icon: "📁" },
    { label: "Notifications", path: "/notifications", icon: "🔔" },
    { label: "Security", path: "/security", icon: "🔐" },
  ];

  return (
    <aside className="erp-sidebar">
      <div className="erp-brand">ERP Menu</div>

      <div className="erp-section-label">Core Modules</div>
      {items.slice(0, 4).map((item) => (
        <div
          key={item.path}
          className={`erp-nav-item ${isActive(item.path) ? "active" : ""}`}
          onClick={() => navigate(item.path)}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}

      <div className="erp-section-label">HR Module</div>
      {items.slice(4, 7).map((item) => (
        <div
          key={item.path}
          className={`erp-nav-item ${isActive(item.path) ? "active" : ""}`}
          onClick={() => navigate(item.path)}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}

      <div className="erp-section-label">Advanced Modules</div>
      {items.slice(7).map((item) => (
        <div
          key={item.path}
          className={`erp-nav-item ${isActive(item.path) ? "active" : ""}`}
          onClick={() => navigate(item.path)}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </aside>
  );
}