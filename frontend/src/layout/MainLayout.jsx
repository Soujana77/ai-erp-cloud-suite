import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;

    if (path.includes("dashboard")) return "Dashboard";
    if (path.includes("employees")) return "Employees";
    if (path.includes("inventory")) return "Inventory";
    if (path.includes("finance")) return "Finance";

    if (path.includes("hr/attendance")) return "HR - Attendance";
    if (path.includes("hr/leave")) return "HR - Leave";
    if (path.includes("hr/orgchart")) return "HR - Organization Chart";

    if (path.includes("/ai/forecasting")) return "AI Forecasting";
    if (path.includes("/bi/dashboard")) return "Business Intelligence Dashboard";
    if (path.includes("projects")) return "Project Management";
    if (path.includes("notifications")) return "Notifications";
    if (path.includes("security")) return "Security";

    return "ERP System";
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />

        <main
          style={{
            flex: 1,
            padding: "20px",
            background: "#f4f6f9",
            overflowY: "auto",
          }}
        >
          <h2 style={{ marginBottom: "15px" }}>{getTitle()}</h2>
          <Outlet />
        </main>
      </div>
    </div>
  );
}