import { useEffect, useState } from "react";
import { getDashboard } from "../../services/api";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

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

  if (loading) {
    return (
      <div style={loadingStyle}>
        Loading Smart ERP Dashboard...
      </div>
    );
  }

  const balance = data.income - data.expense;

  const salesTrend = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 26000 },
  ];

  const financeData = [
    { name: "Income", value: data.income },
    { name: "Expense", value: data.expense },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div>

      {/* Welcome Banner */}
      <div style={banner}>
        <div>
          <h2 style={title}>AI ERP Cloud Suite</h2>

          <p style={subtitle}>
            Smart business insights, analytics, and operational monitoring.
          </p>
        </div>

        <div style={statusBadge}>
          System Active
        </div>
      </div>

      {/* KPI CARDS */}
      <div style={kpiGrid}>

        <div style={card}>
          <p style={cardLabel}>Total Employees</p>

          <h2 style={cardValue}>
            {data.totalEmployees}
          </h2>
        </div>

        <div style={card}>
          <p style={cardLabel}>Inventory Items</p>

          <h2 style={cardValue}>
            {data.totalProducts}
          </h2>
        </div>

        <div style={card}>
          <p style={cardLabel}>Total Income</p>

          <h2 style={{ ...cardValue, color: "#16a34a" }}>
            ₹ {data.income}
          </h2>
        </div>

        <div style={card}>
          <p style={cardLabel}>Total Expense</p>

          <h2 style={{ ...cardValue, color: "#dc2626" }}>
            ₹ {data.expense}
          </h2>
        </div>

      </div>

      {/* SECOND SECTION */}
      <div style={chartGrid}>

        {/* Revenue Trend */}
        <div style={chartCard}>
          <h3 style={chartTitle}>Revenue Trend</h3>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={salesTrend}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Finance Distribution */}
        <div style={chartCard}>
          <h3 style={chartTitle}>Finance Distribution</h3>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={financeData}
                dataKey="value"
                outerRadius={90}
                label
              >
                {financeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div style={bottomGrid}>

        <div style={bottomCard}>
          <h3 style={chartTitle}>Net Balance</h3>

          <h1
            style={{
              marginTop: "15px",
              color: balance >= 0 ? "#16a34a" : "#dc2626",
            }}
          >
            ₹ {balance}
          </h1>
        </div>

        <div style={bottomCard}>
          <h3 style={chartTitle}>AI Insights</h3>

          <ul style={insightList}>
            <li>📈 Revenue increased this month</li>
            <li>📦 Inventory levels stable</li>
            <li>🤖 AI forecasting module active</li>
            <li>✅ ERP services connected successfully</li>
          </ul>
        </div>

      </div>

    </div>
  );
}

const loadingStyle = {
  fontSize: "18px",
  fontWeight: "600",
};

const banner = {
  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
  color: "white",
  padding: "25px",
  borderRadius: "16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
};

const title = {
  margin: 0,
  fontSize: "2rem",
  fontWeight: "800",
};

const subtitle = {
  marginTop: "8px",
  opacity: 0.9,
};

const statusBadge = {
  background: "rgba(255,255,255,0.2)",
  padding: "10px 16px",
  borderRadius: "999px",
  fontWeight: "600",
};

const kpiGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "18px",
};

const card = {
  background: "white",
  padding: "22px",
  borderRadius: "14px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const cardLabel = {
  color: "#6b7280",
  fontSize: "15px",
};

const cardValue = {
  marginTop: "14px",
  fontSize: "2rem",
  fontWeight: "800",
};

const chartGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: "20px",
  marginTop: "24px",
};

const chartCard = {
  background: "white",
  padding: "20px",
  borderRadius: "14px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const chartTitle = {
  marginBottom: "18px",
};

const bottomGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
  marginTop: "24px",
};

const bottomCard = {
  background: "white",
  padding: "22px",
  borderRadius: "14px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const insightList = {
  marginTop: "15px",
  lineHeight: "2",
  color: "#4b5563",
};