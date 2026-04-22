import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={containerStyle}>
      <aside style={sidebarStyle}>
        <h2 style={logoStyle}>ERP System</h2>
        <nav>
          <Link to="/dashboard" style={navLinkStyle}>Dashboard</Link>
          <Link to="/employees" style={navLinkStyle}>Employees</Link>
          <Link to="/finance" style={navLinkStyle}>Finance</Link>
          <Link to="/inventory" style={navLinkStyle}>Inventory</Link>
        </nav>
        <button onClick={logout} style={logoutBtnStyle}>Logout</button>
      </aside>
      <main style={mainStyle}>
        {children}
      </main>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  minHeight: "100vh",
};

const sidebarStyle = {
  width: "220px",
  background: "#1e293b",
  color: "white",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
};

const logoStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "30px",
  paddingBottom: "10px",
  borderBottom: "1px solid #475569",
};

const navLinkStyle = {
  display: "block",
  color: "#cbd5e1",
  textDecoration: "none",
  padding: "12px 10px",
  borderRadius: "6px",
  marginBottom: "4px",
  fontSize: "14px",
};

const logoutBtnStyle = {
  marginTop: "auto",
  padding: "10px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const mainStyle = {
  flex: 1,
  padding: "30px",
  background: "#f8fafc",
  overflow: "auto",
};
