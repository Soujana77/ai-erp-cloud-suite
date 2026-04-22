import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import MainLayout from "../../layout/MainLayout";

export default function Finance() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", amount: "", type: "income" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [transRes, sumRes] = await Promise.all([
        api.get("/transactions"),
        api.get("/transactions/summary")
      ]);
      setTransactions(transRes.data.data || []);
      if (sumRes.data.data) {
        setSummary(sumRes.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/transactions", {
        ...formData,
        amount: Number(formData.amount)
      });
      setFormData({ title: "", amount: "", type: "income" });
      setShowForm(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create transaction");
    }
  };

  if (loading) return <MainLayout><p>Loading...</p></MainLayout>;

  const formatCurrency = (num) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num || 0);
  };

  return (
    <MainLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2>Finance</h2>
          <p style={{ color: "#666" }}>Track income and expenses</p>
        </div>
        <button onClick={() => setShowForm(true)} style={addBtnStyle}>+ Add Transaction</button>
      </div>

      <div style={summaryGridStyle}>
        <div style={summaryCardStyle}>
          <p style={summaryLabelStyle}>Total Income</p>
          <p style={{ ...summaryValueStyle, color: "#16a34a" }}>{formatCurrency(summary.totalIncome)}</p>
        </div>
        <div style={summaryCardStyle}>
          <p style={summaryLabelStyle}>Total Expense</p>
          <p style={{ ...summaryValueStyle, color: "#dc2626" }}>{formatCurrency(summary.totalExpense)}</p>
        </div>
        <div style={summaryCardStyle}>
          <p style={summaryLabelStyle}>Balance</p>
          <p style={{ ...summaryValueStyle, color: summary.balance >= 0 ? "#16a34a" : "#dc2626" }}>
            {formatCurrency(summary.balance)}
          </p>
        </div>
      </div>

      {showForm && (
        <div style={formContainerStyle}>
          <h3>Add Transaction</h3>
          <form onSubmit={handleSubmit} style={formStyle}>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
              style={inputStyle}
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              style={inputStyle}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <div style={{ display: "flex", gap: "10px", gridColumn: "span 3" }}>
              <button type="submit" style={submitBtnStyle}>Add</button>
              <button type="button" onClick={() => setShowForm(false)} style={cancelBtnStyle}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Title</th>
            <th style={th}>Type</th>
            <th style={th}>Amount</th>
            <th style={th}>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr><td colSpan="5" style={{ ...td, textAlign: "center" }}>No transactions found</td></tr>
          ) : (
            transactions.map((trans) => (
              <tr key={trans.id}>
                <td style={td}>{trans.id}</td>
                <td style={td}>{trans.title}</td>
                <td style={td}>
                  <span style={{
                    ...typeBadgeStyle,
                    background: trans.type === "income" ? "#dcfce7" : "#fee2e2",
                    color: trans.type === "income" ? "#16a34a" : "#dc2626"
                  }}>
                    {trans.type}
                  </span>
                </td>
                <td style={{ ...td, color: trans.type === "income" ? "#16a34a" : "#dc2626" }}>
                  {trans.type === "income" ? "+" : "-"}{formatCurrency(trans.amount)}
                </td>
                <td style={td}>{trans.created_at ? new Date(trans.created_at).toLocaleDateString() : "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </MainLayout>
  );
}

const addBtnStyle = {
  padding: "10px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const summaryGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  marginTop: "20px",
};

const summaryCardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

const summaryLabelStyle = {
  color: "#6b7280",
  fontSize: "14px",
  margin: "0 0 8px 0",
};

const summaryValueStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  margin: 0,
};

const formContainerStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  marginTop: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const formStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "10px",
};

const inputStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "6px",
};

const submitBtnStyle = {
  padding: "10px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const cancelBtnStyle = {
  padding: "10px 20px",
  background: "#6b7280",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  marginTop: "20px",
  borderCollapse: "collapse",
  background: "white",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const th = {
  textAlign: "left",
  padding: "12px",
  background: "#f3f4f6",
  borderBottom: "1px solid #e5e7eb",
};

const td = {
  padding: "12px",
  borderTop: "1px solid #eee",
};

const typeBadgeStyle = {
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "12px",
  fontWeight: "500",
  textTransform: "capitalize",
};
