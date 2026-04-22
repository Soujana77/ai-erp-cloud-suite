import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    api.get("/dashboard")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Failed to fetch dashboard");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </div>

      <nav>
        <ul>
          <li><Link to="/employees">Employees</Link></li>
          <li><Link to="/inventory">Inventory</Link></li>
        </ul>
      </nav>

      <p>Welcome to Smart ERP System</p>

      <div style={{ marginTop: "20px" }}>
        <h3>API Response:</h3>
        {loading ? (
          <p>Loading...</p>
        ) : data ? (
          <pre style={{ background: "#f5f5f5", padding: "10px", overflow: "auto" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  );
}