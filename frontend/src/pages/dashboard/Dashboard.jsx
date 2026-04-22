import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Layout from "../../layout/Layout";

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  return (
    <Layout>
      <h1>Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <div style={cardStyle}>
          <h3>Dashboard Data</h3>
          <pre style={{ background: "#f1f5f9", padding: "15px", borderRadius: "8px", overflow: "auto" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </Layout>
  );
}

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  marginTop: "20px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};
