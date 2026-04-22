import { useEffect, useState } from "react";
import {
  getEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
} from "../../services/api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    role: "",
    department: "",
  });

  const [editingId, setEditingId] = useState(null);

  // =========================
  // FETCH EMPLOYEES
  // =========================
  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data.data || []);
    } catch (err) {
      console.log("Employees error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // =========================
  // ADD / UPDATE EMPLOYEE
  // =========================
  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateEmployee(editingId, form);
      } else {
        await addEmployee(form);
      }

      setForm({ name: "", role: "", department: "" });
      setEditingId(null);
      fetchEmployees();
    } catch (err) {
      console.log("Save error:", err);
    }
  };

  // =========================
  // DELETE EMPLOYEE
  // =========================
  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // =========================
  // EDIT MODE
  // =========================
  const handleEdit = (emp) => {
    setForm({
      name: emp.name,
      role: emp.role,
      department: emp.department,
    });
    setEditingId(emp.id);
  };

  if (loading) return <p>Loading employees...</p>;

  return (
    <div>
      <h2>Employees </h2>

      {/* ================= FORM ================= */}
      <div style={formStyle}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />

        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
        />

        <button onClick={handleSubmit}>
          {editingId ? "Update" : "Add"}
        </button>

        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", role: "", department: "" });
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* ================= TABLE ================= */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Name</th>
            <th style={th}>Role</th>
            <th style={th}>Department</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td style={td}>{emp.id}</td>
              <td style={td}>{emp.name}</td>
              <td style={td}>{emp.role}</td>
              <td style={td}>{emp.department}</td>

              <td style={td}>
                <button onClick={() => handleEdit(emp)}>Edit</button>
                <button onClick={() => handleDelete(emp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================= STYLES ================= */

const formStyle = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const tableStyle = {
  width: "100%",
  marginTop: "20px",
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