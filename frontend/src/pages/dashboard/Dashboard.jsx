import { useEffect, useState } from "react";
import { getDashboard } from "../../services/api";

export default function Dashboard() {
  const [data, setData] = useState({
    totalEmployees: 0,
    totalProducts: 0,
    income: 0,
    expense: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboard();

        const payload = res?.data?.data || {};

        setData({
          totalEmployees: payload.totalEmployees ?? 0,
          totalProducts: payload.totalProducts ?? 0,
          income: payload.income ?? 0,
          expense: payload.expense ?? 0,
        });
      } catch (err) {
        console.log("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  const balance = data.income - data.expense;

  return (
    <div>
      <h2>ERP Dashboard</h2>
      

      {/* ================= KPI GRID ================= */}
      <div style={grid}>
        <div style={card}>
          <h4>Employees</h4>
          <p>{data.totalEmployees}</p>
        </div>

        <div style={card}>
          <h4>Inventory Items</h4>
          <p>{data.totalProducts}</p>
        </div>

        <div style={card}>
          <h4>Income</h4>
          <p style={{ color: "green" }}>₹ {data.income}</p>
        </div>

        <div style={card}>
          <h4>Expense</h4>
          <p style={{ color: "red" }}>₹ {data.expense}</p>
        </div>
      </div>

      {/* ================= FINANCIAL SNAPSHOT ================= */}
      <div style={bottomGrid}>
        <div style={card}>
          <h4>Net Balance</h4>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            ₹ {balance}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "15px",
  marginTop: "20px",
};

const bottomGrid = {
  display: "grid",
  gridTemplateColumns: "1fr",
  marginTop: "20px",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  textAlign: "center",
};