import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="erp-topbar">
      <div className="erp-title">AI-ERP-CLOUD-SUITE</div>
      <div className="erp-top-actions">
        <span>Admin Panel</span>
        <button className="btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}