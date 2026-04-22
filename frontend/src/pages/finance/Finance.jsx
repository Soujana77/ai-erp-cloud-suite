import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import MainLayout from "../../layout/MainLayout";
import { useToast } from "../../components/Toast";
import { useAuth } from "../../hooks/useAuth";

export default function Finance() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { canCreate } = useAuth();
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
      addToast("Failed to fetch data", "error");
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
      addToast("Transaction added successfully", "success");
      setFormData({ title: "", amount: "", type: "income" });
      setShowForm(false);
      fetchData();
    } catch (err) {
      addToast(err.response?.data?.message || "Failed to create transaction", "error");
    }
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(num || 0);
  };

  if (loading) {
    return (
      <MainLayout>
        <div style={loadingStyle}>
          <div style={spinnerStyle}></div>
          <p>Loading finance data...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Finance</h1>
          <p style={subtitleStyle}>Track income and expenses</p>
        </div>
        {canCreate && (
          <button onClick={() => setShowForm(true)} style={addBtnStyle}>
            + Add Transaction
          </button>
        )}
      </div>

      <div style={summaryGridStyle}>
        <div style={summaryCardStyle}>
          <div style={summaryIconStyle}>
            <span style={iconStyle}>📈</span>
          </div>
          <div>
            <p style={summaryLabelStyle}>Total Income</p>
            <p style={{ ...summaryValueStyle, color: "#059669" }}>{formatCurrency(summary.totalIncome)}</p>
          </div>
        </div>

        <div style={summaryCardStyle}>
          <div style={{ ...summaryIconStyle, background: "#fef2f2" }}>
            <span style={iconStyle}>📉</span>
          </div>
          <div>
            <p style={summaryLabelStyle}>Total Expenses</p>
            <p style={{ ...summaryValueStyle, color: "#dc2626" }}>{formatCurrency(summary.totalExpense)}</p>
          </div>
        </div>

        <div style={summaryCardStyle}>
          <div style={{ ...summaryIconStyle, background: "#eff6ff" }}>
            <span style={iconStyle}>💰</span>
          </div>
          <div>
            <p style={summaryLabelStyle}>Balance</p>
            <p style={{
              ...summaryValueStyle,
              color: summary.balance >= 0 ? "#059669" : "#dc2626"
            }}>
              {formatCurrency(summary.balance)}
            </p>
          </div>
        </div>
      </div>

      {showForm && canCreate && (
        <div style={formCardStyle}>
          <h3 style={formTitleStyle}>Add New Transaction</h3>
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Title</label>
              <input
                type="text"
                placeholder="e.g., Sales Revenue"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Amount</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                style={inputStyle}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div style={formActionsStyle}>
              <button type="submit" style={submitBtnStyle}>Add Transaction</button>
              <button type="button" onClick={() => setShowForm(false)} style={cancelBtnStyle}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={tableCardStyle}>
        <h3 style={tableTitleStyle}>Transaction History</h3>
        {transactions.length === 0 ? (
          <div style={emptyStateStyle}>No transactions found</div>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trans) => (
                <tr key={trans.id}>
                  <td style={tdStyle}>#{trans.id}</td>
                  <td style={tdStyle}>{trans.title}</td>
                  <td style={tdStyle}>
                    <span style={{
                      ...typeBadgeStyle,
                      background: trans.type === "income" ? "#ecfdf5" : "#fef2f2",
                      color: trans.type === "income" ? "#059669" : "#dc2626"
                    }}>
                      {trans.type}
                    </span>
                  </td>
                  <td style={{
                    ...tdStyle,
                    fontWeight: "600",
                    color: trans.type === "income" ? "#059669" : "#dc2626"
                  }}>
                    {trans.type === "income" ? "+" : "-"}{formatCurrency(trans.amount)}
                  </td>
                  <td style={tdStyle}>
                    {trans.created_at ? new Date(trans.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    }) : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </MainLayout>
  );
}

const loadingStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "400px",
  gap: "16px",
};

const spinnerStyle = {
  width: "40px",
  height: "40px",
  border: "3px solid #e5e7eb",
  borderTopColor: "#3b82f6",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
};

const titleStyle = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#111827",
  margin: 0,
};

const subtitleStyle = {
  fontSize: "14px",
  color: "#6b7280",
  margin: "4px 0 0 0",
};

const addBtnStyle = {
  padding: "10px 20px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
};

const summaryGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginBottom: "24px",
};

const summaryCardStyle = {
  background: "white",
  borderRadius: "12px",
  padding: "20px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  border: "1px solid #f3f4f6",
};

const summaryIconStyle = {
  width: "48px",
  height: "48px",
  borderRadius: "10px",
  background: "#ecfdf5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const iconStyle = { fontSize: "20px" };

const summaryLabelStyle = {
  fontSize: "13px",
  color: "#6b7280",
  margin: 0,
};

const summaryValueStyle = {
  fontSize: "24px",
  fontWeight: "700",
  margin: "4px 0 0 0",
};

const formCardStyle = {
  background: "white",
  borderRadius: "12px",
  padding: "24px",
  marginBottom: "24px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  border: "1px solid #f3f4f6",
};

const formTitleStyle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#111827",
  margin: "0 0 20px 0",
};

const formStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "16px",
  alignItems: "end",
};

const formGroupStyle = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: "500",
  color: "#374151",
  marginBottom: "6px",
};

const inputStyle = {
  padding: "10px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "14px",
  color: "#111827",
  outline: "none",
};

const formActionsStyle = {
  display: "flex",
  gap: "12px",
};

const submitBtnStyle = {
  padding: "10px 24px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
};

const cancelBtnStyle = {
  padding: "10px 24px",
  background: "#f3f4f6",
  color: "#374151",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
};

const tableCardStyle = {
  background: "white",
  borderRadius: "12px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  border: "1px solid #f3f4f6",
  padding: "20px",
};

const tableTitleStyle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#111827",
  margin: "0 0 16px 0",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  textAlign: "left",
  padding: "12px",
  fontSize: "12px",
  fontWeight: "600",
  color: "#6b7280",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  borderBottom: "1px solid #f3f4f6",
};

const tdStyle = {
  padding: "14px 12px",
  fontSize: "14px",
  color: "#374151",
  borderBottom: "1px solid #f9fafb",
};

const typeBadgeStyle = {
  padding: "4px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "500",
  textTransform: "capitalize",
};

const emptyStateStyle = {
  textAlign: "center",
  padding: "40px",
  color: "#9ca3af",
};