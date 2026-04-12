import { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import API from "../../services/api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(""); // clear previous error

      const res = await API.get("/employees");

      // safety check (prevents crash if backend sends undefined/null)
      setEmployees(res.data || []);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to load employees"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <h2>Employees</h2>
      <p style={{ color: "#666" }}>
        Manage all employees in the system
      </p>

      {loading && <p>Loading employees...</p>}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {!loading && !error && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={th}>ID</th>
              <th style={th}>Name</th>
              <th style={th}>Role</th>
              <th style={th}>Department</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td style={td}>{emp.id}</td>
                <td style={td}>{emp.name}</td>
                <td style={td}>{emp.role}</td>
                <td style={td}>{emp.dept}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </MainLayout>
  );
}

/* ================= UI STYLES (UNCHANGED) ================= */

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
};

const td = {
  padding: "12px",
  borderTop: "1px solid #eee",
};