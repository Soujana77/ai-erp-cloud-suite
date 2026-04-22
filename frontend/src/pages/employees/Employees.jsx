import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import MainLayout from "../../layout/MainLayout";

export default function Employees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", department: "", salary: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchEmployees();
  }, [navigate]);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/employees/${editingId}`, formData);
      } else {
        await api.post("/employees", formData);
      }
      setFormData({ name: "", email: "", department: "", salary: "" });
      setShowForm(false);
      setEditingId(null);
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (emp) => {
    setFormData({ name: emp.name, email: emp.email, department: emp.department, salary: emp.salary });
    setEditingId(emp.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", email: "", department: "", salary: "" });
    setShowForm(false);
    setEditingId(null);
  };

  if (loading) return <MainLayout><p>Loading...</p></MainLayout>;

  return (
    <MainLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2>Employees</h2>
          <p style={{ color: "#666" }}>Manage all employees in the system</p>
        </div>
        <button onClick={() => setShowForm(true)} style={addBtnStyle}>+ Add Employee</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {showForm && (
        <div style={formContainerStyle}>
          <h3>{editingId ? "Edit Employee" : "Add Employee"}</h3>
          <form onSubmit={handleSubmit} style={formStyle}>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              required
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Salary"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              required
              style={inputStyle}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" style={submitBtnStyle}>{editingId ? "Update" : "Create"}</button>
              <button type="button" onClick={handleCancel} style={cancelBtnStyle}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Name</th>
            <th style={th}>Email</th>
            <th style={th}>Department</th>
            <th style={th}>Salary</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr><td colSpan="6" style={{ ...td, textAlign: "center" }}>No employees found</td></tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td style={td}>{emp.id}</td>
                <td style={td}>{emp.name}</td>
                <td style={td}>{emp.email}</td>
                <td style={td}>{emp.department}</td>
                <td style={td}>${emp.salary}</td>
                <td style={td}>
                  <button onClick={() => handleEdit(emp)} style={editBtnStyle}>Edit</button>
                  <button onClick={() => handleDelete(emp.id)} style={deleteBtnStyle}>Delete</button>
                </td>
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

const formContainerStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  marginTop: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const formStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
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

const editBtnStyle = {
  padding: "6px 12px",
  background: "#f59e0b",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "5px",
};

const deleteBtnStyle = {
  padding: "6px 12px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
