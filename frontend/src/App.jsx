import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// AUTH
import Login from "./pages/auth/Login";
import Register from "./pages/auth/SignIn";

// CORE MODULES
import Dashboard from "./pages/dashboard/Dashboard";
import Employees from "./pages/employees/Employees";
import Inventory from "./pages/inventory/Inventory";
import Finance from "./pages/finance/Finance";

// HR MODULE
import Attendance from "./pages/hr/Attendance";
import Leave from "./pages/hr/Leave";
import OrgChart from "./pages/hr/OrgChart";

// WEEK 3 MODULES
import Forecasting from "./pages/artificial-intelligence/Forecasting";
import BIDashboard from "./pages/business-intelligence/BIDashboard";
import Projects from "./pages/project-management/Projects";
import Notifications from "./pages/notifications/Notifications";
import Security from "./pages/security/Security";

// LAYOUT + GUARD
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layout/MainLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/finance" element={<Finance />} />

            <Route path="/hr/attendance" element={<Attendance />} />
            <Route path="/hr/leave" element={<Leave />} />
            <Route path="/hr/orgchart" element={<OrgChart />} />

            <Route path="/ai/forecasting" element={<Forecasting />} />
            <Route path="/bi/dashboard" element={<BIDashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/security" element={<Security />} />
          </Route>
        </Route>

        <Route path="*" element={<Login />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </Router>
  );
}