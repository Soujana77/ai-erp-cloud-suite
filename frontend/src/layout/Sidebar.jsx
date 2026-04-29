import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({
  collapsed,
  setCollapsed,
}) {

  const navigate = useNavigate();

  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path;

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
    <aside
      style={{
        width: collapsed ? "90px" : "260px",

        background:
          "linear-gradient(180deg, #111827, #1f2937)",

        color: "white",

        transition: "0.3s",

        minHeight: "100vh",

        padding: "20px 12px",

        boxShadow:
          "4px 0 12px rgba(0,0,0,0.1)",
      }}
    >

      {/* LOGO */}
      <div
        style={{
          display: "flex",

          justifyContent: collapsed
            ? "center"
            : "space-between",

          alignItems: "center",

          marginBottom: "30px",
        }}
      >

        {!collapsed && (
          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: "800",
            }}
          >
            Smart ERP
          </h2>
        )}

        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
          style={{
            background: "#374151",

            border: "none",

            color: "white",

            borderRadius: "8px",

            padding: "8px 10px",

            cursor: "pointer",
          }}
        >
          ☰
        </button>

      </div>

      {/* MENU ITEMS */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >

        {items.map((item) => (

          <div
            key={item.path}

            onClick={() =>
              navigate(item.path)
            }

            style={{
              display: "flex",

              alignItems: "center",

              gap: "14px",

              padding: "14px",

              borderRadius: "12px",

              cursor: "pointer",

              background: isActive(item.path)
                ? "#4f46e5"
                : "transparent",

              transition: "0.2s",

              fontWeight: "600",
            }}
          >

            <span
              style={{
                fontSize: "1.2rem",
              }}
            >
              {item.icon}
            </span>

            {!collapsed && (
              <span>{item.label}</span>
            )}

          </div>

        ))}

      </div>

    </aside>
  );
}