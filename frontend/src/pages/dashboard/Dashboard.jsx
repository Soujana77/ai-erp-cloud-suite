import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import MainLayout from "../../layout/MainLayout";
import { useToast } from "../../components/Toast";

export default function Dashboard() {
  const navigate = useNavigate();
  const { addToast } = useToast();
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
        if (res.data.success) {
          setData(res.data.data);
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

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
          <p>Loading dashboard...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Dashboard</h1>
        <p style={subtitleStyle}>Overview of your ERP system</p>
      </div>

      <div style={statsGridStyle}>
        <div style={statCardStyle}>
          <div style={statIconStyle}>👥</div>
          <div>
            <p style={statLabelStyle}>Total Employees</p>
            <p style={statValueStyle}>{data?.totalEmployees || 0}</p>
          </div>
        </div>

        <div style={statCardStyle}>
          <div style={{ ...statIconStyle, background: "#ecfdf5" }}>📈</div>
          <div>
            <p style={statLabelStyle}>Revenue</p>
            <p style={{ ...statValueStyle, color: "#059669" }}>
              {formatCurrency(data?.totalRevenue)}
            </p>
          </div>
        </div>

        <div style={statCardStyle}>
          <div style={{ ...statIconStyle, background: "#fef2f2" }}>📉</div>
          <div>
            <p style={statLabelStyle}>Expenses</p>
            <p style={{ ...statValueStyle, color: "#dc2626" }}>
              {formatCurrency(data?.totalExpenses)}
            </p>
          </div>
        </div>

        <div style={statCardStyle}>
          <div style={{ ...statIconStyle, background: "#eff6ff" }}>💰</div>
          <div>
            <p style={statLabelStyle}>Balance</p>
            <p style={{
              ...statValueStyle,
              color: (data?.balance || 0) >= 0 ? "#059669" : "#dc2626"
            }}>
              {formatCurrency(data?.balance)}
            </p>
          </div>
        </div>
      </div>

      <div style={tablesGridStyle}>
        <div style={tableCardStyle}>
          <h3 style={tableTitleStyle}>Recent Transactions</h3>
          {data?.recentTransactions?.length > 0 ? (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Title</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.recentTransactions.map((trans, i) => (
                  <tr key={trans.id || i}>
                    <td style={tdStyle}>{trans.title}</td>
                    <td style={tdStyle}>
                      <span style={{
                        ...badgeStyle,
                        background: trans.type === "income" ? "#ecfdf5" : "#fef2f2",
                        color: trans.type === "income" ? "#059669" : "#dc2626"
                      }}>
                        {trans.type}
                      </span>
                    </td>
                    <td style={{
                      ...tdStyle,
                      color: trans.type === "income" ? "#059669" : "#dc2626"
                    }}>
                      {trans.type === "income" ? "+" : "-"}{formatCurrency(trans.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={emptyStateStyle}>No recent transactions</div>
          )}
        </div>

        <div style={tableCardStyle}>
          <h3 style={tableTitleStyle}>Low Stock Items</h3>
          {data?.lowStockItems?.length > 0 ? (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Item</th>
                  <th style={thStyle}>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {data.lowStockItems.map((item, i) => (
                  <tr key={item.id || i}>
                    <td style={tdStyle}>{item.item_name}</td>
                    <td style={{ ...tdStyle, color: "#dc2626", fontWeight: "600" }}>
                      {item.quantity} left
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={emptyStateStyle}>All items well stocked</div>
          )}
        </div>
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

const headerStyle = { marginBottom: "24px" };

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

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginBottom: "24px",
};

const statCardStyle = {
  background: "white",
  borderRadius: "12px",
  padding: "20px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  border: "1px solid #f3f4f6",
};

const statIconStyle = {
  width: "48px",
  height: "48px",
  borderRadius: "10px",
  background: "#f0fdf4",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
};

const statLabelStyle = {
  fontSize: "13px",
  color: "#6b7280",
  margin: 0,
};

const statValueStyle = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#111827",
  margin: "4px 0 0 0",
};

const tablesGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: "20px",
};

const tableCardStyle = {
  background: "white",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  border: "1px solid #f3f4f6",
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
  padding: "10px 0",
  fontSize: "12px",
  fontWeight: "600",
  color: "#6b7280",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  borderBottom: "1px solid #f3f4f6",
};

const tdStyle = {
  padding: "12px 0",
  fontSize: "14px",
  color: "#374151",
  borderBottom: "1px solid #f9fafb",
};

const badgeStyle = {
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "500",
  textTransform: "capitalize",
};

const emptyStateStyle = {
  textAlign: "center",
  padding: "40px 20px",
  color: "#9ca3af",
  fontSize: "14px",
};