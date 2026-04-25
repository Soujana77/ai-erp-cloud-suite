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
      <div className="card" style={{ marginBottom: "18px" }}>
        <h3 style={{ marginBottom: "6px" }}>Finance Overview</h3>
        <p style={{ color: "#6b7280" }}>
          Monitor income, expenses, and transaction performance in one place.
        </p>
      </div>

      <div className="card-grid three">
        <div className="card">
          <h4>Total Income</h4>
          <p
            style={{
              color: "#16a34a",
              fontSize: "2rem",
              fontWeight: "800",
              marginTop: "10px",
            }}
          >
            ₹ {data.income}
          </p>
        </div>

        <div className="card">
          <h4>Total Expense</h4>
          <p
            style={{
              color: "#dc2626",
              fontSize: "2rem",
              fontWeight: "800",
              marginTop: "10px",
            }}
          >
            ₹ {data.expense}
          </p>
        </div>

        <div className="card">
          <h4>Net Balance</h4>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "800",
              marginTop: "10px",
            }}
          >
            ₹ {balance}
          </p>
        </div>
      </div>

      <div className="table-wrap">
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
                <td colSpan="4">No transactions found</td>
              </tr>
            ) : (
              data.transactions.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>
                    <span
                      className={`badge ${
                        t.type === "income" ? "success" : "danger"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td>₹ {t.amount}</td>
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