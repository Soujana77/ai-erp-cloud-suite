import { useEffect, useState } from "react";
import { getTransactions } from "../../services/api";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

export default function Finance() {

  const [data, setData] = useState({
    income: 0,
    expense: 0,
    transactions: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchFinance = async () => {

      try {

        const res = await getTransactions();

        const payload = res?.data?.data || {};

        setData({
          income: payload.income ?? 0,
          expense: payload.expense ?? 0,
          transactions: payload.transactions ?? [],
        });

      } catch (err) {

        console.log("Finance error:", err);

      } finally {

        setLoading(false);
      }
    };

    fetchFinance();

  }, []);

  if (loading) {
    return <p>Loading finance data...</p>;
  }

  const balance = data.income - data.expense;

  // SAMPLE CHART DATA
  const financeTrend = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 26000 },
  ];

  const profitTrend = [
    { month: "Jan", profit: 5000 },
    { month: "Feb", profit: 8000 },
    { month: "Mar", profit: 6500 },
    { month: "Apr", profit: 10000 },
    { month: "May", profit: 12000 },
  ];

  return (
    <div>

      {/* HEADER */}
      <div style={banner}>
        <div>
          <h2 style={title}>
            Finance Management
          </h2>

          <p style={subtitle}>
            Track transactions, monitor revenue, and analyze financial performance.
          </p>
        </div>

        <div style={statusBadge}>
          Financial System Active
        </div>
      </div>

      {/* KPI CARDS */}
      <div style={kpiGrid}>

        <div style={card}>
          <p style={label}>
            Total Income
          </p>

          <h2 style={{ ...value, color: "#16a34a" }}>
            ₹ {data.income}
          </h2>
        </div>

        <div style={card}>
          <p style={label}>
            Total Expense
          </p>

          <h2 style={{ ...value, color: "#dc2626" }}>
            ₹ {data.expense}
          </h2>
        </div>

        <div style={card}>
          <p style={label}>
            Net Balance
          </p>

          <h2
            style={{
              ...value,
              color: balance >= 0
                ? "#2563eb"
                : "#dc2626",
            }}
          >
            ₹ {balance}
          </h2>
        </div>

      </div>

      {/* CHARTS */}
      <div style={chartGrid}>

        {/* Revenue Trend */}
        <div style={chartCard}>

          <h3 style={chartTitle}>
            Revenue Trend
          </h3>

          <ResponsiveContainer width="100%" height={280}>

            <LineChart data={financeTrend}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* Profit Analytics */}
        <div style={chartCard}>

          <h3 style={chartTitle}>
            Profit Analytics
          </h3>

          <ResponsiveContainer width="100%" height={280}>

            <AreaChart data={profitTrend}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                fill="#bbf7d0"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* TRANSACTION TABLE */}
      <div
        className="table-wrap"
        style={{ marginTop: "24px" }}
      >

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {data.transactions.length === 0 ? (

              <tr>
                <td colSpan="4">
                  No transactions found
                </td>
              </tr>

            ) : (

              data.transactions.map((t) => (

                <tr key={t.id}>

                  <td>{t.id}</td>

                  <td>

                    <span
                      className={`badge ${
                        t.type === "income"
                          ? "success"
                          : "danger"
                      }`}
                    >
                      {t.type}
                    </span>

                  </td>

                  <td
                    style={{
                      fontWeight: "700",
                      color:
                        t.type === "income"
                          ? "#16a34a"
                          : "#dc2626",
                    }}
                  >
                    ₹ {t.amount}
                  </td>

                  <td>{t.date}</td>

                </tr>

              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

const banner = {
  background: "linear-gradient(135deg, #0f172a, #1e3a8a)",

  color: "white",

  padding: "24px",

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
  background: "rgba(255,255,255,0.15)",

  padding: "10px 16px",

  borderRadius: "999px",

  fontWeight: "600",
};

const kpiGrid = {
  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit, minmax(240px, 1fr))",

  gap: "18px",

  marginBottom: "24px",
};

const card = {
  background: "white",

  padding: "22px",

  borderRadius: "14px",

  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const label = {
  color: "#6b7280",
};

const value = {
  marginTop: "12px",

  fontSize: "2rem",

  fontWeight: "800",
};

const chartGrid = {
  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit, minmax(350px, 1fr))",

  gap: "20px",
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