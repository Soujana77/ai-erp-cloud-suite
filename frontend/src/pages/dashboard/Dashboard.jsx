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
      <div className="card" style={{ marginBottom: "18px" }}>
        <h3 style={{ marginBottom: "6px" }}>Overview</h3>
        <p style={{ color: "#6b7280" }}>
          Welcome to AI-ERP-CLOUD-SUITE. Here is the latest operational summary.
        </p>
      </div>

      <div className="card-grid kpi">
        <div className="card">
          <h4>Total Employees</h4>
          <p style={{ fontSize: "2rem", fontWeight: "800", marginTop: "10px" }}>
            {data.totalEmployees}
          </p>
        </div>

        <div className="card">
          <h4>Inventory Items</h4>
          <p style={{ fontSize: "2rem", fontWeight: "800", marginTop: "10px" }}>
            {data.totalProducts}
          </p>
        </div>

        <div className="card">
          <h4>Total Income</h4>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "800",
              marginTop: "10px",
              color: "#16a34a",
            }}
          >
            ₹ {data.income}
          </p>
        </div>

        <div className="card">
          <h4>Total Expense</h4>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "800",
              marginTop: "10px",
              color: "#dc2626",
            }}
          >
            ₹ {data.expense}
          </p>
        </div>
      </div>

      <div className="card-grid two" style={{ marginTop: "18px" }}>
        <div className="card">
          <h4>Net Balance</h4>
          <p style={{ fontSize: "2rem", fontWeight: "800", marginTop: "10px" }}>
            ₹ {balance}
          </p>
        </div>

        <div className="card">
          <h4>System Status</h4>
          <p style={{ marginTop: "10px", color: "#6b7280" }}>
            All core ERP modules are available and connected.
          </p>
        </div>
      </div>
    </div>
  );
}