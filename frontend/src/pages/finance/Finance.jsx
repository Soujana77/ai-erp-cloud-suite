import { useEffect, useState } from "react";
import { getTransactions } from "../../services/api";

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

  if (loading) return <p>Loading finance data...</p>;

  const balance = data.income - data.expense;

  return (
    <div>
      <h2>Finance Module </h2>

      {/* ================= SUMMARY CARDS ================= */}
      <div style={grid}>
        <div style={card}>
          <h4>Total Income</h4>
          <p style={{ color: "green", fontSize: "18px" }}>
            ₹ {data.income}
          </p>
        </div>

        <div style={card}>
          <h4>Total Expense</h4>
          <p style={{ color: "red", fontSize: "18px" }}>
            ₹ {data.expense}
          </p>
        </div>

        <div style={card}>
          <h4>Balance</h4>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            ₹ {balance}
          </p>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <h3 style={{ marginTop: "30px" }}>Recent Transactions</h3>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Type</th>
            <th style={th}>Amount</th>
            <th style={th}>Date</th>
          </tr>
        </thead>

        <tbody>
          {data.transactions.length === 0 ? (
            <tr>
              <td style={td} colSpan="4">
                No transactions found
              </td>
            </tr>
          ) : (
            data.transactions.map((t) => (
              <tr key={t.id}>
                <td style={td}>{t.id}</td>

                <td
                  style={{
                    ...td,
                    color: t.type === "income" ? "green" : "red",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {t.type}
                </td>

                <td style={td}>₹ {t.amount}</td>
                <td style={td}>{t.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ================= STYLES ================= */

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "15px",
  marginTop: "20px",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  textAlign: "center",
};

const tableStyle = {
  width: "100%",
  marginTop: "15px",
  background: "white",
  borderCollapse: "collapse",
};

const th = {
  textAlign: "left",
  padding: "12px",
  background: "#f3f4f6",
};

const td = {
  padding: "12px",
  borderTop: "1px solid #eee",
};